using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MagentaTrader.Controllers
{
    public class EventController : ApiController
    {
        private Data.MagentaTradersDBDataContext db = new Data.MagentaTradersDBDataContext();

        // GET api/User
        [Authorize]
        public List<Models.Event> Get()
        {
            var retryCounter = 0;
            List<Models.Event> values;

            while (true)
            {
                try
                {
                    var Events = from d in db.MstEvents
                                 select new Models.Event
                                 {
                                     EventDate = d.EventDate.ToShortDateString(),
                                     EventDescription = d.EventDescription,
                                     Particulars = d.Particulars,
                                     URL = d.URL,
                                     EventType = d.EventType,
                                     IsRestricted = d.IsRestricted,
                                     IsArchived = d.IsArchived,
                                 };
                    if (Events.Count() > 0)
                    {
                        values = Events.ToList();
                    }
                    else
                    {
                        values = new List<Models.Event>();
                    }
                    break;
                }
                catch
                {
                    if (retryCounter == 3)
                    {
                        values = new List<Models.Event>();
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
