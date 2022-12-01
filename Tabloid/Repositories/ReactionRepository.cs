using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class ReactionRepository : BaseRepository, IReactionRepository
    {
        public ReactionRepository(IConfiguration config) : base(config) { }
        public List<Reaction> GetAllReactions()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT r.Id, r.Name, r.ImageLocation
                    FROM Reaction r";

                    var reader = cmd.ExecuteReader();
                    var reactions = new List<Reaction>();
                    while (reader.Read())
                    {
                        reactions.Add(new Reaction()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation"))
                        });
                    }
                    reader.Close();
                    return reactions;
                }
            }
        }
        public void Add(Reaction reaction)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Reaction (Name, ImageLocation)
                    OUTPUT INSERTED.ID
                    VALUES (@Name, @ImageLocation)";

                    DbUtils.AddParameter(cmd, "@Name", reaction.Name);
                    DbUtils.AddParameter(cmd, "@ImageLocation", reaction.ImageLocation);

                    reaction.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
