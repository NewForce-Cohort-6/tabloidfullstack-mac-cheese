using System.Collections.Generic;
using System;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
       public List<Post> GetAll();

    }
}
