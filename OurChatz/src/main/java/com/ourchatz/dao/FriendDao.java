package com.ourchatz.dao;

import java.util.List;

import com.ourchatz.model.Friend;

public interface FriendDao {
	void addFriend(Friend friend);
	void updateFrn(Friend  friend);
	void deleteFriend(int id);
	List<Friend> viewFriend(String username);
	List<Friend> viewFriends(String friendName);

}
