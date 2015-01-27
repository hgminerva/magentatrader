using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MagentaTrader.Models
{
    public class Sales
    {
        public int Id { get; set; }
        public int ProductPackageId { get; set; }
        public string ProductPackage { get; set; }
        public int UserId { get; set; }
        public string User { get; set; }
        public string SalesNumber { get; set; }
        public string SalesDate { get; set; }
        public string RenewalDate { get; set; }
        public string ExpiryDate { get; set; }
        public string Particulars { get; set; }
        public decimal Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal Amount { get; set; }
        public bool IsActive { get; set; }
        public bool IsRefunded { get; set; }
    }
}