using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MagentaTrader.Models
{
    public class ProductPackage
    {
        public int Id { get; set; }
        public string ProductPackageDescription { get; set; }
        public string SKU { get; set; }
        public decimal Price { get; set; }
        public int ProductId { get; set; }
        public string Product { get; set; }
        public bool IsAvailable { get; set; }
        public bool WithCoupon { get; set; }
        public bool WithSoftware { get; set; }
        public bool IsReoccuring { get; set; }
        public string Particulars { get; set; }
    }
}