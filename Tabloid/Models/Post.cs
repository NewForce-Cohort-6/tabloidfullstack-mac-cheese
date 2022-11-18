using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;
using System;

namespace Tabloid.Models
{
    public class Post
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string ImageLocation { get; set; }

        [Required]
        public DateTime CreateDateTime{ get; set; }

        [Required]
        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }

        [Required]
        public int CategoryId { get; set; }

        public Category Category { get; set; }

    }
}
