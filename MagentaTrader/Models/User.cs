using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MagentaTrader.Models
{
    public class User
    {
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        public string PhoneNumber { get; set; }
    }
}