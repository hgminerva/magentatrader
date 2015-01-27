using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MagentaTrader.Models
{
    public class StockPrice
    {
        public string QuoteDate { get; set; }
        public decimal OpenPrice { get; set; }
        public decimal HighPrice { get; set; }
        public decimal LowPrice { get; set; }
        public decimal ClosePrice { get; set; }
        public decimal Volume { get; set; }
    }
}