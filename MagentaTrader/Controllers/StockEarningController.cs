using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MagentaTrader.Controllers
{
    public class StockEarningController : ApiController
    {
        private Data.MagentaTradersDBDataContext db = new Data.MagentaTradersDBDataContext();

        // GET api/StockEarning/FB
        public List<Models.StockEarning> Get(string symbol)
        {
            List<Models.StockEarning> earnings = new List<Models.StockEarning>();

            try
            {
                var Symbols = from d in db.MstSymbols where d.Symbol == symbol select d;

                DateTime date = Symbols.FirstOrDefault().LatestQuoteDate.Value;
                DateTime date1 = date.AddMonths(-6);
                DateTime date2 = date.AddMonths(6);

                earnings = (from d in db.TrnStockEarnings
                            where (d.Symbol == symbol) &&
                                  (d.EarningDate >= date1 && d.EarningDate <= date2)
                            orderby d.EarningDate descending
                            select new Models.StockEarning
                            {
                                EarningDate = Convert.ToString(d.EarningDate.Year) + "-" + Convert.ToString(d.EarningDate.Month + 100).Substring(1, 2) + "-" + Convert.ToString(d.EarningDate.Day + 100).Substring(1, 2),
                                Symbol = d.Symbol
                            }).ToList();
            }
            catch
            {
                earnings = new List<Models.StockEarning>();
            }

            return earnings.ToList();
        }
    }
}
