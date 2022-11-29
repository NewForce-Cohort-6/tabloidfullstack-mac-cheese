using Microsoft.AspNetCore.Mvc;
using Tabloid.Models;
using Tabloid.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepo;

        public CommentController(ICommentRepository commentRepo)
        {
            _commentRepo = commentRepo;
        }


        // GET api/<CommentController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_commentRepo.GetAllComments());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var comment = _commentRepo.GetCommentById(id);
            if (comment == null)
            {
                return NotFound();
            }
            return Ok(comment);
        }
        // POST api/<CommentController>
        [HttpPost]
        public IActionResult Post(Comment newComment)
        {
            _commentRepo.AddComment(newComment);
            return CreatedAtAction("Get", new { id = newComment.Id }, newComment);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Comment comment)
        {
            _commentRepo.Update(comment);
            return Ok(comment);
        }
        // PUT api/<CommentController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        // DELETE api/<CommentController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}