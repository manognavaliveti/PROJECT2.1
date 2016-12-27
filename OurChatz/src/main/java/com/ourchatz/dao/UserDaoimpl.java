package com.ourchatz.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ourchatz.model.User;
@Transactional
@Repository
public class UserDaoimpl implements UserDao {
@Autowired
SessionFactory sessionFactory;

	public void registerUser(User user) {
		Session session=sessionFactory.getCurrentSession();
		user.setRole("ROLE_USER");
		user.setOnline("N");
		session.save(user);
		}
	public List<User> listUsers() {
		Session session=sessionFactory.getCurrentSession();
		
		  List<User> list=session.createCriteria(User.class).list();
		
		return list;
	}
	public void updateUser(User user) {
		sessionFactory.getCurrentSession().update(user);
		
	}
	public User getUserById(int id) {
		Session session=sessionFactory.getCurrentSession();
		User user=(User)session.get(User.class, id);
		return user;
	}
	public int validateUser(String username, String password) {
		
		int res=0;
		Session session=sessionFactory.getCurrentSession();
		Query result=session.createQuery("from User u where u.username='"+username+"'");
		  
		List<User> user=result.list();
		System.out.println("user:"+user);
	if(user.size()==0)
	{
		res=0;
	}
	else
	{
		for(int i=0;i<user.size();i++)
		{
			System.out.println("inside for loop");
			String datauserName=user.get(i).getUsername();
			String datapassword=user.get(i).getPassword();
			String datarole=user.get(i).getRole();
			if(datauserName.equals(username)&&datapassword.equals(password)&&datarole.equals("ROLE_USER"))
			{
				String query="UPDATE user SET online='"+ "Y" +"' WHERE 	username = '"+ username +"'";
				SQLQuery sqlQuery=session.createSQLQuery(query);
				sqlQuery.executeUpdate();
				String query1 = "UPDATE friend SET online = '"+ "Y" +"' WHERE friendName = '"+ username + "'";

				SQLQuery sqlquery= 	 session.createSQLQuery(query1);
				sqlquery.executeUpdate();
				res=1;
				System.out.println("the result is:"+res);
				
			}
			else
				if(datauserName.equals(username)&&datapassword.equals(password)&&datarole.equals("ROLE_ADMIN"))
			{
				res=2;
				System.out.println("the result  is:"+res);
			}
			}
	}	
	return res;
	}
	public List<User> findFriends(String username){
		
		Session session=sessionFactory.getCurrentSession();
		Criteria cri=session.createCriteria(User.class);
		cri.add(Restrictions.ne("username",username));
		cri.add(Restrictions.eq("role","ROLE_USER"));
		List list=cri.list();
		return list;
		
		
		
	}
	public void logout(String username) {
		Session session=sessionFactory.getCurrentSession();
		String query = "UPDATE user SET online = '"+ "N" +"' WHERE username = '"+ username + "'";

		SQLQuery sqlQuery= 	 session.createSQLQuery(query);
		sqlQuery.executeUpdate();
		String query1 = "UPDATE friend SET online = '"+ "N" +"' WHERE friendName = '"+ username + "'";

		SQLQuery sqlquery= 	 session.createSQLQuery(query1);
		sqlquery.executeUpdate();
	}

}
