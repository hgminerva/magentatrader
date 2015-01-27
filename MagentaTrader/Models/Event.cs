using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MagentaTrader.Models
{
    public class Event
    {
        public int Id { get; set; }
        public string EventDate { get; set; }
        public string EventDescription { get; set; }
        public string Particulars { get; set; }
        public string URL { get; set; }
        public string EventType { get; set; }
        public bool IsRestricted { get; set; }
        public bool IsArchived { get; set; }
    }
}