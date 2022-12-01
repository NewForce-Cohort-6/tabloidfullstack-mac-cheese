using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICommentRepository
    {
        void AddComment(Comment comment);
        void Update(Comment comment);
        public List<Comment> GetAllComments();
        public Comment GetCommentById(int id);
    }
}
