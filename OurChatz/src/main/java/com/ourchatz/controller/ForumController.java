package com.ourchatz.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ourchatz.dao.ForumDao;
import com.ourchatz.model.Blog;
import com.ourchatz.model.Forum;

@RestController
public class ForumController {
	@Autowired
	ForumDao forumDao;
	@RequestMapping(value="/addQuestion",headers="Accept=application/json",method=RequestMethod.POST)
	  public void addQuestion(@RequestBody Forum forum)
	  {
		 forumDao.addQuestion(forum); 
	  }
	@RequestMapping(value="/viewQuestions",headers="Accept=application/json",method=RequestMethod.GET)
	  public List<Forum> viewQuestions(Forum forum)
	  {
		 return forumDao.viewQuestions();
	  }
	@RequestMapping(value="/updateQuestion",headers="Accept=application/json",method=RequestMethod.PUT)
	public void updateQuestion(@RequestBody Forum forum)
	{
		forumDao.updateQuestion(forum);
	}
	@RequestMapping(value="/deleteQuestion/{id}",headers="Accept=application/json",method=RequestMethod.DELETE)
	public void deleteQuestion(@PathVariable("id") int id)
	{
		forumDao.deleteQuestion(id);
	}
	@RequestMapping(value="/viewMyQuestions/{givenBy}",headers="Accept=application/json",method=RequestMethod.GET)
	public List<Forum> viewQuestions (@PathVariable("givenBy")String givenBy){
		System.out.print("given name:"+givenBy);
	    return forumDao.viewQuestions(givenBy);
		}
	

}
