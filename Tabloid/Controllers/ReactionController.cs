using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReactionController : ControllerBase
    {
        private readonly IReactionRepository _reactionRepo;
        public ReactionController(IReactionRepository reactionRepository)
        {
            _reactionRepo = reactionRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_reactionRepo.GetAllReactions());
        }

        [HttpPost]
        public IActionResult Post(Reaction reaction)
        {
            _reactionRepo.Add(reaction);
            return CreatedAtAction("Get", new {id = reaction.Id}, reaction);
        }
        // GET: ReactionController
        //public ActionResult Index()
        //{
        //    return View();
        //}

        //// GET: ReactionController/Details/5
        //public ActionResult Details(int id)
        //{
        //    return View();
        //}

        //// GET: ReactionController/Create
        //public ActionResult Create()
        //{
        //    return View();
        //}

        //// POST: ReactionController/Create
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Create(IFormCollection collection)
        //{
        //    try
        //    {
        //        return RedirectToAction(nameof(Index));
        //    }
        //    catch
        //    {
        //        return View();
        //    }
        //}

        //// GET: ReactionController/Edit/5
        //public ActionResult Edit(int id)
        //{
        //    return View();
        //}

        //// POST: ReactionController/Edit/5
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Edit(int id, IFormCollection collection)
        //{
        //    try
        //    {
        //        return RedirectToAction(nameof(Index));
        //    }
        //    catch
        //    {
        //        return View();
        //    }
        //}

        //// GET: ReactionController/Delete/5
        //public ActionResult Delete(int id)
        //{
        //    return View();
        //}

        //// POST: ReactionController/Delete/5
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Delete(int id, IFormCollection collection)
        //{
        //    try
        //    {
        //        return RedirectToAction(nameof(Index));
        //    }
        //    catch
        //    {
        //        return View();
        //    }
        //}
    }
}
