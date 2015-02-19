using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MagentaTrader.Controllers
{
    public class StockPriceController : ApiController
    {
        private Data.MagentaTradersDBDataContext db = new Data.MagentaTradersDBDataContext();

        // GET api/StockPrice/FB
        [Authorize]
        public Models.StockPriceWrapper Get(string symbol)
        {
            List<Models.StockPrice> prices = new List<Models.StockPrice>();

            string SymbolDescription = "";

            try
            {
                var Symbols = from d in db.MstSymbols where d.Symbol == symbol select d;

                SymbolDescription = Symbols.FirstOrDefault().Description;
                DateTime date2 = Symbols.FirstOrDefault().LatestQuoteDate.Value;
                DateTime date1 = ((date2.AddDays(1)).AddYears(-10)).AddMonths(-5);

                var StockPrices = (from d in db.TrnStockPrices
                                    where (d.Symbol == symbol) &&
                                        (d.QuoteDate >= date1 && d.QuoteDate <= date2)
                                    orderby d.QuoteDate descending
                                    select new Models.StockPrice
                                    {
                                        QuoteDate = Convert.ToString(d.QuoteDate.Year) + "-" + Convert.ToString(d.QuoteDate.Month + 100).Substring(1, 2) + "-" + Convert.ToString(d.QuoteDate.Day + 100).Substring(1, 2),
                                        OpenPrice = d.OpenPrice,
                                        HighPrice = d.HighPrice,
                                        LowPrice = d.LowPrice,
                                        ClosePrice = d.ClosePrice,
                                        Volume = d.Volume
                                    }).ToList();

                foreach (var StockPrice in StockPrices)
                {
                    if (StockPrice.ClosePrice > 0 && StockPrice.Volume > 0)
                    {
                        Models.StockPrice price = new Models.StockPrice();
                        price.QuoteDate = StockPrice.QuoteDate;
                        price.OpenPrice = StockPrice.OpenPrice;
                        price.HighPrice = StockPrice.HighPrice;
                        price.LowPrice = StockPrice.LowPrice;
                        price.ClosePrice = StockPrice.ClosePrice;
                        price.Volume = StockPrice.Volume;

                        prices.Add(price);
                    }
                }
            }
            catch
            {
                    prices = new List<Models.StockPrice>();
            }

            var StockPriceWrapper = new Models.StockPriceWrapper();

            StockPriceWrapper.Symbol = symbol.ToUpper();
            StockPriceWrapper.SymbolDescription = SymbolDescription;
            StockPriceWrapper.StockPrices = prices.ToList();

            return StockPriceWrapper;
        }
    }
}
