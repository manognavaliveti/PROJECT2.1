package com.ourchatz.dao;

import java.util.List;

import com.ourchatz.model.Comment;

public interface CommentDao {
	void addComment(Comment comment);
    List<Comment> viewComment(int blogId);
    void updateComment(Comment comment);
    void deleteComment(int id);
}
