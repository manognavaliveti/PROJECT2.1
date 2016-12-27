package com.ourchatz.dao;

import java.util.List;


import com.ourchatz.model.Jobs;

public interface JobsDao {
	void addJobs(Jobs jobs);
	List<Jobs> viewJobs();
	 void deleteJob(int id);
	   void updateJob(Jobs jobs);
	   Jobs viewJob(int id);
	  

}
