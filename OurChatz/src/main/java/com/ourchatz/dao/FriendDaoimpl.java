package com.ourchatz.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.ourchatz.model.Friend;

@Repository
@Transactional
public class FriendDaoimpl implements FriendDao {
@Autowired
SessionFactory sessionFactory;

	public void addFriend(Friend  friend) {
		Session session=sessionFactory.getCurrentSession();
		friend.setOnline("N");
		session.save(friend);
		
	}

	public void updateFrn(Friend  friend) {
		Session session=sessionFactory.getCurrentSession();
		session.update( friend);
	}

	public void deleteFriend(int id) {
		Session session=sessionFactory.getCurrentSession();
		Friend frn=(Friend)session.get(Friend.class,new Integer(id));
		session.delete(frn);
		
		
	}
   public List<Friend> viewFriend(String username) {
		Criteria ct=sessionFactory.getCurrentSession().createCriteria(Friend.class);
		ct.add(Restrictions.eq("username",username));
		List frns=ct.list();
		return frns;
	}

public List<Friend> viewFriends(String friendName) {
	Criteria c=sessionFactory.getCurrentSession().createCriteria(Friend.class);
	c.add(Restrictions.eq("online",true));
	c.add(Restrictions.eq("username",friendName));
	List list=c.list();
	return list;
}

}
