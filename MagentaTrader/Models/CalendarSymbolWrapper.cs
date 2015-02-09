using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MagentaTrader.Models
{
    public class CalendarSymbolWrapper
    {
        public List<Models.Symbol> UpSymbols { get; set; }
        public List<Models.Symbol> DownSymbols { get; set; }
    }
}