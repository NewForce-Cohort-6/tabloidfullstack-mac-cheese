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
                SELECT p.Id AS PostId, p.Title, p.Content, p.CreateDateTime AS PostDateCreated, p.PublishDateTime,  
                       p.ImageLocation AS PostImageUrl, p.CategoryId, p.UserProfileId, 

                       up.FirstName, up.LastName, up.DisplayName, up.Email, up.CreateDateTime AS UserProfileDateCreated, 
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
                                Content = DbUtils.GetString(reader, "Content"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "PostDateCreated"),
                                PublishDateTime = DbUtils.GetDateTime(reader, ("PublishDateTime")),
                                ImageLocation = DbUtils.GetString(reader, "PostImageUrl"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "UserProfileId"),                                    
                                    FirstName = DbUtils.GetString(reader, "FirstName"),
                                    LastName = DbUtils.GetString(reader, "LastName"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
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




//namespace Tabloid.Repositories
//{
//    public class PostRepository : BaseRepository, IPostRepository
//    {
//        public PostRepository(IConfiguration configuration) : base(configuration) { }

//        public List<Post> GetAll()
//        {
//            using (var conn = Connection)
//            {
//                conn.Open();
//                using (var cmd = conn.CreateCommand())
//                {
//                    cmd.CommandText = @"
//SELECT p.Id, p.Title, p.Content, p.CreateDateTime AS PostDateCreated, p.PublishDateTime, p.IsApproved,
//       p.ImageLocation AS PostImageUrl, p.CategoryId, p.UserProfileId,

//       up.FirstName, up.LastName, up.DisplayName, up.Email, up.CreateDateTime AS UserProfileDateCreated,
//       up.ImageLocation AS UserProfileImageUrl,
//       c.[Name] AS CategoryName,
//       up.UserTypeId,
//       ut.[Name] AS UserTypeName
//  FROM Post p

//       LEFT JOIN UserProfile up ON p.UserProfileId = up.id

//       LEFT JOIN Category c ON p.CategoryId = c.id

//        LEFT JOIN UserType ut ON up.UserTypeId = ut.id

//    WHERE IsApproved = 1 AND PublishDateTime<SYSDATETIME()
//    ORDER BY p.PublishDateTime DESC";

//                    //cmd.Parameters.AddWithValue("now", DateTime.Now);
//                    var reader = cmd.ExecuteReader();

//                    //List<Post> posts = new List<Post>();
//                    var posts = new List<Post>();
//                    while (reader.Read())
//                    {
//                        posts.Add(new Post()

//                        {
//                            Id = DbUtils.GetInt(reader, "PostId"),
//                            Title = DbUtils.GetString(reader, "Title"),
//                            Content = DbUtils.GetString(reader, "Content"),
//                            CreateDateTime = DbUtils.GetDateTime(reader, "PostDateCreated"),
//                            PublishDateTime = DbUtils.GetDateTime(reader, ("PublishDateTime")),
//                            ImageLocation = DbUtils.GetString(reader, "PostImageUrl"),
//                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
//                            UserProfile = new UserProfile()
//                            {
//                                Id = DbUtils.GetInt(reader, "UserProfileId"),
//                                FirstName = DbUtils.GetString(reader, "FirstName"),
//                                LastName = DbUtils.GetString(reader, "LastName"),
//                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
//                                Email = DbUtils.GetString(reader, "Email"),
//                                CreateDateTime = DbUtils.GetDateTime(reader, "UserProfileDateCreated"),
//                                ImageLocation = DbUtils.GetString(reader, "UserProfileImageUrl"),
//                                UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
//                                UserType = new UserType()
//                                {
//                                    Id = DbUtils.GetInt(reader, "UserTypeId"),
//                                    Name = DbUtils.GetString(reader, "UserTypeName")
//                                }
//                            },
//                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
//                            Category = new Category()
//                            {
//                                Id = DbUtils.GetInt(reader, "CategoryId"),
//                                Name = DbUtils.GetString(reader, "CategoryName"),
//                            },
//                        });

//                    }

//                    reader.Close();

//                    return posts;
//                }
//            }
//        }

//        //This creates a list of all posts by the logged in user.
//        public List<Post> GetUserPosts(int userProfileId)
//        {
//            using (var conn = Connection)
//            {
//                conn.Open();
//                using (var cmd = conn.CreateCommand())
//                {
//                    cmd.CommandText = @"
//                SELECT p.Id, p.Title, p.Content, p.CreateDateTime AS PostDateCreated, p.PublishDateTime, p.IsApproved,
//                       p.ImageLocation AS PostImageUrl, p.CategoryId, p.UserProfileId, 

//                       up.FirstName, up.LastName, up.DisplayName, up.Email, up.CreateDateTime AS UserProfileDateCreated, 
//                       up.ImageLocation AS UserProfileImageUrl,
//                       c.[Name] AS CategoryName,
//                       up.UserTypeId, 
//                       ut.[Name] AS UserTypeName
//                  FROM Post p 
//                       LEFT JOIN UserProfile up ON p.UserProfileId = up.id
//                       LEFT JOIN Category c ON p.CategoryId = c.id   
//                        LEFT JOIN UserType ut ON up.UserTypeId = ut.id
//                    WHERE IsApproved = 1 AND PublishDateTime<SYSDATETIME()
//                    ORDER BY p.PublishDateTime DESC";

//                    cmd.Parameters.AddWithValue("@UserProfileId", userProfileId);

//                    var reader = cmd.ExecuteReader();

//                    var posts = new List<Post>();
//                    //List<Post> posts = new List<Post>();

//                    while (reader.Read())
//                    {
//                        Post post = new Post()

//                        {
//                            Id = DbUtils.GetInt(reader, "PostId"),
//                            Title = DbUtils.GetString(reader, "Title"),
//                            Content = DbUtils.GetString(reader, "Content"),
//                            CreateDateTime = DbUtils.GetDateTime(reader, "PostDateCreated"),
//                            PublishDateTime = DbUtils.GetDateTime(reader, ("PublishDateTime")),
//                            ImageLocation = DbUtils.GetString(reader, "PostImageUrl"),
//                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
//                            UserProfile = new UserProfile()
//                            {
//                                Id = DbUtils.GetInt(reader, "UserProfileId"),
//                                FirstName = DbUtils.GetString(reader, "FirstName"),
//                                LastName = DbUtils.GetString(reader, "LastName"),
//                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
//                                Email = DbUtils.GetString(reader, "Email"),
//                                CreateDateTime = DbUtils.GetDateTime(reader, "UserProfileDateCreated"),
//                                ImageLocation = DbUtils.GetString(reader, "UserProfileImageUrl"),
//                                UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
//                                UserType = new UserType()
//                                {
//                                    Id = DbUtils.GetInt(reader, "UserTypeId"),
//                                    Name = DbUtils.GetString(reader, "UserTypeName")
//                                }
//                            },
//                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
//                            Category = new Category()
//                            {
//                                Id = DbUtils.GetInt(reader, "CategoryId"),
//                                Name = DbUtils.GetString(reader, "CategoryName"),
//                            },
//                        };
//                        posts.Add(post);

//                    }

//                    reader.Close();

//                    return posts;
//                }
//            }
//        }

//    }


//}