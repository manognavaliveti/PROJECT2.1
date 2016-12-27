package com.ourchatz.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ourchatz.dao.JobsDao;
import com.ourchatz.model.Jobs;



@RestController
public class JobsController {
	@Autowired
	JobsDao jobsDao;
	@RequestMapping(value="/createJobs",headers="Accept=application/json",method=RequestMethod.POST)
	public void saveJobs(@RequestBody Jobs jobs){
		jobsDao.addJobs(jobs);
		}
	@RequestMapping(value="/viewJobs",headers="Accept=application/json",method=RequestMethod.GET)
	public List<Jobs> getJobs(){
		List<Jobs> blogs=jobsDao.viewJobs();
		return blogs;
	}
	
	@RequestMapping(value="/deleteJob/{id}",headers="Accept=application/json",method=RequestMethod.DELETE)
	public void deleteJob(@PathVariable int id)
	{
		jobsDao.deleteJob(id);
	}
	@RequestMapping(value="/updateJob",headers="Accept=application/json",method=RequestMethod.PUT)
	public void updsateJob(@RequestBody Jobs jobs)
	{
		jobsDao.updateJob(jobs);
	}
	@RequestMapping(value="/viewJob/{id}",headers="Accept=application/json",method=RequestMethod.GET)
	public Jobs viewJob(@PathVariable int id)
	{
		return jobsDao.viewJob(id);
	}
	

}
