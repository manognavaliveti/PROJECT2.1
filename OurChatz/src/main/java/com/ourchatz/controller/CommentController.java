package com.ourchatz.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ourchatz.dao.CommentDao;
import com.ourchatz.model.Comment;


@RestController
public class CommentController {
	@Autowired
	CommentDao commentDao;
	@RequestMapping(value="/addComment",headers="accept=Application/json",method=RequestMethod.POST)
	public void addComment(@RequestBody Comment comment){
		commentDao.addComment(comment);
	}
	@RequestMapping(value="/viewComments/{blogId}",headers="accept=Application/json",method=RequestMethod.GET)
	List<Comment> viewComment(@PathVariable int blogId){
		 return commentDao.viewComment(blogId);
	}
}
