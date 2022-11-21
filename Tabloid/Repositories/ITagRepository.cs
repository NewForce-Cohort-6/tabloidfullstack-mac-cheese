using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ITagRepository
    {
        void Add(Tag tag);
        void Delete(int id);
        List<Tag> GetAllTags();
        Tag GetById(int id);
        void Update(Tag tag);
    }
}