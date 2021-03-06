﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MagentaTraders.Controllers
{
    public class StockPriceController : ApiController
    {
        private Data.MagentaTradersDBDataContext db = new Data.MagentaTradersDBDataContext();

        // GET api/StockPrice/FB
        public Models.StockPriceWrapper Get(string symbol)
        {
            List<Models.StockPrice> prices;
            var retryCounter = 0;
            string SymbolDescription = "";

            while (true)
            {
                try
                {
                    DateTime date2 = (from d in db.TrnStockPrices where d.Symbol == symbol select d.QuoteDate).Max();
                    DateTime date1 = ((date2.AddDays(1)).AddYears(-10)).AddMonths(-5);
                    SymbolDescription = db.MstSymbols.Where(d => d.Symbol == symbol).First().Description;

                    var StockPrices = from d in db.TrnStockPrices
                                      where (d.Symbol == symbol) &&
                                            (d.QuoteDate >= date1 && d.QuoteDate <= date2) &&
                                            (d.ClosePrice > 0) &&
                                            (d.Volume > 0)
                                      orderby d.QuoteDate descending
                                      select new Models.StockPrice
                                      {
                                          QuoteDate = Convert.ToString(d.QuoteDate.Year) + "-" + Convert.ToString(d.QuoteDate.Month + 100).Substring(1, 2) + "-" + Convert.ToString(d.QuoteDate.Day + 100).Substring(1, 2),
                                          OpenPrice = d.OpenPrice,
                                          HighPrice = d.HighPrice,
                                          LowPrice = d.LowPrice,
                                          ClosePrice = d.ClosePrice,
                                          Volume = d.Volume
                                      };
                    if (StockPrices.Count() > 0)
                    {
                        prices = StockPrices.ToList();
                    }
                    else
                    {
                        prices = new List<Models.StockPrice>();
                    }
                    break;
                }
                catch
                {
                    if (retryCounter == 3)
                    {
                        prices = new List<Models.StockPrice>();
                        break;
                    }
                    
                    System.Threading.Thread.Sleep(1000);
                    retryCounter++;
                }
            }
            
            var StockPriceWrapper = new Models.StockPriceWrapper();

            StockPriceWrapper.Symbol = symbol.ToUpper();
            StockPriceWrapper.SymbolDescription = SymbolDescription;
            StockPriceWrapper.StockPrices = prices.ToList();

            return StockPriceWrapper;
        }
    }
}
