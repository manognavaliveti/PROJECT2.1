var OurChatz=angular.module('OurChatz',['ngRoute','ngCookies']);
OurChatz.config(function($routeProvider){
	$routeProvider
	.when('/register',{
		templateUrl:'partials/register.html',
		controller:'registerController'
	}).when('/blog',{
				templateUrl:'partials/myBlog.html',
				controller:'myBlogController'
    }).when("/chat",
	{
		templateUrl:"partials/chat.html",
	controller:'chatController'
	})
.when("/allForums",
	{
		templateUrl:"partials/allForums.html",
	controller:'allForumsController'
	}).when('/viewBlogs',{
				templateUrl:'partials/viewBlogs.html',
				controller:'blogController'
	}).when('/viewJobs',{
			templateUrl:'partials/adminJobs.html',
				controller:'jobsController'	
    }).when('/jobs',{
    	templateUrl:'partials/viewJobs.html',
    	controller:'jobController'
    }).when('/login',{
			templateUrl:'partials/login.html',
				controller:'loginController'	
    }).when('/userHome',{
					templateUrl:'partials/userHome.html',
					controller:'userHomeController'
    }).when("/adminHome",
		      {
	         templateUrl:"partials/adminHome.html",
	        controller:'adminController'
    }).when('/logout',{
	        templateUrl:'partials/logOut.html',
	         controller:'logoutController'
	
    }).when('/forums',{
	         templateUrl:'partials/forums.html',
	          controller:'forumController'	
     }).when('/adminBlog',{
         	         templateUrl:'partials/adminBlog.html',
          	          controller:'adminBlogController'	
                        })
                        });



OurChatz.directive('fileModel', ['$parse', function ($parse) {
    return {
       restrict: 'A',
       link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;
          
          element.bind('change', function(){
             scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
             });
          });
       }
    };
 }]);




OurChatz.service('fileUpload', ['$http','$location', function ($http,$scope,$location) {
    this.uploadFileToUrl = function(file, uploadUrl,username,password,dob){
        var fd = new FormData();
        fd.append('file', file);
        fd.append('username',username);
        fd.append('password',password);
        fd.append('dob',dob);
        console.log("fd:"+fd)
        $http.post(uploadUrl, fd, {
           transformRequest: angular.identity,
           headers: {'Content-Type': undefined}
        })
         .success(function(){
     	   $scope.message="registered! you can login now!!";
     	    $scope.username="";
     	    $scope.password="";
     	   
        })
     
        .error(function(){
        });
     }
  }]);




OurChatz.controller('registerController',['$scope','fileUpload','$rootScope',function($scope,fileUpload,$rootScope){
	
	$rootScope.login=true;
	$rootScope.register=false;
	
	$scope.register = function(){
	       var file = $scope.myFile;
	       var username=$scope.username;
	       var password=$scope.password;
	       var dob=$scope.dob;
	       console.log("username"+username);
	       console.log('file is ' );
	       console.dir(file);
	       var uploadUrl = "http://localhost:8089/OurChatz/fileUpload";
	       fileUpload.uploadFileToUrl(file,uploadUrl,username,password,dob);
	    };
	}]);


OurChatz.controller('loginController',['$cookieStore','$scope','$http','$location','$rootScope',function($cookieStore,$scope,$http,$location,$rootScope){
	$rootScope.login=false;
	$rootScope.register=false;
	$rootScope.home=true;
	console.log("in login()");
	$scope.login=function(){
		
		var logData={
			username:$scope.username,
			password:$scope.password
		
		}
		
		$http.post("http://localhost:8089/OurChatz/authenticate",logData)
	     .then(function(response){
			console.log("result   data:"+response.data);
			var r=response.data.toString();
			console.log("response:"+r);
		     
			if(r==1)
				{
				$rootScope.blog=true;
				$rootScope.forums=true;
				$rootScope.jobs=true;
				$rootScope.viewJobs=false;
				$rootScope.allForums=true;
			    $rootScope.login=false;
				$rootScope.register=false;
				$rootScope.logout=true;
				$rootScope.chat=true;
				$rootScope.viewBlogs=true;
			    console.log('logout:'+$rootScope.logout);
				console.log("logout.....:"+response.data);
				console.log("uname from root scope:"+$rootScope.uname);
				$rootScope.uname=$scope.username;
				console.log("uname:"+$rootScope.uname);
				$http.defaults.headers.common['Authorization'] = 'Basic '
					+ $rootScope.uname;
			$cookieStore
					.put(
							'uname',
							$rootScope.uname)
		
				$location.path('/userHome');
				}
			if(r==0)
				{
				$scope.username="";
				$scope.password="";
				$scope.message="username/password incorrect";
				$location.path('/login');
				}
			if(r==2)
			{
				
				$rootScope.blog=true;
				$rootScope.forum=true;
				$rootScope.jobs=true;
				$rootScope.login=false;
				$rootScope.register=false;
				$rootScope.logout=true;
				$rootScope.adminBlog=true;
				$rootScope.uname=$scope.username;
				$location.path('/adminHome');
			}
			});  
				 }
			}]
			);




OurChatz.controller('logoutController',function($scope,$rootScope,$http,$cookieStore){
	
	
	
	$rootScope.login=true;
	$rootScope.register=true;
	$rootScope.blog=false;
	$rootScope.forums=false;
	$rootScope.jobs=false;
	$rootScope.allForums=false;
	$rootScope.viewJobs=false;
    $rootScope.logout=false;
	$rootScope.chat=false;
	$rootScope.viewBlogs=false;
	console.log("logged out succesfully"+$rootScope.uname);
	$http.post('http://localhost:8089/OurChatz/logout/'+$rootScope.uname);
	$rootScope.uname=null;
	$cookieStore.remove('uname');
	
});



OurChatz.controller('adminController',function($scope,$rootScope){
	console.log("in admin controller");
	$rootScope.login=false;
	$rootScope.register=false;
	$rootScope.blog=true;
	
	$rootScope.jobs=false;
	$rootScope.viewJobs=true;
	$rootScope.logout=true;
	$rootScope.adminBlog=true;

	});




OurChatz.controller("userHomeController",function($scope,$http,$rootScope)	
		{	
	$rootScope.blog=true;
	$rootScope.forums=true;
	$rootScope.jobs=true;
	$rootScope.viewJobs=false;
	$rootScope.allForums=true;
    $rootScope.login=false;
	$rootScope.register=false;
	$rootScope.logout=true;
	$rootScope.chat=true;
	$rootScope.viewBlogs=true;
	console.log("in userHome controller");
	$scope.findfriends=function()
	{
	console.log(" in findfriends function");
	console.log("name in  findfriends:"+$rootScope.uname);
			 $http.get("http://localhost:8089/OurChatz/findFriends/"+$rootScope.uname)
			    .then(function (response) {
			    	
			    	$scope.friends = response.data;
			    	
			    	console.log("data:"+response.data);
			    
			    });}
	$scope.addfriend=function(user){
		console.log("in addfriend");
		$scope.friend=user;
		
		console.log("friendName:"+$scope.friend.username);
		console.log("username:"+$rootScope.uname);
		var fr={
				username:$rootScope.uname,
				friendName:$scope.friend.username
		};
				$http.post("http://localhost:8089/OurChatz/addFriend/",fr);
		}
	$scope.friendslist=function(){
		console.log(" in friendslist function");
		console.log("name in  friendslist:"+$rootScope.uname);
				 $http.get("http://localhost:8089/OurChatz/viewFriends/"+$rootScope.uname)
				    .then(function (response){

				    	$scope.friendslist = response.data;
				    	
				    	console.log("data:"+response.data);
				    });
	}
	
		});


OurChatz.controller("blogController",function($scope,$http,$rootScope)	
		{	
	$rootScope.blog=true;
	$rootScope.forums=true;
	$rootScope.jobs=true;
	$rootScope.viewJobs=false;
    $rootScope.login=false;
	$rootScope.register=false;
	$rootScope.logout=true;
	$rootScope.chat=true;
	$rootScope.viewBlogs=true;
	$rootScope.allForums=true;
	
	console.log(" in view blogs controller");
	console.log("name in allblogs:"+$rootScope.uname)
	$http.get("http://localhost:8089/OurChatz/viewMyBlogs/"+$rootScope.uname)
			    .then(function (response) {
			    	$scope.blogs = response.data;
           console.log("data:"+response.data);
			    });
	$scope.newBlog={};
	console.log("In Controller");
	
	$scope.addBlog=function(newBlog)
	{
		var dataObj = {
    		title:$scope.title,
    			description:$scope.description,
    			postedBy:$rootScope.uname
 		};
		console.log("title:"+dataObj);
		 var res = $http.post('http://localhost:8089/OurChatz/createBlog',dataObj);
		 $http.get("http://localhost:8089/OurChatz/viewMyBlogs/"+$rootScope.uname)
	 	    .then(function (response) {$scope.blogs = response.data;});
	 		res.success(function(data, status, headers, config) {
	 			$scope.message = "blog added successfully";
	 			console.log("status:"+status);
	 		});
	 		 
	};
	
	$scope.editBlog=function(blog)
	{
		console.log("inside editblog");
		console.log("blog:"+blog);
		$scope.blogDataToEdit=blog;
	}
	$scope.saveEdit=function()
	{
		var dataObj = {
    			title:$scope.blogDataToEdit.title,
    			description:$scope.blogDataToEdit.description,
 				blogId:$scope.blogDataToEdit.blogId,
 				postedBy:$scope.blogDataToEdit.postedBy
 		};
		$http.put('http://localhost:8089/OurChatz/updateBlog', dataObj);
		$http.get("http://localhost:8089/OurChatz/viewMyBlogs/"+$rootScope.uname)
 	    .then(function (response) {$scope.blog = response.data;});
	}
	$scope.deleteBlog=function(blogDataToEdit)
	{
		console.log("delete blog called");
		blogId:$scope.blogDataToEdit.blogId;
		console.log("blog_id:"+blogDataToEdit.blogId);
		$http['delete']('http://localhost:8089/OurChatz/deleteBlog/'+blogDataToEdit.blogId);
		 $http.get("http://localhost:8089/OurChatz/viewMyBlogs/"+$rootScope.uname)
	 	    .then(function (response) {$scope.blogs = response.data;
	 	    });
	}
	});




OurChatz.controller("adminBlogController",function($scope,$http,$rootScope)	
		{	
	$rootScope.login=false;
	$rootScope.register=false;
	$rootScope.home=false;
    $rootScope.blog=true;
	$rootScope.jobs=false;
	$rootScope.viewJobs=true;
	$rootScope.logout=true;
	$rootScope.adminBlog=true;
	
	console.log(" in adminblog controller");
	
			 $http.get("http://localhost:8089/OurChatz/viewBlogs")
			    .then(function (response) {
			    	
			    	$scope.blogs = response.data;
			    	
			    	console.log("data:"+response.data);
			    });
			
$scope.appdisapp=function(adminblog)
{
	console.log("inside appdisappblog");
	console.log("adminblog:"+adminblog);
	$scope.blogstatus=adminblog;
}
$scope.approveBlog=function()
{
	console.log("in approveblog");
	var edit=
		{
			blogId:$scope.blogstatus.blogId,
	        title:$scope.blogstatus.title,
			description:$scope.blogstatus.description,
			postedBy:$scope.blogstatus.postedBy,
			status:true
		}
	$http.put("http://localhost:8089/OurChatz/updateBlog",edit);
	 $http.get("http://localhost:8089/OurChatz/viewBlogs")
	    .then(function (response) {
	    	
	    	$scope.blogs = response.data;
	    	
	    	console.log("data:"+response.data);
	    });
}
$scope.disapproveBlog=function()
{
	console.log("in disapproveblog");
	var edit=
		{
			blogId:$scope.blogstatus.blogId,
			title:$scope.blogstatus.title,
			description:$scope.blogstatus.description,
			postedby:$scope.blogstatus.postedBy,
			status:false
		}
	$http.put("http://localhost:8089/OurChatz/updateBlog",edit);
	 $http.get("http://localhost:8089/OurChatz/viewBlogs")
	    .then(function (response) {
	    	$scope.blogs = response.data;
	        console.log("data:"+response.data);
	    });
	 }
});		

OurChatz.controller("allForumsController",function($scope,$http,$rootScope){
	$rootScope.blog=true;
	$rootScope.forums=true;
	$rootScope.jobs=true;
	$rootScope.viewJobs=false;
    $rootScope.login=false;
    $rootScope.allForums=false;
	$rootScope.register=false;
	$rootScope.logout=true;
	$rootScope.chat=true;
	$rootScope.viewBlogs=true;
	console.log("in side allforums controller ");
	 $http.get('http://localhost:8089/OurChatz/viewQuestions/')
	    .then(function (response) {
	    	$scope.allForums = response.data;
	    	console.log("data:"+response.data);
	    });
	 
	
});


OurChatz.controller("myBlogController",function($scope,$http,$rootScope)	
		{	
	$rootScope.blog=true;
	$rootScope.forums=true;
	$rootScope.jobs=true;
	$rootScope.viewJobs=false;
    $rootScope.login=false;
	$rootScope.register=false;
	$rootScope.logout=true;
	$rootScope.chat=true;
	$rootScope.viewBlogs=true;
	$rootScope.allForums=true;
	console.log("username in myblog controller:"+$rootScope.uname);
	 $http.get('http://localhost:8089/OurChatz/viewBlogs/')
	    .then(function (response) {
	    	$scope.blogs = response.data;
	    	console.log("data:"+response.data);
	    });
	 $scope.commentBlog=function(myBlogs){
	    	$scope.commentblog=myBlogs;
	    }
	    $scope.newComment={};
		console.log("In Controller");
		
	    $scope.addComment=function(newComment){
	    	 var comments=
				{
			blogId:$scope.commentblog.blogId,
			username:$rootScope.uname,
			comment:$scope.comment
			};
	    	
			 $http.post('http://localhost:8089/OurChatz/addComment/',comments)
			 console.log("aaaa"+$scope.comment);
			 $http.get("http://localhost:8089/OurChatz/viewBlogs")
					    .then(function (response) {
                            $scope.myBlogs = response.data;
					    	
					    	console.log("data:"+response.data);
					    });
			 }
	   
	    $scope.viewComments=function(myBlogs){
	    	$scope.viewcomments=myBlogs
	    	console.log(" in commentlist function");
	    	console.log(" in commentlist function:"+$scope.viewcomments.blogId);
	    	 $http.get('http://localhost:8089/OurChatz/viewComments/'+$scope.viewcomments.blogId)
			    .then(function (response){
                 $scope.commentlist = response.data;
			    	console.log("data:"+response.data);
			    	
			    });
	    	 }
	    
	    $scope.likeBlog=function(myBlogs){
	    	console.log("in like function");
	    	$scope.likeblogs=myBlogs
	    	console.log("likes="+$scope.likeblogs.likes);
	    	like=$scope.likeblogs.likes;
	    	likes=like+1;
	    	console.log("likes:",likes);
		       $scope.likes=likes;
		       console.log("scope likes:"+$scope.likes);
		       var like=
				{
			blogId:$scope.likeblogs.blogId,
		    title:$scope.likeblogs.title,
			description:$scope.likeblogs.description,
			postedBy:$scope.likeblogs.postedBy,
			status:$scope.likeblogs.status,
			likes:$scope.likes
				}
			console.log("data in like:"+like);
			console.log("postedBy:"+$rootScope.uname);
			 $http.put('http://localhost:8089/OurChatz/updateBlog',like);
		

	    }
	    
	    
	    });



	


OurChatz.controller("jobsController",function($scope,$http,$rootScope)	
		{	
	$rootScope.login=false;
	$rootScope.register=false;
	$rootScope.adminblog=true;
    $rootScope.blog=true;
	$rootScope.jobs=false;
	$rootScope.viewJobs=true;
	$rootScope.logout=true;
	$rootScope.adminBlog=true;
	
	console.log(" in jobs controller");
	
			 $http.get("http://localhost:8089/OurChatz/viewJobs")
			    .then(function (response) {
			    	
			    	$scope.jobs = response.data;
			    	
			    	console.log("data:"+response.data);
			    });
			 $scope.newJob={};
				console.log("In Controller");
				$scope.addJobs =function(newJob)
				{
					var dataObj = {
							companyName:$scope.companyName,
							role:$scope.role,
							skillsRequired:$scope.skillsRequired,
							eligibility:$scope.eligibility,
							ctc:$scope.ctc,
							interviewDate:$scope.interviewDate,
							companyAddress:$scope.companyAddress,
							companyUrl:$scope.companyUrl,
							jobId:$scope.jobId
			 		};
					console.log("title:"+dataObj);
					 var res = $http.post('http://localhost:8089/OurChatz/createJobs',dataObj);
					 $http.get("http://localhost:8089/OurChatz/viewJobs")
				 	    .then(function (response) {$scope.jobs = response.data;});
				 		res.success(function(data, status, headers, config) {
				 			$scope.message = "job sucessfully added";
				 			console.log("status:"+status);
				 		});
				 		 
				};
$scope.editJob=function(job)
{
	console.log("inside editjob");
	console.log("job:"+job);
	$scope.jobedit=job;
}
$scope.saveEdit=function()
{
	console.log("in saveEdit");
	var edit=
		{
			companyName:$scope.jobedit.companyName,
			role:$scope.jobedit.role,
			skillsRequired:$scope.jobedit.skillsRequired,
			eligibility:$scope.jobedit.eligibility,
			ctc:$scope.jobedit.ctc,
			interviewDate:$scope.jobedit.interviewDate,
			companyAddress:$scope.jobedit.companyAddress,
			companyUrl:$scope.jobedit.companyUrl,
			jobId:$scope.jobedit.jobId
		}
	$http.put("http://localhost:8089/OurChatz/updateJob",edit);
	 $http.get("http://localhost:8089/OurChatz/viewJobs")
	    .then(function (response) {
	    	
	    	$scope.jobs = response.data;
	    	
	    	console.log("data:"+response.data);
	    });
}
$scope.deleteJob=function(jobedit)
{
	console.log("in deletejob");

	jobId:$scope.jobedit.jobId;
	console.log("jobId:"+jobedit.jobId);
	$http['delete']('http://localhost:8089/OurChatz/deleteJob/'+jobedit.jobId);
	$http.get("http://localhost:8089/OurChatz/viewJobs")
	    .then(function (response) {
	    	
	    	$scope.jobs = response.data;
	    	
	    	console.log("data:"+response.data);
	    });
}
		});	
		
		
		

	
		
OurChatz.controller("jobController",function($scope,$http,$rootScope)	
				{	
			$rootScope.login=false;
			$rootScope.register=false;
			$rootScope.viewBlogs=true;
			$rootScope.viewJobs=false;
			$rootScope.jobs=true;
			console.log(" in  job controller");
			$http.get("http://localhost:8089/OurChatz/viewJobs")
					    .then(function (response) {
					    	$scope.jobs = response.data;
	               console.log("data:"+response.data);
					    });
			
				});
		
	
OurChatz.controller('forumController',function($scope,$rootScope,$http){
	console.log('in forum controller');
	$rootScope.blog=true;
	$rootScope.forums=true;
	$rootScope.jobs=true;
	$rootScope.viewJobs=false;
    $rootScope.login=false;
	$rootScope.register=false;
	$rootScope.logout=true;
	$rootScope.chat=true;
	$rootScope.viewBlogs=true;
	$rootScope.allForums=true;
	$scope.newForum={};
	console.log("In new forum controller");
	$scope.addForum=function(newForum){
		var forum={
				questionTitle:$scope.questionTitle,
				questionDescription:$scope.questionDescription,
				givenBy:$rootScope.uname
		};
		var res=$http.post('http://localhost:8089/OurChatz/addQuestion',forum);
		$http.get("http://localhost:8089/OurChatz/viewMyQuestions/"+$rootScope.uname)
		.then(function (response) {$scope.forums = response.data;});
 		res.success(function(data, status, headers, config) {
 			$scope.message = "forum added";
 			console.log("status:"+status);
 		});
 		
	};
	$scope.editForum=function(forum){
		console.log("inside editforum");
		$scope.forumedit=forum;
	}
	$scope.saveEdit=function(){
		var edit={
				questionId:$scope.forumedit.questionId,
				questionDescription:$scope.forumedit.questionDescription,
 				questionTitle:$scope.forumedit.questionTitle,
 				givenBy:$scope.forumedit.givenBy
		};
		$http.put('http://localhost:8089/OurChatz/updateQuestion', edit);
		$http.get("http://localhost:8089/OurChatz/viewMyQuestions/"+$rootScope.uname)
 	    .then(function (response) {$scope.forums = response.data;});
	}
	$scope.deleteForum=function(forumedit){
		
		questionId:$scope.forumedit.questionId;
	$http['delete']('http://localhost:8089/OurChatz/deleteQuestion/'+forumedit.questionId);
	 $http.get("http://localhost:8089/OurChatz/viewMyQuestions/"+$rootScope.uname)
	    .then(function (response) {$scope.forums = response.data;
	    });
		
	}
	
	
	});




OurChatz.service("ChatService", function($q, $timeout) {
    
    var service = {}, listener = $q.defer(), socket = {
      client: null,
      stomp: null
    }, messageIds = [];
    
    service.RECONNECT_TIMEOUT = 30000;
    service.SOCKET_URL = "/OurChatz/chat";
    service.CHAT_TOPIC = "/topic/message";
    service.CHAT_BROKER = "/app/chat";
    
    service.receive = function() {
      return listener.promise;
    };
    
    service.send = function(message) {
    	console.log("in send function");
      var id = Math.floor(Math.random() * 1000000);
      socket.stomp.send(service.CHAT_BROKER, {
        priority: 9
      }, JSON.stringify({
        message: message,
        id: id
      }));
      messageIds.push(id);
    };
    
    var reconnect = function() {
      $timeout(function() {
        initialize();
      }, this.RECONNECT_TIMEOUT);
    };
    
    var getMessage = function(data) {
      var message = JSON.parse(data), out = {};
      out.message = message.message;
      out.username = message.username;
      out.time = new Date(message.time);
      if (_.contains(messageIds, message.id)) {
        out.self = true;
        messageIds = _.remove(messageIds, message.id);
      }
      return out;
    };
    
    var startListener = function() {
      socket.stomp.subscribe(service.CHAT_TOPIC, function(data) {
        listener.notify(getMessage(data.body));
      });
    };
    
    var initialize = function() {
      socket.client = new SockJS(service.SOCKET_URL);
      socket.stomp = Stomp.over(socket.client);
      socket.stomp.connect({}, startListener);
      socket.stomp.onclose = reconnect;
    };
    
    initialize();
    return service;
  });
OurChatz.controller("chatController",function($scope,$http,ChatService)
		{
	console.log("in chat  controller");
	$rootScope.blog=true;
	$rootScope.forums=true;
	$rootScope.jobs=true;
	$rootScope.viewJobs=false;
    $rootScope.login=false;
	$rootScope.register=false;
	$rootScope.logout=true;
	$rootScope.chat=true;
	$rootScope.viewBlogs=true;
	$rootScope.allForums=true;
	
	$scope.messages = [];
	  $scope.message = "";
	  $scope.max = 140;
	  
	  $scope.addMessage = function() {
		  console.log("in addmessage fn");
	    ChatService.send($scope.message);
	    $scope.message = "";
	  };

	  ChatService.receive().then(null, null, function(message) {
		  console.log("inside recieeve:"+message);
		  console.log("inside recieeve:"+$scope.message);
	    $scope.messages.push(message);
	  });
	}
		);



OurChatz.run( function ($rootScope, $location,$cookieStore, $http) {

	 $rootScope.$on('$locationChangeStart', function (event, next, current) {
		 console.log("$locationChangeStart")
		 //http://localhost:8080/Collaboration/addjob
	        // redirect to login page if not logged in and trying to access a restricted page
	        var restrictedPage = $.inArray($location.path(), ['/','/search_job','/view_blog','/login', '/register','/list_blog']) === -1;
	        
	        console.log("restrictedPage:" +restrictedPage)
	        var loggedIn = $rootScope.uname;
	        
	        console.log("loggedIn:" +loggedIn)
	        
	        if(!loggedIn)
	        	{
	        	
	        	 if (restrictedPage) {
		        	  console.log("Navigating to login page:")
		        	

						            $location.path('/login');
		                }
	        	}
	        
			 
	        
	 }
	       );
	 // keep user logged in after page refresh
	   $rootScope.uname = $cookieStore.get('uname') || {};
	    if ($rootScope.uname) {
	        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.uname; 
	    }
});
