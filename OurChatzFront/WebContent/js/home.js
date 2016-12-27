var OurChatz=angular.module('OurChatz',['ngRoute']);
OurChatz.config(function($routeProvider){
	$routeProvider
	.when('/register',{
		templateUrl:'partials/register.html',
		controller:'registerController'
	}).when('/blog',{
				templateUrl:'partials/myBlog.html',
				controller:'myBlogController'
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




OurChatz.controller('registerController',['$scope','fileUpload',function($scope,fileUpload){
	
	
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


OurChatz.controller('loginController',['$scope','$http','$location','$rootScope',function($scope,$http,$location,$rootScope){
	$rootScope.login=false;
	$rootScope.register=false;
	$rootScope.home=true;
	console.log("in login()");
	$scope.login=function(){
		var logData={
			username:$scope.username,
			password:$scope.password
	}
		$http.post("http://localhost:8089/OurChatz/authenticate",logData).then(function(response){
			console.log("result   data:"+response.data);
			var r=response.data.toString();
			console.log("response:"+r);
		     
			if(r==1)
				{
				$rootScope.blog=true;
				$rootScope.forum=true;
				$rootScope.jobs=true;
				$rootScope.viewJobs=false;
			    $rootScope.login=false;
				$rootScope.register=false;
				$rootScope.logout=true;
				$rootScope.viewBlogs=true;
			    console.log('logout:'+$rootScope.logout);
				console.log("logout.....:"+response.data);
				console.log("uname from root scope:"+$rootScope.uname);
				$rootScope.uname=$scope.username;
				console.log("uname:"+$rootScope.uname);
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
				$rootScope.jobs=false;
				$rootScope.login=false;
				$rootScope.register=false;
				$rootScope.logout=true;
				$rootScope.adminBlog=true;
				$rootScope.viewJobs=true;
				$location.path('/adminHome');
			}
			});  
				 }
			}]
	);




OurChatz.controller('logoutController',function($scope,$rootScope){
	console.log("logged out succesfully");
	$rootScope.register=true;
	$rootScope.login=true;
});



OurChatz.controller('adminController',function($scope,$rootScope){
	console.log("in admin controller");
	$rootScope.viewBlogs=false;
	$rootScope.logout=true;
	$rootScope.viewJobs=true;
	});







OurChatz.controller("userHomeController",function($scope,$http,$rootScope)	
		{	
	     $rootScope.jobs=true;
	console.log("in userHome controller");
	$scope.findfriends=function()
	{
	console.log(" in findfriends function");
	console.log("name in  findfriends:"+$rootScope.uname);
			 $http.get("http://localhost:8089/OurChatz/findFriends/"+$rootScope.uname)
			    .then(function (response) {
			    	
			    	$scope.friends = response.data;
			    	
			    	console.log("data:"+response.data);
			    	$scope.addfriend=function(user)
					{
						console.log("in addfriend");
						$scope.friend=user;
						
						console.log("friendname:"+$scope.friend.username);
						console.log("username:"+$rootScope.uname);
						var fr=
							{
								username:$rootScope.uname,
								friendName:$scope.friend.username
							}
						$http.post("http://localhost:8089/OurChatz/addFriend/",fr);
					}
					$scope.friendslist=function()
					{
					console.log(" in friendslist function");
					console.log("name in  friendslist:"+$rootScope.uname);
							 $http.get("http://localhost:8089/OurChatz/viewFriends/"+$rootScope.uname)
							    .then(function (response) {
							    	
							    	$scope.friendslist = response.data;
							    	
							    	console.log("data:"+response.data);
							    
							   
			    
			    });
							 }
		});


OurChatz.controller("blogController",function($scope,$http,$rootScope)	
		{	
	$rootScope.login=false;
	$rootScope.register=false;
	$rootScope.viewBlogs=false;
	$rootScope.jobs=true;
	$rootScope.forums=true;
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
    			postedBy:$rootScope.uname,
    			
 		};
		console.log("title:"+dataObj);
		 var res = $http.post('http://localhost:8089/OurChatz/createBlog',dataObj);
		 $http.get("http://localhost:8089/OurChatz/viewMyBlogs/"+$rootScope.uname)
	 	    .then(function (response) {$scope.blogs = response.data;});
	 		res.success(function(data, status, headers, config) {
	 			$scope.message = data;
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
 				blogId:$scope.blogDataToEdit.blogId
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
	 	    .then(function (response) {
	 	    	$scope.blogs = response.data;
	 	    	
	 	    	});
	}
});



OurChatz.controller("adminBlogController",function($scope,$http,$rootScope)	
		{	
	$rootScope.login=false;
	$rootScope.register=false;
	$rootScope.home=false;
	
	
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







OurChatz.controller("jobController",function($scope,$http,$rootScope){
	$rootScope.login=false;
	$rootScope.register=false;
	$rootScope.viewBlogs=true;
	$rootScope.viewJobs=false;
	$rootScope.jobs=true;
	console.log(" in  job controller");
	$http.get("http://localhost:8089/OurChatz/viewJobs")
    .then(function (response){
    	$scope.jobs = response.data;
        console.log("data:"+response.data);
    });
});
	




	
OurChatz.controller("myBlogController",function($scope,$http,$rootScope){
	console.log("username in myblog controller:"+$rootScope.uname);
	 $http.get('http://localhost:8089/OurChatz/viewBlogs')
	    .then(function (response){
	    	$scope.blogs = response.data;
	    	console.log("data:"+response.data);
	    	$http.get("http://localhost:8089/OurChatz/viewBlogs")
	.then(function (response){$scope.blogs = response.data;});
	    	
	    });
	
});
		




OurChatz.controller("jobsController",function($scope,$http,$rootScope)	
		{	
	$rootScope.login=false;
	$rootScope.register=false;

	$rootScope.adminblog=true;
	$rootScope.blogs=false;
	$rootScope.userforum=false;
	$rootScope.logout=true;
	$rootScope.jobs=true;
	
	console.log(" in jobs controller");
	
			 $http.get("http://localhost:8089/OurChatz/viewJobs")
			    .then(function (response) {
			    	
			    	$scope.jobs = response.data;
			    	
			    	console.log("data:"+response.data);
			    });
			 $scope.newJob={};
				console.log("In Controller");
				$scope.addJobs=function(newJob)
				{
					var dataObj = {
							companyName:$scope.companyName,
							role:$scope.role,
							skillsRequired:$scope.skillsRequired,
							eligibilityCriteria:$scope.eligibilityCriteria,
							ctc:$scope.ctc,
							dateOfInterview:$scope.dateOfInterview,
							addressOfTheCompany:$scope.addressOfTheCompany,
							urlOfTheCompany:$scope.urlOfTheCompany,
							jobId:$scope.jobId
			 		};
					console.log("title:"+dataObj);
					 var res = $http.post('http://localhost:8089/OurChatz/createJobs',dataObj);
					 $http.get("http://localhost:8089/OurChatz/viewJobs")
				 	    .then(function (response){$scope.jobs = response.data;
				 	    });
				 	    }
				 		res.success(function(data, status, headers, config){
				 			$scope.message = data;
				 			console.log("status:"+status);
				 		});
				 		 
				
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
			eligibilityCriteria:$scope.jobedit.eligibilityCriteria,
			ctc:$scope.jobedit.ctc,
			dateOfInterview:$scope.jobedit.dateOfInterview,
			addressOfTheCompany:$scope.jobedit.addressOfTheCompany,
			urlOfTheCompany:$scope.jobedit.urlOfTheCompany,
			
			jobId:$scope.jobedit.jobId
			};
	$http.put("http://localhost:8089/OurChatz/updateJob",edit);
	 $http.get("http://localhost:8089/OurChatz/viewJobs")
	    .then(function (response) {
	    	
	    	$scope.jobs = response.data;
	    	
	    	console.log("data:"+response.data);
	    });
};
$scope.deleteJob=function(jobedit)
{
	console.log("in deletejob");
	jobId:$scope.jobedit.jobId;
	
$http.post("http://localhost:8089/Chatworld/deleteJob/"+jobedit.jobId);
	 $http.get("http://localhost:8089/OurChatz/viewJobs")
	    .then(function (response){
	    	$scope.jobs = response.data;
	    	console.log("data:"+response.data);
	    	 });  
}	    	 
});
}
});
