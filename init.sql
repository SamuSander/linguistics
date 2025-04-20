-- MySQL dump 10.16  Distrib 10.1.48-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: winograd
-- ------------------------------------------------------
-- Server version	10.1.48-MariaDB-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `winograd`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `winograd` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `winograd`;

--
-- Table structure for table `insight_config`
--

DROP TABLE IF EXISTS `winograd_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `winograd_config` (
  `participantID` text,
  `email` text,
  `status` text,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `winograd_cont`;
CREATE TABLE `winograd_cont` (
    `participantID` text,
  `stimulus` text,
  `trial_index` text,
  `time_elapsed` text,
  `internal_node_id` text,
  `rt` text,
  `response` text,
  `trial_type` text,
  `trial` text,
  `view_history` text,
  `pvt_iti` text,
  `correct` text,
  `pvt_stopwatch` text,
  `list` text,
  `trial_duration` text,
  `word` text,
  `correctAnswer` text,
  `matrixNo` text,
  `words_and_ratings` text,
  `listName` text,
  `word_typ` text,
  `selectedChoice` text,
  `confidenceRating` text,
  `typed_words` text,
  `PorM` text,
  `professionsorhobbies` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
COMMIT;

DROP TABLE IF EXISTS `winograd_end`;
CREATE TABLE `winograd_end` (
    `participantID` text,
  `stimulus` text,
  `trial_index` text,
  `time_elapsed` text,
  `internal_node_id` text,
  `rt` text,
  `response` text,
  `trial_type` text,
  `trial` text,
  `view_history` text,
  `pvt_iti` text,
  `correct` text,
  `pvt_stopwatch` text,
  `list` text,
  `trial_duration` text,
  `word` text,
  `correctAnswer` text,
  `matrixNo` text,
  `words_and_ratings` text,
  `listName` text,
  `word_typ` text,
  `selectedChoice` text,
  `confidenceRating` text,
  `typed_words` text,
  `PorM` text,
  `professionsorhobbies` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
COMMIT;