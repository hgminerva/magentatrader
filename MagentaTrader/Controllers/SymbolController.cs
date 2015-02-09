using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MagentaTrader.Controllers
{
    public class SymbolController : ApiController
    {
        private Data.MagentaTradersDBDataContext db = new Data.MagentaTradersDBDataContext();

        // GET api/SymbolCalendar/1/2015/80/10.5
        [Authorize]
        [Route("api/SymbolCalendar/{Month}/{Year}/{Delta}/{Percentage}")]
        public Models.CalendarSymbolWrapper GetSymbolCalendar(int Month, int Year, decimal Delta, decimal Percentage)
        {
            var retryCounter = 0;

            List<Models.Symbol> upValues;
            List<Models.Symbol> downValues;

            while (true)
            {
                try
                {
                    // Up
                    var UpSymbols = from d in db.MstSymbols
                                    where (d.CalendarUpDate.Value.Month == Month) &&
                                          (d.CalendarUpDate.Value.Year == Year) &&
                                          (d.CalendarUpDelta >= Delta) &&
                                          (d.CalendarUpPercentage >= Percentage) 
                                    select new Models.Symbol
                                    {
                                       SymbolDescription = d.Symbol,
                                       CalendarUpDay = d.CalendarUpDate.Value.Day
                                    };
                    if (UpSymbols.Count() > 0) {
                        upValues = UpSymbols.ToList();
                    } else {
                        upValues = new List<Models.Symbol>();
                    }

                    // Down
                    var DownSymbols = from d in db.MstSymbols
                                    where (d.CalendarDownDate.Value.Month == Month) &&
                                          (d.CalendarDownDate.Value.Year == Year) &&
                                          (d.CalendarDownDelta >= Delta) &&
                                          (d.CalendarDownPercentage >= Percentage)
                                    select new Models.Symbol
                                    {
                                        SymbolDescription = d.Symbol,
                                        CalendarDownDay = d.CalendarDownDate.Value.Day
                                    };
                    if (DownSymbols.Count() > 0)
                    {
                        downValues = DownSymbols.ToList();
                    }
                    else
                    {
                        downValues = new List<Models.Symbol>();
                    }

                    break;
                }
                catch
                {
                    if (retryCounter == 3)
                    {
                        upValues = new List<Models.Symbol>();
                        downValues = new List<Models.Symbol>();
                        break;
                    }

                    System.Threading.Thread.Sleep(1000);
                    retryCounter++;
                }
            }

            Models.CalendarSymbolWrapper values = new Models.CalendarSymbolWrapper();
            values.UpSymbols = upValues.ToList();
            values.DownSymbols = downValues.ToList();
            return values;
        }
    }
}
