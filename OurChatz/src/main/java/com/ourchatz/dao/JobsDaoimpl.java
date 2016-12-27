package com.ourchatz.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ourchatz.model.Blog;
import com.ourchatz.model.Jobs;

@Transactional
@Repository
public class JobsDaoimpl implements JobsDao  {
@Autowired
SessionFactory sessionFactory;

public void addJobs(Jobs jobs) {
	sessionFactory.getCurrentSession().save(jobs);
	
}
public List<Jobs> viewJobs() {
	Session session=sessionFactory.getCurrentSession();
	List<Jobs> list=session.createCriteria(Jobs.class).list();
	return list;
}
public void deleteJob(int id) {
	Session session=sessionFactory.getCurrentSession();
	Jobs jobs=(Jobs) session.get(Jobs.class, new Integer(id));
	session.delete(jobs);
	
	
}
public void updateJob(Jobs jobs) {
	Session session=sessionFactory.getCurrentSession();
	session.update(jobs);
	
}

public Jobs viewJob(int id) {
	Session session=sessionFactory.getCurrentSession();
	Jobs job=(Jobs) session.get(Jobs.class, new Integer(id));
	return job;
}



}
