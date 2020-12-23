-- MySQL dump 10.13  Distrib 8.0.22, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: wnc-academy
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `parent_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `category_name_uindex` (`name`),
  KEY `category_category_id_fk` (`parent_id`),
  CONSTRAINT `category_category_id_fk` FOREIGN KEY (`parent_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_enrol`
--

DROP TABLE IF EXISTS `course_enrol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_enrol` (
  `user_id` int NOT NULL,
  `course_id` int NOT NULL,
  `enrol_at` bigint NOT NULL,
  PRIMARY KEY (`user_id`,`course_id`),
  KEY `course_enrol_courser_id_fk` (`course_id`),
  CONSTRAINT `course_enrol_courser_id_fk` FOREIGN KEY (`course_id`) REFERENCES `courser` (`id`),
  CONSTRAINT `course_enrol_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_enrol`
--

LOCK TABLES `course_enrol` WRITE;
/*!40000 ALTER TABLE `course_enrol` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_enrol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_lesson`
--

DROP TABLE IF EXISTS `course_lesson`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_lesson` (
  `id` int NOT NULL AUTO_INCREMENT,
  `course_id` int NOT NULL,
  `lesson_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `file_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `file_uri` varchar(255) NOT NULL,
  `total_time` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `course_lesson_courser_id_fk` (`course_id`),
  CONSTRAINT `course_lesson_courser_id_fk` FOREIGN KEY (`course_id`) REFERENCES `courser` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_lesson`
--

LOCK TABLES `course_lesson` WRITE;
/*!40000 ALTER TABLE `course_lesson` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_lesson` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_slide`
--

DROP TABLE IF EXISTS `course_slide`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_slide` (
  `id` int NOT NULL AUTO_INCREMENT,
  `course_id` int NOT NULL,
  `slide_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `file_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `file_uri` varchar(255) DEFAULT NULL,
  `is_allow_preview` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `course_slide_courser_id_fk` (`course_id`),
  CONSTRAINT `course_slide_courser_id_fk` FOREIGN KEY (`course_id`) REFERENCES `courser` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_slide`
--

LOCK TABLES `course_slide` WRITE;
/*!40000 ALTER TABLE `course_slide` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_slide` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courser`
--

DROP TABLE IF EXISTS `courser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courser` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `image_avatar` varchar(255) NOT NULL,
  `short_description` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `detail_description` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `price` double NOT NULL,
  `price_promote` double NOT NULL,
  `last_update` bigint NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `category_id` int NOT NULL,
  `teacher_id` int NOT NULL,
  `view_count` bigint DEFAULT NULL,
  `search_term` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `courser_category_id_fk` (`category_id`),
  KEY `courser_users_id_fk` (`teacher_id`),
  CONSTRAINT `courser_category_id_fk` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `courser_users_id_fk` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courser`
--

LOCK TABLES `courser` WRITE;
/*!40000 ALTER TABLE `courser` DISABLE KEYS */;
/*!40000 ALTER TABLE `courser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `user_id` int NOT NULL,
  `course_id` int NOT NULL,
  `review` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `rate` int DEFAULT NULL,
  `last_update` bigint NOT NULL,
  PRIMARY KEY (`user_id`,`course_id`),
  CONSTRAINT `feedback_course_enrol_user_id_course_id_fk` FOREIGN KEY (`user_id`, `course_id`) REFERENCES `course_enrol` (`user_id`, `course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) NOT NULL,
  `rf_token` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '0',
  `otp_code` varchar(255) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_uindex` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `name`, `email`, `username`, `password`, `role`, `rf_token`, `is_active`, `otp_code`, `is_deleted`) VALUES (27,'Yio Si Woho','pvh26419@eoopy.com','yio15556','$2a$10$Kc1PA0sDmROJA30Sf2lcSeqMk2MDzuaO7DsJWgray1Jbf9udbOD8i','ADMIN','I0SF0zUYfV46Wd9GlbW9SGVAvT6k7GGj',1,NULL,0),(28,'Dlz Eoopy','dlz46320@eoopy.com','dlz46320','$2a$10$Bp0O0uqlKk3sl.zJGcY4leX9qcxexYwPFqVtsqWmrAn3Kvn5EsaUW','TEACHER',NULL,1,NULL,0),(29,'First Last','hungsieuga1997@gmail.com','thaivo','thaivo','STUDENT','zui7OiUuUtZoZPf0KlJmux0UXUNyvrKE',1,NULL,0),(30,'Hxo De Cuoly','chm82156@cuoly.com','hxo83042','$2a$10$BolwmreyfEMBsXOFlh28B.uZGYrjp7ioWSVQL6SKmDEVmqOydXzg.','ADMIN','6LBYr6d9PE17gftAls2o1R5yexQtrRPu',1,NULL,0),(31,'Onz Couly','onz50186@cuoly.com','onz50186','$2a$10$2s3LrDXdbBXJKjRIA8wEaeJwfMB2jsGLzJjBnChqw7xUVBa5aOPHq','TEACHER',NULL,1,NULL,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `watch_progress`
--

DROP TABLE IF EXISTS `watch_progress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `watch_progress` (
  `user_id` int NOT NULL,
  `course_id` int NOT NULL,
  `lession_id` int NOT NULL,
  `current_time` int NOT NULL DEFAULT '0',
  `is_done` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`,`course_id`,`lession_id`),
  KEY `watch_progress_course_lesson_course_id_id_fk` (`course_id`,`lession_id`),
  CONSTRAINT `watch_progress_course_enrol_user_id_course_id_fk` FOREIGN KEY (`user_id`, `course_id`) REFERENCES `course_enrol` (`user_id`, `course_id`),
  CONSTRAINT `watch_progress_course_lesson_course_id_id_fk` FOREIGN KEY (`course_id`, `lession_id`) REFERENCES `course_lesson` (`course_id`, `id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `watch_progress`
--

LOCK TABLES `watch_progress` WRITE;
/*!40000 ALTER TABLE `watch_progress` DISABLE KEYS */;
/*!40000 ALTER TABLE `watch_progress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `watchlist`
--

DROP TABLE IF EXISTS `watchlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `watchlist` (
  `user_id` int NOT NULL,
  `course_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`course_id`),
  KEY `watchlist_courser_id_fk` (`course_id`),
  CONSTRAINT `watchlist_courser_id_fk` FOREIGN KEY (`course_id`) REFERENCES `courser` (`id`),
  CONSTRAINT `watchlist_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `watchlist`
--

LOCK TABLES `watchlist` WRITE;
/*!40000 ALTER TABLE `watchlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `watchlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-23 12:04:58
