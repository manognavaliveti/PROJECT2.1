package com.ourchatz.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ourchatz.model.Blog;
@Transactional
@Repository
public class BlogDaoimpl implements BlogDao {
@Autowired
SessionFactory sessionFactory;

public void createBlog(Blog blog) {
	sessionFactory.getCurrentSession().save(blog);
}

public List<Blog> viewBlogs() {
	Session session=sessionFactory.getCurrentSession();
	List<Blog> list=session.createCriteria(Blog.class).list();
	return list;
}

public void updateBlog(Blog blog) {
	sessionFactory.getCurrentSession().update(blog);
	
}

public void deleteBlog(int id) {
	Session session=sessionFactory.getCurrentSession();
	Blog blog=(Blog)session.get(Blog.class,new Integer(id));
	session.delete(blog);
	
}


public List<Blog> viewMyBlogs(String postedBy) {
	System.out.println("heyy viewing my blogs...!!!!!!!!");
	Session session =sessionFactory.getCurrentSession();
	Criteria cr=session.createCriteria(Blog.class);
	cr.add(Restrictions.eq("postedBy",postedBy));
	cr.add(Restrictions.eq("status",true));
	List list=cr.list();
	System.out.println("list:"+list);
	return list;
	
	
	
}
	
}




