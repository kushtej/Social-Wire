drop database if exists twitter;
create database twitter;
use twitter;

create table users
	(
		acc_id int auto_increment primary key,
		username varchar(255) unique not null,
		password varchar(255) not null,

		firstname varchar(255) default "I'd Rather Not Say",
		lastname varchar(255) default "I'd Rather Not Say",
		sex varchar(20) default "I'd Rather Not Say",
		email varchar(30) default "I'd Rather Not Say",
		phno varchar(20) default "I'd Rather Not Say",
		bdate date,
		status varchar(255) default "Hi Social Wire",

		created_at timestamp default now()	
	);


create table tweets
	(
		tweet_id int auto_increment primary key,
		tweet_text varchar(255) not null,
		user_id int not null,
		created_at timestamp default now(),
		foreign key(user_id) references users(acc_id) on delete cascade	 
	);

create table comments
	(
		comment_id int auto_increment primary key,
		comment_text varchar(255) not null,
		user_id int not null,
		tweet_id int not null,
		created_at timestamp default now(),
		foreign key(user_id) references users(acc_id) on delete cascade,
		foreign key(tweet_id) references tweets(tweet_id) on delete cascade	 
	);

create table likes
	(
		user_id int not null,
		tweet_id int not null,
		created_at timestamp default now(),
		foreign key(user_id) references users(acc_id) on delete cascade,
		foreign key(tweet_id) references tweets(tweet_id) on delete cascade,

		primary key(user_id,tweet_id)	
	);

create table follows
	(
		follower_id int not null,
		followee_id int not null,
		created_at timestamp default now(),
		foreign key(follower_id) references users(acc_id) on delete cascade,
		foreign key(followee_id) references users(acc_id) on delete cascade,
		primary key(follower_id,followee_id)
	);


create table like2
	(
		liked_id int not null,
		likee_id int not null,
		created_at timestamp default now(),
		foreign key(liked_id) references users(acc_id) on delete cascade,
		foreign key(likee_id) references users(acc_id) on delete cascade,
		primary key(liked_id,likee_id)
	);

	
create table admin
	(
		admin_id int primary key,
		admin_name varchar(255),
		admin_password varchar(255)
	);	


insert into admin(admin_id,admin_name,admin_password) values(1,'admin','admin');

/* for procedure */

drop PROCEDURE if exists No_like;
DELIMITER $$
 
CREATE PROCEDURE `No_like`()
BEGIN
    SELECT liked_id,COUNT(liked_id) as likecount,username as likename FROM like2 l,users u where liked_id=acc_id
    GROUP BY liked_id ORDER BY COUNT(liked_id) DESC limit 1;
END $$
 
DELIMITER ;


/* for trigger */

CREATE TABLE trigger_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
       	acc_id INT NOT NULL,
        username VARCHAR(50) NOT NULL,
        firstname VARCHAR(50) NOT NULL,
        lastname VARCHAR(50) NOT NULL,
        changedat DATETIME DEFAULT NULL,
        action VARCHAR(50) DEFAULT NULL
    );



DELIMITER $$
CREATE TRIGGER after_user_delete 
    AFTER DELETE ON users
    FOR EACH ROW 
BEGIN
    INSERT INTO trigger_users
    SET action = 'delete',
    	acc_id=OLD.acc_id,
     	username = OLD.username,
        firstname = OLD.firstname,
        lastname = OLD.lastname,
        changedat = NOW();
END$$
DELIMITER ;


/*NOTE: You Can drop trigger with this command */
/*DROP TRIGGER trigger_users.after_user_delete;*/

