using System;
using System.Collections.Generic;
using Tabloid.Models;
using Tabloid.Utils;
using Microsoft.Extensions.Configuration;
using Tabloid.Repositories;
using Microsoft.Data.SqlClient;

namespace Tabloid.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration config) : base(config) { }
        public void AddComment(Comment newComment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    INSERT INTO Comment(Subject, Content, UserProfileId, PostId, CreateDateTime)
                                    OUTPUT INSERTED.ID
                                    VALUES (@subject, @content, @userProfileId, @postId, @createDateTime)";
                    cmd.Parameters.AddWithValue("@subject", newComment.Subject);
                    cmd.Parameters.AddWithValue("@content", newComment.Content);
                    cmd.Parameters.AddWithValue("@userProfileId", newComment.UserProfileId);
                    cmd.Parameters.AddWithValue("@postId", newComment.PostId);
                    cmd.Parameters.AddWithValue("@createDateTime", DateTime.Now);

                    newComment.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE Comment
                    SET Subject = @subject, Content = @content
                    WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@subject", comment.Subject);
                    cmd.Parameters.AddWithValue("@content", comment.Content);
                    cmd.Parameters.AddWithValue("@id", comment.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Comment> GetAllComments()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Subject, Content, UserProfileId AS CommentUserProfileid, PostId AS CommentPostId, CreateDateTime AS CommentDateTime
                                        FROM Comment";
                    SqlDataReader reader = cmd.ExecuteReader();
                    List<Comment> comments = new List<Comment>();

                    while (reader.Read())
                    {
                        comments.Add(new Comment()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Subject = reader.GetString(reader.GetOrdinal("Subject")),
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("CommentUserProfileId")),
                            PostId = reader.GetInt32(reader.GetOrdinal("CommentPostId")),
                            CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CommentDateTime"))
                        });
                    }

                    reader.Close();
                    return comments;
                }
            }
        }

        public Comment GetCommentById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Subject, Content, UserProfileId as CommentUserProfileId, PostId AS CommentPostId, CreateDateTime AS CommentCreateDateTime
                                        FROM Comment 
                                        WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);

                    SqlDataReader reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        Comment comment = new Comment()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Subject = reader.GetString(reader.GetOrdinal("Subject")),
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("CommentUserProfileId")),
                            PostId = reader.GetInt32(reader.GetOrdinal("CommentPostId")),
                            CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CommentCreateDateTime"))
                        };
                        reader.Close();
                        return comment;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
        }
    }
}