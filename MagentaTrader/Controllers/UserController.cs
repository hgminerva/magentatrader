using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MagentaTrader.Controllers
{
    public class UserController : ApiController
    {
        private Data.MagentaTradersDBDataContext db = new Data.MagentaTradersDBDataContext();

        // GET api/User
        public List<Models.User> Get()
        {
            var retryCounter = 0;
            List<Models.User> values;

            while (true)
            {
                try
                {
                    var Users = from d in db.MstUsers
                                select new Models.User
                                {
                                    UserName = d.UserName,
                                    FirstName = d.FirstName,
                                    LastName = d.LastName,
                                    EmailAddress = d.EmailAddress,
                                    PhoneNumber = d.PhoneNumber
                                };
                    if (Users.Count() > 0)
                    {
                        values = Users.ToList();
                    }
                    else
                    {
                        values = new List<Models.User>();
                    }
                    break;
                }
                catch
                {
                    if (retryCounter == 3)
                    {
                        values = new List<Models.User>();
                        break;
                    }

                    System.Threading.Thread.Sleep(1000);
                    retryCounter++;
                }
            }
            return values;
        }
    }
}
