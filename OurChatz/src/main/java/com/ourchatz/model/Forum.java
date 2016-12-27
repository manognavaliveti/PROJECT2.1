package com.ourchatz.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
@Entity
public class Forum {
	@Id@GeneratedValue
	private int questionId;
	
	private String questionTitle;
	private String questionDescription;
	private String givenBy;
	
	public String getQuestionTitle() {
		return questionTitle;
	}
	public void setQuestionTitle(String questionTitle) {
		this.questionTitle = questionTitle;
	}
	public String getQuestionDescription() {
		return questionDescription;
	}
	public void setQuestionDescription(String questionDescription) {
		this.questionDescription = questionDescription;
	}
	public int getQuestionId() {
		return questionId;
	}
	public void setQuestionId(int questionId) {
		this.questionId = questionId;
	}
	public String getGivenBy() {
		return givenBy;
	}
	public void setGivenBy(String givenBy) {
		this.givenBy = givenBy;
	}

}
