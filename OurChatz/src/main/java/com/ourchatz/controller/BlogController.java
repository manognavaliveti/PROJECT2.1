package com.ourchatz.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ourchatz.dao.BlogDao;
import com.ourchatz.model.Blog;



@RestController
public class BlogController {
	@Autowired
	BlogDao blogDao;
	
	@RequestMapping(value="/createBlog",headers="Accept=application/json",method=RequestMethod.POST)
	public void saveUser(@RequestBody Blog blog){
		blogDao.createBlog(blog);
		
	}
	
	
	@RequestMapping(value="/viewBlogs",headers="Accept=application/json",method=RequestMethod.GET)
	public List<Blog> viewBlogs(){
		List<Blog> blogs=blogDao.viewBlogs();
		return blogs;
	}
	
	
	@RequestMapping(value="/viewMyBlogs/{postedBy}",headers="Accept=application/json",method=RequestMethod.GET)
	public List<Blog> viewMyBlogs (@PathVariable("postedBy")String postedBy){
		System.out.print("given name:"+postedBy);
	    return blogDao.viewMyBlogs(postedBy);
		}
	
	
	@RequestMapping(value="/updateBlog",headers="Accept=application/json",method=RequestMethod.PUT)
	public void updateBlog(@RequestBody Blog blog)
	{
		System.out.println("Inside update blog");
		blogDao.updateBlog(blog);
	}
	@RequestMapping(value="/deleteBlog/{id}",headers="Accept=application/json",method=RequestMethod.DELETE)
	public void deleteJob(@PathVariable int id)
	{
		blogDao.deleteBlog(id);
	}



}
