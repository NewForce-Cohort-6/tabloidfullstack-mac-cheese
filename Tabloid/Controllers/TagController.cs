using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController: ControllerBase
    {
        private readonly ITagRepository _tagRepository;
        public TagController(ITagRepository tagRepository)
        {
            _tagRepository = tagRepository;
        }
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_tagRepository.GetAllTags());
        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var tag = _tagRepository.GetById(id);
            if (tag == null)
            {
                return NotFound();
            }
            return Ok(tag);
        }
        [HttpPost]
        public IActionResult Post(Tag tag)
        {
            _tagRepository.Add(tag);
            return CreatedAtAction("Get", new { id = tag.Id }, tag);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _tagRepository.Delete(id);
            return NoContent();
        }
        [HttpPut("{id}")]
        public IActionResult Update(int id, Tag tag)
        {
            _tagRepository.Update(tag);
            return Ok(tag);
        }

    }
}
