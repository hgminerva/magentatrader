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
    }
}
