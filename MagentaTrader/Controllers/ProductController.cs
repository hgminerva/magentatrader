using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MagentaTrader.Controllers
{
    public class ProductController : ApiController
    {
        private Data.MagentaTradersDBDataContext db = new Data.MagentaTradersDBDataContext();

        // GET api/Product
        [Authorize]
        public List<Models.Product> Get()
        {
            var retryCounter = 0;
            List<Models.Product> values;

            while (true)
            {
                try
                {
                    var Products = from d in db.MstProducts
                                   select new Models.Product
                                   {
                                     Id = d.Id,
                                     ProductDescription = d.Product
                                  };
                    if (Products.Count() > 0)
                    {
                        values = Products.ToList();
                    }
                    else
                    {
                        values = new List<Models.Product>();
                    }
                    break;
                }
                catch
                {
                    if (retryCounter == 3)
                    {
                        values = new List<Models.Product>();
                        break;
                    }

                    System.Threading.Thread.Sleep(1000);
                    retryCounter++;
                }
            }
            return values;
        }

        // POST api/AddProduct
        [Authorize]
        [Route("api/AddProduct")]
        public int Post(Models.Product value)
        {
            try
            {

                Data.MstProduct NewProduct = new Data.MstProduct();

                NewProduct.Product = value.ProductDescription;

                db.MstProducts.InsertOnSubmit(NewProduct);
                db.SubmitChanges();

                return NewProduct.Id;
            }
            catch
            {
                return 0;
            }
        }

        // PUT /api/UpdateProduct/5
        [Authorize]
        [Route("api/UpdateProduct/{Id}")]
        public HttpResponseMessage Put(int Id, Models.Product value)
        {
            try
            {
                var Products = from d in db.MstProducts where d.Id == Id select d;

                if (Products.Any())
                {
                    var UpdatedProduct = Products.FirstOrDefault();

                    UpdatedProduct.Product = value.ProductDescription;

                    db.SubmitChanges();

                    return Request.CreateResponse(HttpStatusCode.OK);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }
            }
            catch (NullReferenceException)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // DELETE api/DeleteProduct/5
        [Authorize]
        [Route("api/DeleteProduct/{Id}")]
        public HttpResponseMessage Delete(int Id)
        {
            Data.MstProduct DeleteProduct = db.MstProducts.Where(d => d.Id == Id).First();

            if (DeleteProduct != null)
            {
                db.MstProducts.DeleteOnSubmit(DeleteProduct);
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
