using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAll();
        //void Add(Category category);
        //Category GetById(int id);
        //void Update(Category category);
        //void Delete(int id);
    }
}
