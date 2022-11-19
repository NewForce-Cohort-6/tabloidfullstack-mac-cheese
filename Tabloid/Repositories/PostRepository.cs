using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;
using Tabloid.Models;
using Tabloid.Utils;
using Tabloid.Repositories;
using Microsoft.Extensions.Hosting;
using System.Reflection.PortableExecutable;

namespace Tabloid.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }

        public List<Post> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT p.Id AS PostId, p.Title, p.CreateDateTime AS PostDateCreated, 
                       p.ImageLocation AS PostImageUrl, p.CategoryId, p.UserProfileId, 

                       up.FirstName, up.LastName, up.Email, up.CreateDateTime AS UserProfileDateCreated, 
                       up.ImageLocation AS UserProfileImageUrl,

                        c.[Name] AS CategoryName
                  FROM Post p 
                       LEFT JOIN UserProfile up ON p.UserProfileId = up.id
                       LEFT JOIN Category c ON p.CategoryId = c.id               
                    WHERE IsApproved = 1 AND PublishDateTime<SYSDATETIME()
                    ORDER BY p.PublishDateTime DESC";

                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();
                    while (reader.Read())
                    {
                      
                            posts.Add(new Post()
                            {
                                Id = DbUtils.GetInt(reader, "PostId"),
                                Title = DbUtils.GetString(reader, "Title"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "PostDateCreated"),
                                ImageLocation = DbUtils.GetString(reader, "PostImageUrl"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "UserProfileId"),                                    
                                    FirstName = DbUtils.GetString(reader, "FirstName"),
                                    LastName = DbUtils.GetString(reader, "LastName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    CreateDateTime = DbUtils.GetDateTime(reader, "UserProfileDateCreated"),
                                    ImageLocation = DbUtils.GetString(reader, "UserProfileImageUrl"),
                                },
                                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                                Category = new Category()
                                {
                                    Id = DbUtils.GetInt(reader, "CategoryId"),
                                    Name = DbUtils.GetString(reader, "CategoryName"),
                                },
                            });
                       }

                        reader.Close();

                        return posts;
                    } 
                }
            }
        }
    }

//while (reader.Read())
//{

//    posts.Add(new Post()
//    {
//        Id = DbUtils.GetInt(reader, "PostId"),
//        Title = DbUtils.GetString(reader, "Title"),
//        CreateDateTime = DbUtils.GetDateTime(reader, "PostDateCreated"),
//        ImageLocation = DbUtils.GetString(reader, "PostImageUrl"),
//        UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
//        UserProfile = new UserProfile()
//        {
//            Id = DbUtils.GetInt(reader, "UserProfileId"),
//            DisplayName = DbUtils.GetString(reader, "DisplayName"),
//            FirstName = DbUtils.GetString(reader, "FirstName"),
//            LastName = DbUtils.GetString(reader, "LastName"),
//            Email = DbUtils.GetString(reader, "Email"),
//            CreateDateTime = DbUtils.GetDateTime(reader, "UserProfileDateCreated"),
//            ImageLocation = DbUtils.GetString(reader, "UserProfileImageUrl"),
//        },
//        CategoryId = DbUtils.GetInt(reader, "CategoryId"),
//        Category = new Category()
//        {
//            Id = DbUtils.GetInt(reader, "CategoryId"),
//            Name = DbUtils.GetString(reader, "CategoryName"),
//        },
//    });
//}