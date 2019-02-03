var mysql=require('mysql');
var path=require('path');
var express = require('express'); 
var app = express(); 

//var popup = require('popups');


var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

app.set("view engine","ejs");

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}))

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Kush007_tej',
    database: 'test1',
    multipleStatements: true
});

var usename;let aacc_id=[];let follow_tweet_history=[];let j;


app.get("/",function(req,res)
{
	res.sendFile(path.join(__dirname, 'index.htm'));
});

//////////////////////////////////////////////////////////

app.post('/login',(req, res)=>{ 
    var username = req.body.username; 
    var password = req.body.password;
       usename=username;
      
     validate(username,password,res)

}); 

function validate(username,password,res)
{
    var re=mysqlConnection.query('select * from users where username = ?',username, function(error,results,fields){
    //console.log(re);
    if(error) throw error;
    
    
    if(results[0]==null) 
    {
    	console.log("Any of the field cannot be empty");
    	res.sendFile( __dirname + "/public/error/" + "user-not-found.html" );
        //res.alert("no");
        /*res.popup.alert({
    content: 'Hello!'
    });*/
    	return false;
    }
    if(results[0].password==password){ console.log("This User exits in database");res.sendFile(path.join(__dirname, 'mainpage1.htm'));}
    else{ console.log("dddfffdd");res.send("wrong password or user does not exits");return false}

    
    });
}
//////////////////////////////////////////////////////////
//follow code
/*let j=0;let x=0;j=x;
let follow_tweet_history =[]; let aacc_id =[];

app.get('/login/see-following-tweet',function(req, res){ 
    
    var ffollow_query ="SELECT users.acc_id FROM follows AS he INNER JOIN users ON users.acc_id = he.follower_id LEFT JOIN follows AS me ON me.followee_id = 1 AND me.follower_id = he.follower_id WHERE he.followee_id = (select acc_id from users where username = ?);"
    mysqlConnection.query(ffollow_query,usename, function(error,results,fields){
       
         for(let i=0;i<results.length;i++)
         {
             aacc_id[i]=results[i].acc_id;
         }
     
         for(var i=0;i<aacc_id.length;i++)
         {
            var fffollow_it_query='select tweet_id,tweet_text from tweets where user_id = ?;'
            var acc_cont=aacc_id[i];
            //console.log(acc_cont);
            
            mysqlConnection.query(fffollow_it_query,acc_cont, function(error,results,fields){    
            if(error) throw error;
    		
    		console.log("i must look into code here-----------------");
    		
            for(let j=x;j<results.length;j++)
            {	
                follow_tweet_history[j+x]=results[j].tweet_text;

                console.log(follow_tweet_history[j]);
            }x=j;
             });

         }
    res.render("see-following-tweet",{follow:follow_tweet_history,name:usename});
    });
});*/

//another code........




//My another code is written here!!!


//let aacc_id=[];let follow_tweet_history=[];let j;

app.get('/login/see-following-tweet',function(req, res){ 
    //let aacc_id=[];let follow_tweet_history=[];let j;
    var que1="SELECT users.acc_id FROM follows AS he INNER JOIN users ON users.acc_id = he.follower_id LEFT JOIN follows AS me ON me.followee_id = 1 AND me.follower_id = he.follower_id WHERE he.followee_id = (select acc_id from users where username = ?);"   
    var que2="select tweet_id,tweet_text from tweets where user_id = ?";
    
    mysqlConnection.query(que1,usename, function(error,results,fields){
    for(let i=0;i<results.length;i++)
         {  aacc_id[i]=results[i].acc_id;  }
    for(i=0;i<aacc_id.length;i++)
    {
        mysqlConnection.query(que2,aacc_id[i],function(error,results,fields){ for(j=0;j<results.length;j++){follow_tweet_history[follow_tweet_history.length+(j+1)]=results[j].tweet_text;}});
        if(error) throw error;
    }
    });
    res.render("see-following-tweet",{follow:follow_tweet_history,name:usename});
     removed = follow_tweet_history.splice(0,follow_tweet_history.length);
});

 var removed = follow_tweet_history.splice(0,follow_tweet_history.length);


//////////////////////////////////////////////////////////
//tweet 
app.post('/login/post',(req,res)=>{
	var tweet_data = req.body.usertweet;
	console.log(tweet_data);
	put_into_database(tweet_data,res);
});

function put_into_database(tweet_data,res)
{
	    /*var count_tweet=connection.query("select count(*) as counter from tweets,users where username= '" + usename +"';"); */    

	var put_query="insert into tweets(tweet_text,user_id) values(?,(select acc_id from users where username = ? ))";
	mysqlConnection.query(put_query,[tweet_data,usename], function(error,results,fields){
    if(error) throw error;
    
    //res.send("Tweet Successfully Tweeted");
    res.redirect('/login/my-moments');

    
    });
}
//////////////////////////////////////////////////////////
///search
var another_user1;
app.post('/login/search',(req,res)=>{
	var another_user = req.body.searchuser;
	another_user1=another_user;

	
	//res.sendFile(path.join(__dirname, 'other-check-profile.ejs'));
	another_profile(another_user,res);
});

  //to check if user is in database and if exits go to his page 
  function another_profile(another_user,res)
  {

  	var search_query="SELECT EXISTS(SELECT 1 FROM users WHERE username = ?)as cond";
	mysqlConnection.query(search_query,another_user, function(error,results,fields){
    	console.log(results[0].cond);
    	if((results[0].cond) == 1)
    			{
    				console.log("user exists in database");
    				if(error) throw error;
    				//res.send("YOU are now going to his/her profile");
     				go_to_user(res);
    	
    			}
    			else{//res.send("this user does not exists in database");
                res.sendFile( __dirname + "/public/error/" + "search-user-not-found.html" );}
    		});
 } 


//app.get('/login/search',function(req, res){ 
    function go_to_user(res)
    {
	var qqq1="select tweet_text from tweets where user_id=(select acc_id from users where username = ?);"
	/*var count_tweet=connection.query("select count(*) as counter from tweets,users where username= '" + usename +"';"); */    
    mysqlConnection.query(qqq1,another_user1, function(error,results,fields){
    if(error) throw error;
    
   		let othertweet_history =[];
    	 for(let i=0;i<results.length;i++)
    	 {
    	 	othertweet_history[i]=results[i].tweet_text;
    	 	
    	 }

    res.render("other-check-profile",{otherdata:othertweet_history,othername:another_user1});
     });
}
//});

app.post("/login/search/follow",function(req,res)
{
 	var follow_query='insert into follows(follower_id,followee_id) values((select acc_id from users where username = ?),(select acc_id from users where username = ?))';
    mysqlConnection.query(follow_query,[another_user1,usename], function(error,results,fields){
    if(error) throw error;  
    res.send("You Followed This person"); 
    console.log('Now entering');
   // after_follow(usename,another_user1,res);
    });
});


	/*function after_follow(usename,another_user1,res)
	{
		//to display tweets from followed users must come i dont know how
		var after_follow_query="";
    	mysqlConnection.query(after_follow_query,usename, function(error,results,fields){
    	if(error) throw error;
    	//let =results.username;
   		let followerprint =[];
    	 for(let i=0;i<results.length;i++)
    	 {
    	 	followerprint[i]=results[i].tweet_text;
    	 	
    	 }

    res.render("follow",{followuserdata:followerprint,ffname:another_user1});
     });
	}*/

//like this user 


/*app.post("/login/search/likehim",function(req,res)
{
 	console.log("is it coming here");
 	var like_query="insert into like1(user_id) values ((select acc_id from users where username = ?))";
 	mysqlConnection.query(like_query,usename, function(error,results,fields){
    if(error) throw error;  
    console.log('now liking');
    res.send("liked");
     });
});
*/

app.post("/login/search/likehim",function(req,res)
{
 	var follow_query='insert into like2(liked_id,likee_id) values((select acc_id from users where username = ?),(select acc_id from users where username = ?))';
    mysqlConnection.query(follow_query,[another_user1,usename], function(error,results,fields){
    if(error) throw error;  
    res.send("You Liked This person"); 
    });
});












//////////////////////////////////////////////////////////
//to go to my-mymoments
let b; var count_no_follow=0;

app.get('/login/my-moments',function(req, res){ 
    
    var qqq="select tweet_id,tweet_text from tweets where user_id=(select acc_id from users where username = ?) order by created_at desc;"
	var qqqq="select count(*) as num from like2 where liked_id=(select acc_id from users where username = ?);"
	/*var count_tweet=connection.query("select count(*) as counter from tweets,users where username= '" + usename +"';"); */    
    mysqlConnection.query(qqq,usename, function(error,results,fields){
    	mysqlConnection.query(qqqq,usename,function(error,results,fields){count_no_follow = results[0].num});
    if(error) throw error;
    
    /*for(var i=0;i<results.length;i++)
    	{ console.log(results[i]);}
    	  console.log(results.length);*/
    
   		let tweet_history =[];//tweet_id_history=[];
    	 for(let i=0;i<results.length;i++)
    	 {
             tweet_history[i]=results[i].tweet_text;
                //a=tweet_history[i];
            //tweet_id_history[i]=results[i].tweet_id;
               // b=tweet_id_history[i];
                //console.log("illi thanka channagi ede");

          /*  app.post("/login/my-moments/like",(req,res)=>
        	{
 				
        		llike(a,b,res);
        	}); 
            	function llike(a,b,res)
            	{
            		var like_query="insert into likes(user_id,tweet_id) values ((select user_id from tweets where tweet_text = ?),?)";
    				mysqlConnection.query(like_query,[a,b], function(error,results,fields){
    				if(error) throw error;  
    				console.log('now liking');
    				res.send("liked");
    				});
            	}
 			
 			app.post('/login/my-moments/comment',(req, res)=>{ 
    		var ucomment = req.body.comment; 
    		ccomment(ucomment,res)
			}); 

			function ccomment(ucomment,res)
			{
				var comment_query="insert into user(user_id,tweet_id,comment_text) values ((select user_id from tweets where tweet_text = ?),?,?)";
				mysqlConnection.query(comment_query,[a,b,ucomment], function(error,results,fields){
    			if(error) throw error;  
    			res.send("You commented Successfully");
    			});
			}*/		 	   
		 



		 }//end for
			res.render("my-moments",{data:tweet_history,name:usename,count:count_no_follow});count_no_follow=0;
    });

});


//view tweet code

/*app.get('/login/my-moments/view',function(req, res){ 
    var view_query ="select tweet_id,tweet_text from tweets where user_id=(select acc_id from users where username = ?);"
   	    
   	    mysqlConnection.query(view_query,usename, function(error,results,fields){
    	if(error) throw error;
		
		var i=0;
		while(i<results.length)
    	 {
             tweet_history[i]=results[i].tweet_text; 
             res.render("view-tweet",{data:tweet_history[i],name:usename});i++;next_tweet(tweet_history[i],usename)
    	 }

    	 function next_tweet(xxx,usename)
    	 {
    	 	app.get('/login/my-moments/view/next',function(req, res){ 
    	 	res.render("view-tweet",{data:xxx,name:usename});
    	 });
    	 }
    	 
     });

});
*/

//////////////////////////////////////////////////////////
//t go to my profile from maimpage
/*SELECT DATE_FORMAT(NOW(), '%Y') - DATE_FORMAT(bdate, '%Y') - (DATE_FORMAT(NOW(), '00-%m-%d') < DATE_FORMAT(bdate, '00-%m-%d')) AS age from users;*/
app.get('/login/my-profile',function(req, res){ 
    var updated_query ="SELECT firstname,lastname,sex,email,phno,DATE_FORMAT(NOW(), '%Y') - DATE_FORMAT(bdate, '%Y') - (DATE_FORMAT(NOW(), '00-%m-%d') < DATE_FORMAT(bdate, '00-%m-%d')) AS bdate,status FROM users WHERE username = ?";
   
    mysqlConnection.query(updated_query,usename, function(error,results,fields){
    if(error) throw error;
    var user_firstname=results[0].firstname;
    var user_lastname=results[0].lastname;
    var user_sex=results[0].sex;
    var user_email=results[0].email;
    var user_phno=results[0].phno;
    var user_bdate=results[0].bdate;
    var user_status=results[0].status;
    res.render("my-profile",{a:user_firstname,b:user_lastname,c:user_sex,d:user_email,e:user_phno,f:user_bdate,g:user_status,});
     });

});

//edit profile code
app.get("/login/my-profile/edit",function(req,res)
{
    res.sendFile(path.join(__dirname, 'edit-profile.htm'));
});


app.post('/login/my-profile/edit/editted',(req, res)=>{ 
    var ufirstname = req.body.firstname; 
   var ulastname = req.body.lastname;
     var usex = req.body.sex;
    var uemail = req.body.email;
    var uphoneno = req.body.number;
    var udob = req.body.dob;
    var ustatus = req.body.status;  
   
    edit_acc(ufirstname,ulastname,usex,uemail,uphoneno,udob,ustatus,res);

}); 
//-----------------------The problem is partial updation not possible-------------------------------
function edit_acc(ufirstname,ulastname,usex,uemail,uphoneno,udob,ustatus,res)
{
    var pu_query='UPDATE users SET firstname = ?,lastname = ?,sex = ?,email = ?,phno = ?,bdate = ?,status = ? WHERE username = ?';
    mysqlConnection.query(pu_query,[ufirstname,ulastname,usex,uemail,uphoneno,udob,ustatus,usename], function(error,results,fields){
    if(error) throw error;  
   // res.send("Updation Successful");
      res.redirect('/login/my-profile');
   // res.render("my-profile");
	//res.render("my-profile",{a:ufirstname,b:ulastname,c:usex,d:uemail,e:uphoneno,f:udob,g:ustatus,});
    });
}  




//////////////////////////////////////////////////////////

//to go to settings page
app.get("/login/settings",function(req,res)
{
    res.sendFile(path.join(__dirname, 'settings.htm'));
});

//logout code 
app.get("/login/settings/logout",function(req,res)
{
     //res.send("Logout Successful");
     res.redirect('/');
     usename=0;
});
//delete Account code
app.get("/login/settings/deleteacc",function(req,res)
{
    mysqlConnection.query('DELETE FROM users WHERE username= ?',usename, function(error,results,fields){
    if(error) throw error;  
    res.send("Account Deletion Successful");
    usename=0;
    });
});


//////////////////////////////////////////////////////////
//signup page

app.get("/signup",function(req,res)
{
    res.sendFile(path.join(__dirname, 'Signup.html'));
});

app.post('/signup/create',(req, res)=>{ 
    var pusername = req.body.username; 
    var ppassword = req.body.password;
    var repassword = req.body.repassword;
    var pfirstname = req.body.firstname; 
   var plastname = req.body.lastname;
    var pemail = req.body.email;  
    
     if(ppassword == repassword){createacc(pusername,ppassword,pfirstname,plastname,pemail,res);}

}); 

function createacc(pusername,ppassword,pfirstname,plastname,pemail,res)
{
    var person = {
                    username:pusername,
                    password:ppassword,
                    firstname:pfirstname,
                    lastname:plastname,
                    email:pemail

                 }
    mysqlConnection.query('INSERT INTO users SET ?',person, function(error,results,fields){
    if(error) throw error;  
    res.redirect("/");
    });
}   

/////////////////////////////////////////////////////////

app.get("/signup/know",function(req,res)
{
    res.sendFile( __dirname + "/public/error/" + "site-construction.htm" );
});

/////////////////////////////////////////////////////////
//from here starts admin module

let a;
app.get("/admin",function(req,res)
{
	res.sendFile(path.join(__dirname, 'admin_profile.htm'));
});


app.post('/admin',(req, res)=>{ 
    var ad_username = req.body.adname; 
    var ad_password = req.body.adpassword;

    let mostliked="CALL No_like();";
     mysqlConnection.query(mostliked, function(error,results,fields){a=results[0].likecount;console.log(results[0]);});
   
     admin_validate(ad_username,ad_password,res)

}); 

function admin_validate(ad_username,ad_password,res)
{
    mysqlConnection.query('select * from admin where admin_name = ?',ad_username, function(error,results,fields){
    //console.log(re);
    if(error) throw error;
    
    if(results[0]==null) 
    {
    	console.log("Any of the field cannot be empty");
    	res.sendFile( __dirname + "/error/" + "password-empty.htm" );
    	return false;
    }
    if(results[0].admin_password==ad_password){res.sendFile(path.join(__dirname, 'admin_homepage.htm'));}
    else{ console.log("Admin Account Validated");res.send("wrong password for admin");return false}

    
    });
}

//admin search
var admin_search;//global declaration
app.post('/admin/search',(req,res)=>{
	var another_user = req.body.searchuser;
	 admin_search=another_user;
	admin_another_profile(another_user,res);
});

  //to check if user is in database and if exits go to his page 
  function admin_another_profile(another_user,res)
  {

  	var search_query="SELECT EXISTS(SELECT 1 FROM users WHERE username = ?)as cond";
	mysqlConnection.query(search_query,another_user, function(error,results,fields){
    	console.log(results[0].cond);
    	if((results[0].cond) == 1)
    			{
    				console.log("user exists in database");
    				if(error) throw error;
    				//res.send("YOU are now going to his/her profile");
     				admin_go_to_user(another_user,res);
    	
    			}
    			else{res.send("this user does not exists in database");}
    		});
 } 


    function admin_go_to_user(another_user,res)
    {
	var admin_view="select tweet_text from tweets where user_id=(select acc_id from users where username = ?);"
	/*var count_tweet=connection.query("select count(*) as counter from tweets,users where username= '" + usename +"';"); */    
    mysqlConnection.query(admin_view,another_user, function(error,results,fields){
    if(error) throw error;
    
   		let othertweet_history =[];
    	 for(let i=0;i<results.length;i++)
    	 {
    	 	othertweet_history[i]=results[i].tweet_text;
    	 	
    	 }

    res.render("admin-other-check-profile",{otherdata:othertweet_history,othername:another_user});
     });
}
//});

//admin delete an account

app.get("/admin/search/remove",function(req,res)
{
    mysqlConnection.query('DELETE FROM users WHERE username= ?',admin_search, function(error,results,fields){
    if(error) throw error;  
    res.send("Account Deletion Successful");
    });
});

//admin see his profile

app.get('/admin/search/see',function(req, res){ 
    var updated_query ='SELECT firstname,lastname,sex,email,phno,bdate,status FROM users WHERE username = ?';
   
    mysqlConnection.query(updated_query,admin_search, function(error,results,fields){
    if(error) throw error;
    var user_firstname=results[0].firstname;
    var user_lastname=results[0].lastname;
    var user_sex=results[0].sex;
    var user_email=results[0].email;
    var user_phno=results[0].phno;
    var user_bdate=results[0].bdate;
    var user_status=results[0].status;
    res.render("admin-see-profile",{z:admin_search,a:user_firstname,b:user_lastname,c:user_sex,d:user_email,e:user_phno,f:user_bdate,g:user_status,});
     });

});
//admin who left us

let c;
app.get('/admin/leave',function(req, res){ 
    let b;
    let leaveq="select * from trigger_users order by changedat desc;";
    /*let mostliked="CALL No_like();";*/
       
       /* mysqlConnection.query(mostliked, function(error,results,fields){a=results[0].likecount;console.log(results[0]);});*/
        mysqlConnection.query(leaveq, function(error,results,fields){
		

        if(error) throw error;

        let leave_acc_id =[];let leave_usern =[];let leave_fname =[];let leave_lname=[]; let leave_time=[];
         for(let i=0;i<results.length;i++)
         {
             leave_acc_id[i]=results[i].acc_id;
             leave_usern[i]=results[i].username;
             leave_fname[i]=results[i].firstname;
             leave_lname[i]=results[i].lastname;
             leave_time[i]=results[i].changedat;
         }
           	console.log(b);console.log(c);
           	 res.render("admin-who-left-us",{id:leave_acc_id,name:leave_usern,fname:leave_fname,lname:leave_lname,time:leave_time,m:a,n:b});
    });

});










//admin settings
app.get("/admin/adsettings",function(req,res)
{
    res.sendFile(path.join(__dirname, 'adsettings.htm'));
});

//admin logout code 
app.get("/admin/adsettings/logout",function(req,res)
{
     res.send("Logout Successful");
     //res.redirect('/');
});



























////////////////////////////////////////////////////////





app.listen(8080,function()
{
	console.log("app listening in port 8080");
});



	
