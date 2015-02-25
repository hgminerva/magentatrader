using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MagentaTrader.Models
{
    public class News
    {
        public int Id { get; set; }
        public string NewsDate { get; set; }
        public string News { get; set; }
        public string Particulars { get; set; }
    }
}