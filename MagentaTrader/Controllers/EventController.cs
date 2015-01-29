using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MagentaTrader.Controllers
{
    public class EventController : ApiController
    {
        private Data.MagentaTradersDBDataContext db = new Data.MagentaTradersDBDataContext();

        // GET api/Event
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

        // POST api/AddEvent
        [Authorize]
        [Route("api/AddEvent")]
        public int Post(Models.Event value)
        {
            try
            {

                Data.MstEvent NewEvent = new Data.MstEvent();

                SqlDateTime EventDate = new SqlDateTime(new DateTime(Convert.ToDateTime(value.EventDate).Year, +
                                                                     Convert.ToDateTime(value.EventDate).Month, +
                                                                     Convert.ToDateTime(value.EventDate).Day));


                NewEvent.EventDate = EventDate.Value;
                NewEvent.EventDescription = value.EventDescription;
                NewEvent.Particulars = value.Particulars;
                NewEvent.URL = value.URL;
                NewEvent.EventType = value.EventType;
                NewEvent.IsRestricted = value.IsRestricted;
                NewEvent.IsArchived = value.IsArchived;

                db.MstEvents.InsertOnSubmit(NewEvent);
                db.SubmitChanges();

                return NewEvent.Id;
            }
            catch
            {
                return 0;
            }
        }

        // PUT /api/UpdateEvent/5
        [Authorize]
        [Route("api/UpdateEvent/{Id}")]
        public HttpResponseMessage Put(int Id, Models.Event value)
        {
            try
            {
                var Events = from d in db.MstEvents where d.Id == Id select d;

                if (Events.Any())
                {
                    var UpdatedEvent = Events.FirstOrDefault();

                    SqlDateTime EventDate = new SqlDateTime(new DateTime(Convert.ToDateTime(value.EventDate).Year, +
                                                                         Convert.ToDateTime(value.EventDate).Month, +
                                                                         Convert.ToDateTime(value.EventDate).Day));


                    UpdatedEvent.EventDate = EventDate.Value;
                    UpdatedEvent.EventDescription = value.EventDescription;
                    UpdatedEvent.Particulars = value.Particulars;
                    UpdatedEvent.URL = value.URL;
                    UpdatedEvent.EventType = value.EventType;
                    UpdatedEvent.IsRestricted = value.IsRestricted;
                    UpdatedEvent.IsArchived = value.IsArchived;

                    db.SubmitChanges();
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (NullReferenceException)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // DELETE api/DeleteEvent/5
        [Authorize]
        [Route("api/DeleteEvent/{Id}")]
        public HttpResponseMessage Delete(int Id)
        {
            Data.MstEvent DeleteEvent = db.MstEvents.Where(d => d.Id == Id).First();

            if (DeleteEvent != null)
            {
                db.MstEvents.DeleteOnSubmit(DeleteEvent);
                try
                {
                    db.SubmitChanges();
                    return Request.CreateResponse(HttpStatusCode.OK);
                }
                catch
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest);
                }
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
        }  
    }
}
