-- MySQL dump 10.13  Distrib 5.7.23, for Linux (x86_64)
--
-- Host: localhost    Database: test1
-- ------------------------------------------------------
-- Server version	5.7.23-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--
drop Database if EXISTS test1;
create database test1;
use test1;

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_text` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `tweet_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  KEY `user_id` (`user_id`),
  KEY `tweet_id` (`tweet_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`acc_id`) ON DELETE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`tweet_id`) REFERENCES `tweets` (`tweet_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follows`
--

DROP TABLE IF EXISTS `follows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `follows` (
  `follower_id` int(11) NOT NULL,
  `followee_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`follower_id`,`followee_id`),
  KEY `followee_id` (`followee_id`),
  CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`follower_id`) REFERENCES `users` (`acc_id`) ON DELETE CASCADE,
  CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`followee_id`) REFERENCES `users` (`acc_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follows`
--

LOCK TABLES `follows` WRITE;
/*!40000 ALTER TABLE `follows` DISABLE KEYS */;
INSERT INTO `follows` VALUES (1,2,'2018-11-11 10:09:15'),(1,6,'2018-11-12 07:37:29'),(1,7,'2018-11-14 15:00:12'),(2,1,'2018-11-11 09:07:56'),(5,1,'2018-11-13 14:06:18');
/*!40000 ALTER TABLE `follows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like1`
--

DROP TABLE IF EXISTS `like1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `like1` (
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `like1_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`acc_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like1`
--

LOCK TABLES `like1` WRITE;
/*!40000 ALTER TABLE `like1` DISABLE KEYS */;
/*!40000 ALTER TABLE `like1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like2`
--

DROP TABLE IF EXISTS `like2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `like2` (
  `liked_id` int(11) NOT NULL,
  `likee_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`liked_id`,`likee_id`),
  KEY `likee_id` (`likee_id`),
  CONSTRAINT `like2_ibfk_1` FOREIGN KEY (`liked_id`) REFERENCES `users` (`acc_id`) ON DELETE CASCADE,
  CONSTRAINT `like2_ibfk_2` FOREIGN KEY (`likee_id`) REFERENCES `users` (`acc_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like2`
--

LOCK TABLES `like2` WRITE;
/*!40000 ALTER TABLE `like2` DISABLE KEYS */;
INSERT INTO `like2` VALUES (1,2,'2018-11-11 18:35:55'),(1,6,'2018-11-12 07:37:35'),(2,1,'2018-11-11 10:40:14'),(2,5,'2018-11-11 10:40:28'),(5,1,'2018-11-13 14:06:12'),(6,1,'2018-11-12 07:38:09'),(7,1,'2018-11-14 15:00:46');
/*!40000 ALTER TABLE `like2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `likes` (
  `user_id` int(11) NOT NULL,
  `tweet_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`tweet_id`),
  KEY `tweet_id` (`tweet_id`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`acc_id`) ON DELETE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`tweet_id`) REFERENCES `tweets` (`tweet_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tweets`
--

DROP TABLE IF EXISTS `tweets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tweets` (
  `tweet_id` int(11) NOT NULL AUTO_INCREMENT,
  `tweet_text` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`tweet_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tweets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`acc_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tweets`
--

LOCK TABLES `tweets` WRITE;
/*!40000 ALTER TABLE `tweets` DISABLE KEYS */;
INSERT INTO `tweets` VALUES (28,'a tweet 1',1,'2018-11-09 07:36:46'),(29,'a tweet 2',1,'2018-11-09 07:36:52'),(30,'a tweet 3',1,'2018-11-09 07:36:58'),(31,'a tweet 4',1,'2018-11-09 07:37:03'),(32,'a tweet 5',1,'2018-11-09 07:37:09'),(33,'a tweet 6',1,'2018-11-09 08:21:52'),(34,'b tweet1',2,'2018-11-09 17:26:13'),(35,'b tweet2',2,'2018-11-09 17:26:19'),(36,'b tweet3',2,'2018-11-09 17:26:23'),(37,'b tweet4',2,'2018-11-09 17:26:28'),(38,'c tweet1',5,'2018-11-09 17:33:35'),(39,'c tweet2',5,'2018-11-09 17:33:41'),(40,'Hey Awesome!!!!!!',1,'2018-11-11 08:54:17'),(41,'Hi this  is my first tweet',6,'2018-11-12 07:33:57'),(42,'a tweet 7',1,'2018-11-12 15:07:18'),(43,'Hi Social Wire ',7,'2018-11-14 14:57:34');
/*!40000 ALTER TABLE `tweets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `acc_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) DEFAULT 'I''d Rather Not Say',
  `lastname` varchar(255) DEFAULT 'I''d Rather Not Say',
  `sex` varchar(20) DEFAULT 'I''d Rather Not Say',
  `email` varchar(200) DEFAULT 'I''d Rather Not Say',
  `phno` varchar(20) DEFAULT 'I''d Rather Not Say',
  `bdate` date DEFAULT NULL,
  `status` varchar(255) DEFAULT 'Hi Social Wire',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`acc_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
  
--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'a','a','Jack','Barker','Boy','jackbarker@gmail.com','9876543445','1991-01-01','I am in social media','2018-11-05 18:08:03'),(2,'b','b','I\'d Rather Not Say','I\'d Rather Not Say','I\'d Rather Not Say','I\'d Rather Not Say','I\'d Rather Not Say',NULL,'Hi Social Wire','2018-11-06 18:10:18'),(3,'tejasvi','123','I\'d Rather Not Say','I\'d Rather Not Say','I\'d Rather Not Say','I\'d Rather Not Say','I\'d Rather Not Say',NULL,'Hi Social Wire','2018-11-07 18:45:54'),(4,'punith','456','I\'d Rather Not Say','I\'d Rather Not Say','I\'d Rather Not Say','I\'d Rather Not Say','I\'d Rather Not Say',NULL,'Hi Social Wire','2018-11-07 18:46:16'),(5,'c','c','I\'d Rather Not Say','I\'d Rather Not Say','I\'d Rather Not Say','I\'d Rather Not Say','I\'d Rather Not Say',NULL,'Hi Social Wire','2018-11-08 08:29:39'),(6,'mam','mam','Jason','Smith','girl','a@gmail.com','9876543445','1991-09-12','I am in social media','2018-11-12 07:33:16'),(7,'kou','kkk','kou','kk','girl','kee@gmail.com','5768789','2018-11-21','I define Me!','2018-11-14 14:56:51');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;


DROP TABLE IF EXISTS `admin`;
create table admin
  (
    admin_id int primary key NOT NULL AUTO_INCREMENT,
    admin_name varchar(255),
    admin_password varchar(255),
    created_at timestamp DEFAULT now()
  );

insert into admin(admin_name,admin_password) values ("root","root");

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-14 22:19:07
