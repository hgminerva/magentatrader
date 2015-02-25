using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MagentaTrader.Controllers
{
    public class NewsController : ApiController
    {
        private Data.MagentaTradersDBDataContext db = new Data.MagentaTradersDBDataContext();

        // GET api/News
        [Authorize]
        public List<Models.News> Get()
        {
            var retryCounter = 0;
            List<Models.News> values;

            while (true)
            {
                try
                {
                    var News = from d in db.MstNews
                               orderby d.Id descending
                               select new Models.News
                               {
                                    Id = d.Id,
                                    NewsDate = d.NewsDate.ToShortDateString(),
                                    News = d.News,
                                    Particulars = d.Particulars
                               };
                    if (News.Count() > 0)
                    {
                        values = News.ToList();
                    }
                    else
                    {
                        values = new List<Models.News>();
                    }
                    break;
                }
                catch
                {
                    if (retryCounter == 3)
                    {
                        values = new List<Models.News>();
                        break;
                    }

                    System.Threading.Thread.Sleep(1000);
                    retryCounter++;
                }
            }
            return values;
        }

        // POST api/AddNews
        [Authorize]
        [Route("api/AddNews")]
        public int Post(Models.News value)
        {
            try
            {

                Data.MstNew NewNews = new Data.MstNew();

                SqlDateTime NewsDate = new SqlDateTime(new DateTime(Convert.ToDateTime(value.NewsDate).Year, +
                                                                    Convert.ToDateTime(value.NewsDate).Month, +
                                                                    Convert.ToDateTime(value.NewsDate).Day));


                NewNews.NewsDate = NewsDate.Value;
                NewNews.News = value.News;
                NewNews.Particulars = value.Particulars;

                db.MstNews.InsertOnSubmit(NewNews);
                db.SubmitChanges();

                return NewNews.Id;
            }
            catch
            {
                return 0;
            }
        }

        // PUT /api/UpdateNews/5
        [Authorize]
        [Route("api/UpdateNews/{Id}")]
        public HttpResponseMessage Put(int Id, Models.News value)
        {
            try
            {
                var News = from d in db.MstNews where d.Id == Id select d;

                if (News.Any())
                {
                    var UpdatedNews = News.FirstOrDefault();

                    SqlDateTime NewsDate = new SqlDateTime(new DateTime(Convert.ToDateTime(value.NewsDate).Year, +
                                                                        Convert.ToDateTime(value.NewsDate).Month, +
                                                                        Convert.ToDateTime(value.NewsDate).Day));

                    UpdatedNews.NewsDate = NewsDate.Value;
                    UpdatedNews.News = value.News;
                    UpdatedNews.Particulars = value.Particulars;

                    db.SubmitChanges();

                    return Request.CreateResponse(HttpStatusCode.OK);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }
            }
            catch (NullReferenceException)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // DELETE api/DeleteNews/5
        [Authorize]
        [Route("api/DeleteNews/{Id}")]
        public HttpResponseMessage Delete(int Id)
        {
            Data.MstNew DeleteNews = db.MstNews.Where(d => d.Id == Id).First();

            if (DeleteNews != null)
            {
                db.MstNews.DeleteOnSubmit(DeleteNews);
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
