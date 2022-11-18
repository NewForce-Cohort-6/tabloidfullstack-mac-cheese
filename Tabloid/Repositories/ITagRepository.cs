using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ITagRepository
    {
        void Add(Tag tag);

        List<Tag> GetAllTags();
        Tag GetById(int id);
    }
}