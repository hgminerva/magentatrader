using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MagentaTrader.Controllers
{
    public class StockEarningController : ApiController
    {
        private Data.MagentaTradersDBDataContext db = new Data.MagentaTradersDBDataContext();

        public static int GetQuarter(DateTime dateTime)
        {
            if (dateTime.Month <= 3) return 1;
            if (dateTime.Month <= 6) return 2;
            if (dateTime.Month <= 9) return 3;

            return 4;
        }

        // GET api/StockEarning/FB
        [Authorize]
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

        // GET api/StockEarningHistory/FB/2015-01-01
        [Authorize]
        [Route("api/StockEarningHistory/{Symbol}/{EarningDate}")]
        public List<Models.StockEarning> GetEarningHistory(string symbol, string earningDate)
        {
            List<Models.StockEarning> earnings = new List<Models.StockEarning>();

            try
            {
                var Symbols = from d in db.MstSymbols where d.Symbol == symbol select d;
                CultureInfo provider = CultureInfo.InvariantCulture;

                DateTime date = DateTime.ParseExact(earningDate, "yyyy-MM-dd",provider);
                int quarter = GetQuarter(date);

                earnings = (from d in db.TrnStockEarnings
                            where (d.Symbol == symbol) &&
                                  (d.EarningDate < date) &&
                                  (((d.EarningDate.Month - 1) / 3) == (quarter-1))
                            orderby d.EarningDate descending
                            select new Models.StockEarning
                            {
                                Symbol = d.Symbol,
                                EarningDate = Convert.ToString(d.EarningDate.Year) + "-" + Convert.ToString(d.EarningDate.Month + 100).Substring(1, 2) + "-" + Convert.ToString(d.EarningDate.Day + 100).Substring(1, 2),
                                EarningTime = d.EarningTime
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
