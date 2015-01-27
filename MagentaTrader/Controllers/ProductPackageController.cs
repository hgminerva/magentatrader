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
    }
}
