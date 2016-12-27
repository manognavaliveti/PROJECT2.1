package com.ourchatz.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ourchatz.model.Comment;
import com.ourchatz.model.Friend;
import com.ourchatz.model.User;
@Repository
@Transactional
public class CommentDaoimpl implements CommentDao {
@Autowired
SessionFactory sessionFactory;

	public void addComment(Comment comment) {
		
		Session session=sessionFactory.getCurrentSession();
		session.save(comment);
		
	}

	public List<Comment> viewComment(int blogId) {
		
		Criteria ct=sessionFactory.getCurrentSession().createCriteria(Comment.class);
		ct.add(Restrictions.eq("blogId", blogId));
		List comments=ct.list();
		return comments;
	}

	public void updateComment(Comment comment) {
		// TODO Auto-generated method stub
		
	}

	public void deleteComment(int id) {
		// TODO Auto-generated method stub
		
	}

}
