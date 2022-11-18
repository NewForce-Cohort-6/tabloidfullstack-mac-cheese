using System.Collections.Generic;
using System;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetAll();
        List<Post> GetAllWithComments();
    }
}
