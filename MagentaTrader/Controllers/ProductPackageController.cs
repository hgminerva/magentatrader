using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MagentaTrader.Controllers
{
    public class ProductPackageController : ApiController
    {
        private Data.MagentaTradersDBDataContext db = new Data.MagentaTradersDBDataContext();

        // GET api/ProductPackage
        [Authorize]
        public List<Models.ProductPackage> Get()
        {
            var retryCounter = 0;
            List<Models.ProductPackage> values;

            while (true)
            {
                try
                {
                    var Packages = from d in db.MstProductPackages
                                   select new Models.ProductPackage
                                   {
                                       Id = d.Id,
                                       ProductPackageDescription = d.ProductPackage,
                                       SKU = d.SKU,
                                       Price = d.Price,
                                       ProductId = d.ProductId,
                                       Product = d.MstProduct.Product,
                                       IsAvailable = d.IsAvailable,
                                       WithCoupon = d.WithCoupon,
                                       WithSoftware = d.WithSoftware,
                                       IsReoccuring = d.IsReoccuring,
                                       Particulars = d.Particulars
                                   };
                    if (Packages.Count() > 0)
                    {
                        values = Packages.ToList();
                    }
                    else
                    {
                        values = new List<Models.ProductPackage>();
                    }
                    break;
                }
                catch
                {
                    if (retryCounter == 3)
                    {
                        values = new List<Models.ProductPackage>();
                        break;
                    }

                    System.Threading.Thread.Sleep(1000);
                    retryCounter++;
                }
            }
            return values;
        }


        // POST api/AddProductPackage
        [Authorize]
        [Route("api/AddProductPackage")]
        public int Post(Models.ProductPackage value)
        {
            try
            {
                Data.MstProductPackage NewProductPackage = new Data.MstProductPackage();

                NewProductPackage.ProductPackage = value.ProductPackageDescription;
                NewProductPackage.SKU = value.SKU;
                NewProductPackage.Price = value.Price;
                NewProductPackage.ProductId = value.ProductId;
                NewProductPackage.IsAvailable = value.IsAvailable;
                NewProductPackage.WithCoupon = value.WithCoupon;
                NewProductPackage.WithSoftware = value.WithSoftware;
                NewProductPackage.IsReoccuring = value.IsReoccuring;
                NewProductPackage.Particulars = value.Particulars;

                db.MstProductPackages.InsertOnSubmit(NewProductPackage);
                db.SubmitChanges();

                return NewProductPackage.Id;
            }
            catch
            {
                return 0;
            }
        }

        // PUT /api/UpdateProductPackage/5
        [Authorize]
        [Route("api/UpdateProductPackage/{Id}")]
        public HttpResponseMessage Put(int Id, Models.ProductPackage value)
        {
            try
            {
                //var Sales = from d in db.TrnSales where d.Id == Id select d;
                var ProductPackage = from d in db.MstProductPackages where d.Id == Id select d;

                if (ProductPackage.Any())
                {

                    var UpdatedProductPackage = ProductPackage.FirstOrDefault();

                    UpdatedProductPackage.ProductPackage = value.ProductPackageDescription;
                    UpdatedProductPackage.SKU = value.SKU;
                    UpdatedProductPackage.Price = value.Price;
                    UpdatedProductPackage.ProductId = value.ProductId;
                    UpdatedProductPackage.IsAvailable = value.IsAvailable;
                    UpdatedProductPackage.WithCoupon = value.WithCoupon;
                    UpdatedProductPackage.WithSoftware = value.WithSoftware;
                    UpdatedProductPackage.IsReoccuring = value.IsReoccuring;
                    UpdatedProductPackage.Particulars = value.Particulars;

                    db.SubmitChanges();
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (NullReferenceException)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // DELETE api/DeleteProductPackage/5
        [Authorize]
        [Route("api/DeleteProductPackage/{Id}")]
        public HttpResponseMessage Delete(int Id)
        {
            Data.MstProductPackage DeleteProductPackage = db.MstProductPackages.Where(d => d.Id == Id).First();

            if (DeleteProductPackage != null)
            {
                db.MstProductPackages.DeleteOnSubmit(DeleteProductPackage);
                try
                {
                    db.SubmitChanges();
                    return Request.CreateResponse(HttpStatusCode.OK);
                }
                catch
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest);
                }
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
        }

    }


}


