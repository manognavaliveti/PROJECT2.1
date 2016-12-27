package com.ourchatz.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Comment {
	@Id@GeneratedValue
	private int commentId;
	private int blogId;
	private String username;
	private String comment;
	
	public int getCommentId() {
		return commentId;
	}
	 public void setCommentId(int commentId) {
		this.commentId = commentId;
	}
	 public int getBlogId() {
		return blogId;
	}
	 public void setBlogId(int blogId) {
		this.blogId = blogId;
	}
	 public String getUsername() {
		return username;
	}
	 public void setUsername(String username) {
		this.username = username;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}


}
