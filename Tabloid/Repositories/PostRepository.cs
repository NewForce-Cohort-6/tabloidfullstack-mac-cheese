using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Tabloid.Models;
using Tabloid.Utils;
using Microsoft.Data.SqlClient;
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

        public List<Post> GetAllWithComments()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.Id AS PostId, p.Title, p.CreateDateTime AS PostDateCreated, 
                       p.ImageLocation AS PostImageUrl, p.UserProfileId,

                       up.FirstName, up.LastName, up.Email, up.CreateDateTime AS UserProfileDateCreated, 
                       up.ImageLocation AS UserProfileImageUrl, up.DisplayName,

                       c.Id AS CommentId, c.UserProfileId AS CommentUserProfileId, c.Subject, c.Content, c.CreateDateTime as CommentDateCreated
                  FROM Post p 
                       LEFT JOIN UserProfile up ON p.UserProfileId = up.id
                       LEFT JOIN Comment c on c.PostId = p.Id";

                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();
                    while (reader.Read())
                    {
                        var postId = DbUtils.GetInt(reader, "PostId");

                        var existingPost = posts.FirstOrDefault(p => p.Id == postId);
                        if (existingPost == null)
                        {
                            existingPost = new Post()
                            {
                                Id = postId,
                                Title = DbUtils.GetString(reader, "Title"),
                                ImageLocation = DbUtils.GetString(reader, "PostImageUrl"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "PostDateCreated"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "UserProfileId"),
                                    FirstName = DbUtils.GetString(reader, "FirstName"),
                                    LastName = DbUtils.GetString(reader, "LastName"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                    CreateDateTime = DbUtils.GetDateTime(reader, "UserProfileDateCreated"),
                                    ImageLocation = DbUtils.GetString(reader, "UserProfileImageUrl")
                                },
                                Comments = new List<Comment>()
                            };
                            posts.Add(existingPost);
                        }
                        if (DbUtils.IsNotDbNull(reader, "CommentId"))
                        {
                            existingPost.Comments.Add(new Comment()
                            {
                                Id = DbUtils.GetInt(reader, "CommentId"),
                                PostId = postId,
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                                Subject = DbUtils.GetString(reader, "Subject"),
                                Content = DbUtils.GetString(reader, "Content"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "CommentDateCreated"),
                            });
                        }
                    }
                    reader.Close();

                    return posts;
                }
            }
        }

        public Post GetByIdWithComments(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT p.Id AS 'PostId', p.Title, p.Content AS PostContent, 
                              p.ImageLocation AS HeaderImage,
                              p.CreateDateTime AS PostCreateDateTime, p.PublishDateTime, p.IsApproved,
                              p.CategoryId, p.UserProfileId,
                              
                              u.id AS PostUserProfileId, u.FirstName, u.LastName, u.DisplayName, 
                              u.Email, u.CreateDateTime AS UserProfileCreateDateTime, u.ImageLocation AS AvatarImage,
                              u.UserTypeId, 
                              c.Id AS CommentId, c.Subject, c.Content AS CommentContent, c.UserProfileId AS CommentUserProfileId, c.PostId AS PostId, c.CreateDateTime AS CommentCreateDateTime,
                              up.DisplayName AS CommentDisplayName, up.id AS CommentUserProfileId
                           FROM Post p
                               LEFT JOIN UserProfile u ON p.UserProfileId = u.id
                               LEFT JOIN Comment c on c.PostId = p.id
                               LEFT JOIN UserProfile up ON c.UserProfileId = up.id
                               WHERE p.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Post post = null;
                    while (reader.Read())
                    {
                        if (post == null)
                        {
                            post = new Post()
                            {
                                Id = id,
                                Title = DbUtils.GetString(reader, "Title"),
                                Content = DbUtils.GetString(reader, "PostContent"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "PostCreateDateTime"),
                                PublishDateTime = (DateTime)DbUtils.GetNullableDateTime(reader, "PublishDateTime"),
                                ImageLocation = DbUtils.GetString(reader, "HeaderImage"),
                                UserProfileId = DbUtils.GetInt(reader, "PostUserProfileId"),
                                CategoryId = DbUtils.GetInt(reader, "CategoryId"),

                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "PostUserProfileId"),
                                    FirstName = DbUtils.GetString(reader, "FirstName"),
                                    LastName = DbUtils.GetString(reader, "LastName"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    CreateDateTime = DbUtils.GetDateTime(reader, "UserProfileCreateDateTime"),
                                    ImageLocation = DbUtils.GetString(reader, "AvatarImage")
                                },
                                Comments = new List<Comment>()
                            };
                        }
                        if (DbUtils.IsNotDbNull(reader, "CommentId"))
                        {
                            post.Comments.Add(new Comment()
                            {
                                Id = DbUtils.GetInt(reader, "CommentId"),
                                Content = DbUtils.GetString(reader, "CommentContent"),
                                Subject = DbUtils.GetString(reader, "Subject"),
                                PostId = id,
                                UserProfileId = DbUtils.GetInt(reader, "CommentUserProfileId"),
                                CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CommentCreateDateTime")),

                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "CommentUserProfileId"),
                                    DisplayName = DbUtils.GetString(reader, "CommentDisplayName")
                                }
                            });
                        }

                    }
                    reader.Close();

                    return post;
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