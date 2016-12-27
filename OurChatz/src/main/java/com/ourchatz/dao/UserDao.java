package com.ourchatz.dao;

import java.util.List;

import com.ourchatz.model.User;

public interface UserDao {
void registerUser(User user);
List<User> listUsers();
void updateUser(User user);
User getUserById( int id);
int validateUser(String username,String password);
List<User> findFriends(String username);
void logout(String username);
}
