using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IReactionRepository
    {
        public void Add(Reaction reaction);
        public List<Reaction> GetAllReactions();
    }
}
