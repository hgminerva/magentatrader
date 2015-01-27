using System;
using System.Collections.Generic;
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
                                       PurchaseDate = d.PurchaseDate.ToShortDateString(),
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
    }
}
