using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MagentaTrader.Controllers
{
    public class SalesController : ApiController
    {
        private Data.MagentaTradersDBDataContext db = new Data.MagentaTradersDBDataContext();

        // GET api/Sales
        [Authorize]
        public List<Models.Sales> Get()
        {
            var retryCounter = 0;
            List<Models.Sales> values;

            while (true)
            {
                try
                {
                    var Sales = from d in db.TrnSales
                                select new Models.Sales
                                {
                                       Id = d.Id,
                                       ProductPackageId = d.ProductPackageId,
                                       ProductPackage = d.MstProductPackage.ProductPackage,
                                       UserId = d.UserId,
                                       User = d.MstUser.UserName,
                                       SalesNumber = d.SalesNumber,
                                       SalesDate = d.SalesDate.ToShortDateString(),
                                       RenewalDate = d.RenewalDate.ToShortDateString(),
                                       ExpiryDate = d.ExpiryDate.ToShortDateString(),
                                       Particulars = d.Particulars,
                                       Quantity = d.Quantity,
                                       Price = d.Price,
                                       Amount = d.Amount,
                                       IsActive = d.IsActive,
                                       IsRefunded = d.IsRefunded
                                };
                    if (Sales.Count() > 0)
                    {
                        values = Sales.ToList();
                    }
                    else
                    {
                        values = new List<Models.Sales>();
                    }
                    break;
                }
                catch
                {
                    if (retryCounter == 3)
                    {
                        values = new List<Models.Sales>();
                        break;
                    }

                    System.Threading.Thread.Sleep(1000);
                    retryCounter++;
                }
            }
            return values;
        }

        // POST api/AddSales
        [Authorize]
        [Route("api/AddSales")]
        public int Post(Models.Sales value)
        {
            try
            {

                Data.TrnSale NewSale = new Data.TrnSale();

                SqlDateTime SalesDate = new SqlDateTime(new DateTime(Convert.ToDateTime(value.SalesDate).Year, +
                                                                     Convert.ToDateTime(value.SalesDate).Month, +
                                                                     Convert.ToDateTime(value.SalesDate).Day));
                SqlDateTime RenewalDate = new SqlDateTime(new DateTime(Convert.ToDateTime(value.RenewalDate).Year, +
                                                                       Convert.ToDateTime(value.RenewalDate).Month, +
                                                                       Convert.ToDateTime(value.RenewalDate).Day));
                SqlDateTime ExpiryDate = new SqlDateTime(new DateTime(Convert.ToDateTime(value.ExpiryDate).Year, +
                                                                      Convert.ToDateTime(value.ExpiryDate).Month, +
                                                                      Convert.ToDateTime(value.ExpiryDate).Day));

                NewSale.ProductPackageId = value.ProductPackageId;
                NewSale.UserId = value.UserId;
                NewSale.SalesNumber = value.SalesNumber;
                NewSale.SalesDate = SalesDate.Value;
                NewSale.RenewalDate = RenewalDate.Value;
                NewSale.ExpiryDate = ExpiryDate.Value;
                NewSale.Particulars = value.Particulars;
                NewSale.Quantity = value.Quantity;
                NewSale.Price = value.Price;
                NewSale.Amount = value.Amount;
                NewSale.IsActive = value.IsActive;
                NewSale.IsRefunded = value.IsRefunded;

                db.TrnSales.InsertOnSubmit(NewSale);
                db.SubmitChanges();

                return NewSale.Id;
            }
            catch
            {
                return 0;
            }
        }

        // PUT /api/UpdateSales/5
        [Authorize]
        [Route("api/UpdateSales/{Id}")]
        public HttpResponseMessage Put(int Id, Models.Sales value)
        {
            try
            {
                var Sales = from d in db.TrnSales where d.Id == Id select d;

                if (Sales.Any())
                {
                    var UpdatedSale = Sales.FirstOrDefault();

                    SqlDateTime SalesDate = new SqlDateTime(new DateTime(Convert.ToDateTime(value.SalesDate).Year, +
                                                                         Convert.ToDateTime(value.SalesDate).Month, +
                                                                         Convert.ToDateTime(value.SalesDate).Day));
                    SqlDateTime RenewalDate = new SqlDateTime(new DateTime(Convert.ToDateTime(value.RenewalDate).Year, +
                                                                           Convert.ToDateTime(value.RenewalDate).Month, +
                                                                           Convert.ToDateTime(value.RenewalDate).Day));
                    SqlDateTime ExpiryDate = new SqlDateTime(new DateTime(Convert.ToDateTime(value.ExpiryDate).Year, +
                                                                          Convert.ToDateTime(value.ExpiryDate).Month, +
                                                                          Convert.ToDateTime(value.ExpiryDate).Day));

                    UpdatedSale.ProductPackageId = value.ProductPackageId;
                    UpdatedSale.UserId = value.UserId;
                    UpdatedSale.SalesNumber = value.SalesNumber;
                    UpdatedSale.SalesDate = SalesDate.Value;
                    UpdatedSale.RenewalDate = RenewalDate.Value;
                    UpdatedSale.ExpiryDate = ExpiryDate.Value;
                    UpdatedSale.Particulars = value.Particulars;
                    UpdatedSale.Quantity = value.Quantity;
                    UpdatedSale.Price = value.Price;
                    UpdatedSale.Amount = value.Amount;
                    UpdatedSale.IsActive = value.IsActive;
                    UpdatedSale.IsRefunded = value.IsRefunded;

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

        // DELETE api/DeleteSales/5
        [Authorize]
        [Route("api/DeleteSales/{Id}")]
        public HttpResponseMessage Delete(int Id)
        {
            Data.TrnSale DeleteSale = db.TrnSales.Where(d => d.Id == Id).First();

            if (DeleteSale != null)
            {
                db.TrnSales.DeleteOnSubmit(DeleteSale);
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
