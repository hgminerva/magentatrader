using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MagentaTrader.Models
{
    public class Symbol
    {
        public string SymbolDescription { get; set; }
	    public string Description { get; set; }
	    public string Exchange { get; set; }
	    public string LatestQuoteDate { get; set; }
	    public string CalendarUpDate { get; set; }
        public int CalendarUpDay { get; set; }
	    public string CalendarUpParticulars { get; set; }
	    public decimal CalendarUpDelta { get; set; }
	    public decimal CalendarUpPercentage { get; set; }
	    public string CalendarDownDate { get; set; }
        public int CalendarDownDay { get; set; }
	    public string CalendarDownParticulars { get; set; }
        public decimal CalendarDownDelta { get; set; }
        public decimal CalendarDownPercentage { get; set; }
    }
}