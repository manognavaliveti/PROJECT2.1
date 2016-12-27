package com.ourchatz.dao;

import java.util.List;

import com.ourchatz.model.Forum;

public interface ForumDao {
	void addQuestion(Forum forum);
	List<Forum> viewQuestions();
	 void updateQuestion(Forum forum);
	 void deleteQuestion(int id);
	 List<Forum> viewQuestions(String givenBy);
}


