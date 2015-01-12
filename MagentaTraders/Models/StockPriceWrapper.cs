using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MagentaTraders.Models
{
    public class StockPriceWrapper
    {
        public string Symbol { get; set; }
        public string SymbolDescription { get; set; }
        public List<Models.StockPrice> StockPrices { get; set; }
    }
}