package com.ourchatz.dao;

import java.util.List;

import com.ourchatz.model.Blog;

public interface BlogDao {
	void createBlog(Blog blog);
	List<Blog> viewBlogs();
	List<Blog> viewMyBlogs(String postedBy);
	void updateBlog(Blog blog);
	void deleteBlog(int id);
	
	
}
