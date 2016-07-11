using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TheBannerMaker.Data;
using TheBannerMaker.Models;

namespace TheBannerMaker.Controllers
{
    public class HomeController : Controller
    {
        public List<string> languages = new List<string> { "BG", "UK", "TR", "SQ" };
        public int languageIndex;

        // GET: Home
        public ActionResult Index()
        {
            
            var languagesList = new List<SelectListItem>();
            languagesList.Add(new SelectListItem { Value = "0", Text = "Български" });
            languagesList.Add(new SelectListItem { Value = "1", Text = "Английски" });
            languagesList.Add(new SelectListItem { Value = "2", Text = "Турски" });
            languagesList.Add(new SelectListItem { Value = "3", Text = "Албански" });
            
            
            ViewData["languages"] = languagesList;

            return View();
        }

         public ActionResult SportList()
        {
            IQueryable sports = Sport.GetSports();

            if (HttpContext.Request.IsAjaxRequest())
            {
                return Json(new SelectList(
                    sports,
                    "SportId",
                    "SportName"), JsonRequestBehavior.AllowGet
                    );
            }

            return View(sports);
        }


        //GET: Home/GetTournaments/sportId
        public ActionResult GetTournaments(string sportId)
        {
            IQueryable tournaments = Tournament.GetTournaments(sportId);

            if (HttpContext.Request.IsAjaxRequest())
            {
                return Json(new SelectList(
                    tournaments,
                    "TournamentId",
                    "TournamentName"), JsonRequestBehavior.AllowGet
                );
            }

            return View(tournaments);
        }


        //GET/Home/GetMatches
        public ActionResult GetMatches(string TournamentId)
        {
            var tournament = TournamentId.Remove(TournamentId.Length - 1, 1);

            languageIndex = int.Parse(TournamentId.Last().ToString());


            IQueryable matches = Match.GetMatches(tournament, languages[languageIndex]);

            //var select = new { data1 = new SelectList(matches, "MatchID", "MatchName"), data2 = matches };

            if (HttpContext.Request.IsAjaxRequest())
            {
                return Json(matches, JsonRequestBehavior.AllowGet);
            }

            return View(matches);
        }

        //GET/Home/GetMarkets

        public ActionResult GetMarkets(string MatchId)
        {
            var match = MatchId.Remove(0, 5);

            languageIndex = int.Parse(match.Last().ToString());
            match = match.Remove(match.Length - 1, 1);

            IQueryable markets = Market.GetMarkets(match + ".1", languages[languageIndex]);



            if (HttpContext.Request.IsAjaxRequest())
            {
                return Json(new SelectList(
                    markets,
                    "MatchStart",
                    "MarketName"), JsonRequestBehavior.AllowGet
                );
            }

            return View(markets);
        }


        public ActionResult AddEvents(List<MatchVisualModel> models)
        {
            
            if (models != null && models.Count != 0)
            {
                foreach (var model in models)
                {

                    var context = new Context();

                    context.MatchesDatabase.Add(new MatchDBModel
                    {
                        Market = model.Market,
                        MatchId = model.MatchId,
                        MatchInplayId = model.MatchInplayId,
                        MatchName = model.MatchName,
                        Sport = model.Sport,
                        //MatchDisplayDate = DateTime.Now.AddDays(1).Date,
                        MatchDisplayDate = Convert.ToDateTime(model.MatchTime).AddHours(2),
                        Language = languages[int.Parse(model.Language)],
                        IsInplay = model.IsInplay,
                        IsInplayNow = model.IsInplayNow,
                        IsSpecial = model.IsSpecial
                    });
                    context.SaveChanges();
                }

                
                return Json("Success");
            }
            else
            {
                return Json("An Error Has occoured");
            }

        }













        // GET: Home/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Home/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Home/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Home/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Home/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Home/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Home/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
