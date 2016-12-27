package com.ourchatz.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ourchatz.dao.FriendDao;
import com.ourchatz.model.Friend;

@RestController
public class FriendController {
	@Autowired
	FriendDao friendDao;
	@RequestMapping(value="/addFriend",headers="accept=Application/json",method=RequestMethod.POST)
	public void addFriend(@RequestBody Friend  friend)
	{
		friendDao.addFriend(friend);
	}
	@RequestMapping(value="/viewFriends/{username}",headers="accept=Application/json",method=RequestMethod.GET)
	public List<Friend> viewFrns(@PathVariable("username") String username)
	{
		return friendDao.viewFriend(username);
	}

	@RequestMapping(value="/deleteFriend/{id}",headers="accept=Application/json",method=RequestMethod.DELETE)
	public void deleteFriend(@RequestBody int id)
	{
		friendDao.deleteFriend(id);
	}
	@RequestMapping(value="/updateFriend",headers="accept=Application/json",method=RequestMethod.PUT)
	public void updateFriend(@RequestBody Friend  friend)
	{
		friendDao.updateFrn(friend);
	}

}
