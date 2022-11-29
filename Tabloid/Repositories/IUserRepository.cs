using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IUserRepository
    {
        List<UserProfile> GetAll();
        void Add(UserProfile userProfile);
        UserProfile GetByEmail(string email);
        UserProfile GetById(int id);
        void UpdateUser(UserProfile user);
        //void ChangeType(UserProfile user);
    }
}