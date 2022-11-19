using System.Collections.Generic;
using System;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
    
       List<Post> GetAllWithComments();
       public List<Post> GetAll();

    }
}
