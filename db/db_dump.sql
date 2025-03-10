-- MySQL dump 10.13  Distrib 8.0.39, for Linux (x86_64)
--
-- Host: localhost    Database: rentall_v_3_7_3
-- ------------------------------------------------------
-- Server version	8.0.39-0ubuntu0.20.04.1

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
-- Table structure for table `AdminPrivileges`
--

DROP TABLE IF EXISTS `AdminPrivileges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AdminPrivileges` (
  `id` int NOT NULL AUTO_INCREMENT,
  `roleId` int NOT NULL,
  `previlegeId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `AdminPrivileges_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `AdminRoles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AdminPrivileges`
--

LOCK TABLES `AdminPrivileges` WRITE;
/*!40000 ALTER TABLE `AdminPrivileges` DISABLE KEYS */;
/*!40000 ALTER TABLE `AdminPrivileges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AdminReviews`
--

DROP TABLE IF EXISTS `AdminReviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AdminReviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) DEFAULT NULL,
  `reviewContent` text,
  `image` varchar(255) DEFAULT NULL,
  `isEnable` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AdminReviews`
--

LOCK TABLES `AdminReviews` WRITE;
/*!40000 ALTER TABLE `AdminReviews` DISABLE KEYS */;
INSERT INTO `AdminReviews` VALUES (1,'Thomas','In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. In publishing and graphic design, Lorem ipsum is a placeho','91a64fe8ce142282b989bed290a78cc1.png',1,'2022-11-03 10:39:42','2022-11-03 11:16:50'),(2,'Henry','In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. In publishing and graphic design, Lorem ipsum is a placeho','ea6c2c849cb1616452e42f375e2d10bf.png',1,'2022-11-03 10:40:06','2022-11-03 11:17:00'),(3,'Joe','In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. In publishing and graphic design, Lorem ipsum is a placeho','d00b855ff7360018164911e976bfb0c0.png',1,'2022-11-03 10:40:36','2022-11-03 11:17:08');
/*!40000 ALTER TABLE `AdminReviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AdminRoles`
--

DROP TABLE IF EXISTS `AdminRoles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AdminRoles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AdminRoles`
--

LOCK TABLES `AdminRoles` WRITE;
/*!40000 ALTER TABLE `AdminRoles` DISABLE KEYS */;
/*!40000 ALTER TABLE `AdminRoles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AdminUser`
--

DROP TABLE IF EXISTS `AdminUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AdminUser` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `emailConfirmed` tinyint(1) DEFAULT '0',
  `isSuperAdmin` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_user_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AdminUser`
--

LOCK TABLES `AdminUser` WRITE;
/*!40000 ALTER TABLE `AdminUser` DISABLE KEYS */;
INSERT INTO `AdminUser` VALUES ('8b16c890-c205-11e6-a2c7-4195de507451','admin@radicalstart.com','$2a$08$SR.h58BFMCbcHbl3y9tvYe9UM.q1SMXh43M51po7FDXQrOcMpQxLy',1,1,'2016-12-14 13:59:34','2016-12-14 13:59:34',NULL);
/*!40000 ALTER TABLE `AdminUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Banner`
--

DROP TABLE IF EXISTS `Banner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Banner` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Banner`
--

LOCK TABLES `Banner` WRITE;
/*!40000 ALTER TABLE `Banner` DISABLE KEYS */;
INSERT INTO `Banner` VALUES (1,'Lorum Ipsum.','Lorem Ipsum is simply dummy text of the printing and typesetting industry.',1,'2019-03-27 11:53:46','2018-05-02 04:49:38');
/*!40000 ALTER TABLE `Banner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BedTypes`
--

DROP TABLE IF EXISTS `BedTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BedTypes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `bedCount` int DEFAULT NULL,
  `bedType` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  KEY `bedType` (`bedType`),
  CONSTRAINT `BedTypes_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `BedTypes_ibfk_2` FOREIGN KEY (`bedType`) REFERENCES `ListSettings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BedTypes`
--

LOCK TABLES `BedTypes` WRITE;
/*!40000 ALTER TABLE `BedTypes` DISABLE KEYS */;
INSERT INTO `BedTypes` VALUES (4,1,1,16,'2019-03-27 09:46:01','2019-03-27 09:46:01'),(5,1,2,17,'2019-03-27 09:46:01','2019-03-27 09:46:01'),(6,1,3,17,'2019-03-27 09:46:01','2019-03-27 09:46:01'),(41,7,1,16,'2019-03-27 10:09:36','2019-03-27 10:09:36'),(42,7,4,17,'2019-03-27 10:09:36','2019-03-27 10:09:36'),(43,7,2,16,'2019-03-27 10:09:36','2019-03-27 10:09:36'),(44,7,3,17,'2019-03-27 10:09:36','2019-03-27 10:09:36'),(45,7,5,18,'2019-03-27 10:09:36','2019-03-27 10:09:36'),(46,7,6,19,'2019-03-27 10:09:36','2019-03-27 10:09:36'),(49,6,1,16,'2019-07-04 10:52:39','2019-07-04 10:52:39'),(50,6,2,16,'2019-07-04 10:52:39','2019-07-04 10:52:39'),(51,5,1,16,'2019-07-04 10:57:10','2019-07-04 10:57:10'),(52,5,2,18,'2019-07-04 10:57:10','2019-07-04 10:57:10'),(53,5,3,18,'2019-07-04 10:57:10','2019-07-04 10:57:10'),(58,3,1,20,'2019-07-04 11:00:34','2019-07-04 11:00:34'),(59,3,2,19,'2019-07-04 11:00:34','2019-07-04 11:00:34'),(60,3,3,20,'2019-07-04 11:00:34','2019-07-04 11:00:34'),(61,2,1,17,'2019-07-04 11:02:19','2019-07-04 11:02:19'),(62,2,2,16,'2019-07-04 11:02:19','2019-07-04 11:02:19'),(74,8,1,16,'2020-04-13 13:10:34','2020-04-13 13:10:34'),(75,8,2,20,'2020-04-13 13:10:34','2020-04-13 13:10:34'),(76,8,3,19,'2020-04-13 13:10:34','2020-04-13 13:10:34'),(77,8,4,19,'2020-04-13 13:10:34','2020-04-13 13:10:34'),(78,8,5,20,'2020-04-13 13:10:34','2020-04-13 13:10:34'),(79,4,1,16,'2020-08-10 07:12:12','2020-08-10 07:12:12');
/*!40000 ALTER TABLE `BedTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BlogDetails`
--

DROP TABLE IF EXISTS `BlogDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BlogDetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pageTitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `metaTitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `metaDescription` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pageUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `footerCategory` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isPrivate` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BlogDetails`
--

LOCK TABLES `BlogDetails` WRITE;
/*!40000 ALTER TABLE `BlogDetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `BlogDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Cancellation`
--

DROP TABLE IF EXISTS `Cancellation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cancellation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `policyName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `policyContent` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `priorDays` int NOT NULL,
  `accommodationPriorCheckIn` float NOT NULL,
  `accommodationBeforeCheckIn` float NOT NULL,
  `accommodationDuringCheckIn` float NOT NULL,
  `guestFeePriorCheckIn` float NOT NULL,
  `guestFeeBeforeCheckIn` float NOT NULL,
  `guestFeeDuringCheckIn` float NOT NULL,
  `hostFeePriorCheckIn` float NOT NULL,
  `hostFeeBeforeCheckIn` float NOT NULL,
  `hostFeeDuringCheckIn` float NOT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `nonRefundableNightsPriorCheckIn` int DEFAULT '0',
  `nonRefundableNightsBeforeCheckIn` int DEFAULT '1',
  `nonRefundableNightsDuringCheckIn` int DEFAULT '0',
  `subTitle` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `subContent` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `content1` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `content2` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `content3` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cancellation`
--

LOCK TABLES `Cancellation` WRITE;
/*!40000 ALTER TABLE `Cancellation` DISABLE KEYS */;
INSERT INTO `Cancellation` VALUES (1,'Flexible','Cancel up to 1 day prior to arrival and get a 100% refund',1,100,100,100,100,100,0,100,100,100,1,'2017-06-09 22:43:35','2022-11-03 10:18:14',0,1,0,'100% refund even if canceled 1 day before arrival.\n\nFor example: Say a guest booked a stay and their check-in time is 3:00 PM on June 09th.','Cleaning fees are always refunded if the guest did not check in.\n\nThe RentALL service fee is refundable if the guest cancels before the trip starts. If a guest books a reservation thatoverlaps with any part of an existing reservation, we won’t refund the RentALL service fee if they decide to cancel.\n\nAccommodation fees (the total nightly rate you\'re charged) are refundable in certain circumstances as outlined below.\n\nIf there is a complaint from either party, notice must be given to RentALL within 24 hours of check-in.\n\nRentALL will mediate when necessary, and has the final say in all disputes.\n\nA reservation is officially canceled when the guest clicks the cancellation button on the cancellation confirmation page,which they can find in Dashboard > Your Trips > Cancel.\n\nCancellation policies may be superseded by the Guest Refund Policy, extenuating circumstances, or cancellations byRentALL for any other reason permitted under the Terms of Service. Please review these exceptions.\n\nApplicable taxes will be retained and remitted.','A full refund will be processed if a guest cancels a booking 24 hrs before check-in time. For example: If a guest cancels the booking before 3:00 PM on June 08th, a 100% refund will be processed.','If a guest cancels their booking less than 24 hrs before the check-in time, then the first night of the stay is non-refundable.\n\nFor example: If a guest cancels the booking after 3:00 PM on June 08th, the first night of the stay is non-refundable, and therest will be refunded to their bank account.','The accommodation fees for the nights not spent will be returned if a guest checks in and decides to leave early.\n\nFor example: If a guest cancels the booking after 3:00 PM on June 08th, the first night of the stay is non-refundable, and therest will be refunded to their bank account.'),(2,'Moderate','Cancel up to 5 days prior to arrival and get a 50% refund',5,100,50,50,100,100,0,100,100,100,1,'2017-06-09 22:46:10','2022-11-03 10:19:14',0,1,0,'100% refund even if cancelled 5 day before check-in time.\n\nFor example: Say a guest booked a stay and their check-in time is 3:00 PM on June 09th.','Cleaning fees are always refunded if the guest did not check in.\n\nThe RentALL service fee is refundable if the guest cancels before the trip starts. If a guest books a reservation thatoverlaps with any part of an existing reservation, we won’t refund the RentALL service fee if they decide to cancel.\n\nAccommodation fees (the total nightly rate you\'re charged) are refundable in certain circumstances as outlined below.\n\nIf there is a complaint from either party, notice must be given to RentALL within 24 hours of check-in.\n\nRentALL will mediate when necessary, and has the final say in all disputes.\n\nA reservation is officially canceled when the guest clicks the cancellation button on the cancellation confirmation page,which they can find in Dashboard > Your Trips > Cancel.\n\nCancellation policies may be superseded by the Guest Refund Policy, extenuating circumstances, or cancellations byRentALL for any other reason permitted under the Terms of Service. Please review these exceptions.\n\nApplicable taxes will be retained and remitted.','Only if a guest cancel their booking 5 days prior to the check-in time,they will receive a full refund\n\n\nFor example: If a guest cancels the booking before 3:00 PM on June 04th, a 100% refund will be processed.','If a guest cancels their booking less than 5 days before the check-in time, then the first night of the stay is non-refundable.But 50% of the remaining night will be refunded\n\nFor example: If a guest cancels the booking after 3:00 PM on June 05th, the first night of the stay is non-refundable, and the50% amount of the remaining night will be refunded.','50%  of the accommodation fees for the nights not spent will be refunded(24 hours after cancellation),if a guest check-in and decides to leave early'),(3,'Strict','Cancel up to 7 days prior to arrival and get a 50% refund',7,50,0,0,100,0,0,100,100,100,1,'2017-06-09 22:47:38','2022-11-03 10:36:48',0,0,0,'50% refund only if cancelled 7 days before check-in time\n\nFor example: Say a guest booked a stay and their check-in time is 3:00 PM on June 09th.','Cleaning fees are always refunded if the guest did not check in.\n\nThe RentALL service fee is refundable if the guest cancels before the trip starts. If a guest books a reservation thatoverlaps with any part of an existing reservation, we won’t refund the RentALL service fee if they decide to cancel.\n\nAccommodation fees (the total nightly rate you\'re charged) are refundable in certain circumstances as outlined below.\n\nIf there is a complaint from either party, notice must be given to RentALL within 24 hours of check-in\n\nRentALL will mediate when necessary, and has the final say in all disputes.\n\nA reservation is officially canceled when the guest clicks the cancellation button on the cancellation confirmation page,which they can find in Dashboard > Your Trips > Cancel.\n\nCancellation policies may be superseded by the Guest Refund Policy, extenuating circumstances, or cancellations byRentALL for any other reason permitted under the Terms of Service. Please review these exceptions.\n\nApplicable taxes will be retained and remitted.','Only if the guest cancels their reservation 7 days prior to the check-in time,they will receive a 50% refund\n\nFor example: If a guest cancels the booking before 3:00 PM on June 02nd, a 50% refund will be processed.','There will be no refund if the guest cancels their booking less than 7 days before the check-in time\n\nFor example: No refund will be given if the guest cancels their reservation after 3:00 PM on June 01st','If a guest check-in and decides to leave early,there will be no refund for the nights not spent');
/*!40000 ALTER TABLE `Cancellation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CancellationDetails`
--

DROP TABLE IF EXISTS `CancellationDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CancellationDetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservationId` int NOT NULL,
  `cancellationPolicy` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `refundToGuest` float NOT NULL,
  `payoutToHost` float NOT NULL,
  `guestServiceFee` float NOT NULL,
  `hostServiceFee` float NOT NULL,
  `total` float NOT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cancelledBy` enum('host','guest') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isTaxRefunded` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `reservationId` (`reservationId`),
  CONSTRAINT `CancellationDetails_ibfk_1` FOREIGN KEY (`reservationId`) REFERENCES `Reservation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CancellationDetails`
--

LOCK TABLES `CancellationDetails` WRITE;
/*!40000 ALTER TABLE `CancellationDetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `CancellationDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Country`
--

DROP TABLE IF EXISTS `Country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Country` (
  `id` int NOT NULL AUTO_INCREMENT,
  `countryCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `countryName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime DEFAULT '2018-09-29 11:22:19',
  `updatedAt` datetime DEFAULT '2018-09-29 11:22:19',
  `dialCode` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=242 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Country`
--

LOCK TABLES `Country` WRITE;
/*!40000 ALTER TABLE `Country` DISABLE KEYS */;
INSERT INTO `Country` VALUES (1,'DZ','Algeria',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+213'),(2,'AF','Afghanistan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+93'),(3,'AL','Albania',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+355'),(4,'AS','AmericanSamoa',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 684'),(5,'AD','Andorra',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+376'),(6,'AO','Angola',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+244'),(7,'AI','Anguilla',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 264'),(8,'AQ','Antarctica',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+672'),(9,'AG','Antigua and Barbuda',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1268'),(10,'AR','Argentina',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+54'),(11,'AM','Armenia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+374'),(12,'AW','Aruba',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+297'),(13,'AU','Australia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+61'),(14,'AT','Austria',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+43'),(15,'AZ','Azerbaijan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+994'),(16,'BS','Bahamas',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 242'),(17,'BH','Bahrain',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+973'),(18,'BD','Bangladesh',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+880'),(19,'BB','Barbados',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 246'),(20,'BY','Belarus',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+375'),(21,'BE','Belgium',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+32'),(22,'BZ','Belize',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+501'),(23,'BJ','Benin',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+229'),(24,'BM','Bermuda',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 441'),(25,'BT','Bhutan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+975'),(26,'BO','Bolivia, Plurinational State of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+591'),(27,'BA','Bosnia and Herzegovina',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+387'),(28,'BW','Botswana',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+267'),(29,'BR','Brazil',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+55'),(30,'IO','British Indian Ocean Territory',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+246'),(31,'BN','Brunei Darussalam',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+673'),(32,'BG','Bulgaria',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+359'),(33,'BF','Burkina Faso',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+226'),(34,'BI','Burundi',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+257'),(35,'KH','Cambodia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+855'),(36,'CM','Cameroon',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+237'),(37,'CA','Canada',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1'),(38,'CV','Cape Verde',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+238'),(39,'KY','Cayman Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+ 345'),(40,'CF','Central African Republic',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+236'),(41,'TD','Chad',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+235'),(42,'CL','Chile',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+56'),(43,'CN','China',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+86'),(44,'CX','Christmas Island',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+61'),(45,'CC','Cocos (Keeling) Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+61'),(46,'CO','Colombia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+57'),(47,'KM','Comoros',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+269'),(48,'CG','Congo',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+242'),(49,'CD','Congo, The Democratic Republic of the',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+243'),(50,'CK','Cook Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+682'),(51,'CR','Costa Rica',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+506'),(52,'CI','Cote d\'Ivoire',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+225'),(53,'HR','Croatia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+385'),(54,'CU','Cuba',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+53'),(55,'CY','Cyprus',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+357'),(56,'CZ','Czech Republic',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+420'),(57,'DK','Denmark',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+45'),(58,'DJ','Djibouti',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+253'),(59,'DM','Dominica',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 767'),(60,'DO','Dominican Republic',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 849'),(61,'EC','Ecuador',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+593'),(62,'EG','Egypt',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+20'),(63,'SV','El Salvador',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+503'),(64,'GQ','Equatorial Guinea',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+240'),(65,'ER','Eritrea',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+291'),(66,'EE','Estonia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+372'),(67,'ET','Ethiopia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+251'),(68,'FK','Falkland Islands (Malvinas)',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+500'),(69,'FO','Faroe Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+298'),(70,'FJ','Fiji',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+679'),(71,'FI','Finland',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+358'),(72,'FR','France',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+33'),(73,'GF','French Guiana',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+594'),(74,'PF','French Polynesia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+689'),(75,'GA','Gabon',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+241'),(76,'GM','Gambia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+220'),(77,'GE','Georgia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+995'),(78,'DE','Germany',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+49'),(79,'GH','Ghana',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+233'),(80,'GI','Gibraltar',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+350'),(81,'GR','Greece',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+30'),(82,'GL','Greenland',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+299'),(83,'GD','Grenada',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 473'),(84,'GP','Guadeloupe',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+590'),(85,'GU','Guam',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 671'),(86,'GT','Guatemala',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+502'),(87,'GG','Guernsey',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+44'),(88,'GN','Guinea',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+224'),(89,'GW','Guinea-Bissau',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+245'),(90,'GY','Guyana',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+595'),(91,'HT','Haiti',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+509'),(92,'VA','Holy See (Vatican City State)',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+379'),(93,'HN','Honduras',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+504'),(94,'HK','Hong Kong',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+852'),(95,'HU','Hungary',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+36'),(96,'IS','Iceland',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+354'),(97,'IN','India',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+91'),(98,'ID','Indonesia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+62'),(99,'IR','Iran, Islamic Republic of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+98'),(100,'IQ','Iraq',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+964'),(101,'IE','Ireland',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+353'),(102,'IM','Isle of Man',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+44'),(103,'IL','Israel',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+972'),(104,'IT','Italy',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+39'),(105,'JM','Jamaica',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 876'),(106,'JP','Japan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+81'),(107,'JE','Jersey',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+44'),(108,'JO','Jordan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+962'),(109,'KZ','Kazakhstan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+7 7'),(110,'KE','Kenya',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+254'),(111,'KI','Kiribati',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+686'),(112,'KP','Korea, Democratic People\'s Republic of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+850'),(113,'KR','Korea, Republic of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+82'),(114,'KW','Kuwait',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+965'),(115,'KG','Kyrgyzstan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+996'),(116,'LA','Lao People\'s Democratic Republic',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+856'),(117,'LV','Latvia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+371'),(118,'LB','Lebanon',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+961'),(119,'LS','Lesotho',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+266'),(120,'LR','Liberia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+231'),(121,'LY','Libyan Arab Jamahiriya',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+218'),(122,'LI','Liechtenstein',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+423'),(123,'LT','Lithuania',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+370'),(124,'LU','Luxembourg',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+352'),(125,'MO','Macao',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+853'),(126,'MK','Macedonia, The Former Yugoslav Republic of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+389'),(127,'MG','Madagascar',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+261'),(128,'MW','Malawi',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+265'),(129,'MY','Malaysia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+60'),(130,'MV','Maldives',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+960'),(131,'ML','Mali',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+223'),(132,'MT','Malta',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+356'),(133,'MH','Marshall Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+692'),(134,'MQ','Martinique',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+596'),(135,'MR','Mauritania',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+222'),(136,'MU','Mauritius',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+230'),(137,'YT','Mayotte',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+262'),(138,'MX','Mexico',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+52'),(139,'FM','Micronesia, Federated States of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+691'),(140,'MD','Moldova, Republic of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+373'),(141,'MC','Monaco',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+377'),(142,'MN','Mongolia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+976'),(143,'ME','Montenegro',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+382'),(144,'MS','Montserrat',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1664'),(145,'MA','Morocco',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+212'),(146,'MZ','Mozambique',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+258'),(147,'MM','Myanmar',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+95'),(148,'NA','Namibia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+264'),(149,'NR','Nauru',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+674'),(150,'NP','Nepal',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+977'),(151,'NL','Netherlands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+31'),(152,'AN','Netherlands Antilles',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+599'),(153,'NC','New Caledonia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+687'),(154,'NZ','New Zealand',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+64'),(155,'NI','Nicaragua',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+505'),(156,'NE','Niger',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+227'),(157,'NG','Nigeria',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+234'),(158,'NU','Niue',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+683'),(159,'NF','Norfolk Island',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+672'),(160,'MP','Northern Mariana Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 670'),(161,'NO','Norway',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+47'),(162,'OM','Oman',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+968'),(163,'PK','Pakistan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+92'),(164,'PW','Palau',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+680'),(165,'PS','Palestinian Territory, Occupied',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+970'),(166,'PA','Panama',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+507'),(167,'PG','Papua New Guinea',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+675'),(168,'PY','Paraguay',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+595'),(169,'PE','Peru',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+51'),(170,'PH','Philippines',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+63'),(171,'PN','Pitcairn',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+872'),(172,'PL','Poland',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+48'),(173,'PT','Portugal',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+351'),(174,'PR','Puerto Rico',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 939'),(175,'QA','Qatar',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+974'),(176,'RO','Romania',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+40'),(177,'RU','Russia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+7'),(178,'RW','Rwanda',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+250'),(179,'RE','Réunion',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+262'),(180,'BL','Saint Barthélemy',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+590'),(181,'SH','Saint Helena, Ascension and Tristan Da Cunha',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+290'),(182,'KN','Saint Kitts and Nevis',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 869'),(183,'LC','Saint Lucia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 758'),(184,'MF','Saint Martin',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+590'),(185,'PM','Saint Pierre and Miquelon',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+508'),(186,'VC','Saint Vincent and the Grenadines',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 784'),(187,'WS','Samoa',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+685'),(188,'SM','San Marino',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+378'),(189,'ST','Sao Tome and Principe',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+239'),(190,'SA','Saudi Arabia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+966'),(191,'SN','Senegal',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+221'),(192,'RS','Serbia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+381'),(193,'SC','Seychelles',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+248'),(194,'SL','Sierra Leone',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+232'),(195,'SG','Singapore',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+65'),(196,'SK','Slovakia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+421'),(197,'SI','Slovenia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+386'),(198,'SB','Solomon Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+677'),(199,'SO','Somalia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+252'),(200,'ZA','South Africa',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+27'),(201,'GS','South Georgia and the South Sandwich Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+500'),(202,'ES','Spain',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+34'),(203,'LK','Sri Lanka',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+94'),(204,'SD','Sudan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+249'),(205,'SR','Suriname',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+597'),(206,'SJ','Svalbard and Jan Mayen',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+47'),(207,'SZ','Swaziland',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+268'),(208,'SE','Sweden',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+46'),(209,'CH','Switzerland',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+41'),(210,'SY','Syrian Arab Republic',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+963'),(211,'TW','Taiwan, Province of China',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+886'),(212,'TJ','Tajikistan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+992'),(213,'TZ','Tanzania, United Republic of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+255'),(214,'TH','Thailand',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+66'),(215,'TL','Timor-Leste',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+670'),(216,'TG','Togo',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+228'),(217,'TK','Tokelau',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+690'),(218,'TO','Tonga',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+676'),(219,'TT','Trinidad and Tobago',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 868'),(220,'TN','Tunisia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+216'),(221,'TR','Turkey',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+90'),(222,'TM','Turkmenistan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+993'),(223,'TC','Turks and Caicos Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 649'),(224,'TV','Tuvalu',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+688'),(225,'UG','Uganda',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+256'),(226,'UA','Ukraine',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+380'),(227,'AE','United Arab Emirates',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+971'),(228,'GB','United Kingdom',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+44'),(229,'US','United States',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1'),(230,'UY','Uruguay',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+598'),(231,'UZ','Uzbekistan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+998'),(232,'VU','Vanuatu',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+678'),(233,'VE','Venezuela, Bolivarian Republic of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+58'),(234,'VN','Viet Nam',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+84'),(235,'VG','Virgin Islands, British',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 284'),(236,'VI','Virgin Islands, U.S.',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 340'),(237,'WF','Wallis and Futuna',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+681'),(238,'YE','Yemen',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+967'),(239,'ZM','Zambia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+260'),(240,'ZW','Zimbabwe',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+263'),(241,'AX','Åland Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+358');
/*!40000 ALTER TABLE `Country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Currencies`
--

DROP TABLE IF EXISTS `Currencies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Currencies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `symbol` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `isBaseCurrency` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isPayment` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=176 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Currencies`
--

LOCK TABLES `Currencies` WRITE;
/*!40000 ALTER TABLE `Currencies` DISABLE KEYS */;
INSERT INTO `Currencies` VALUES (1,'AED',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(2,'AFN',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(3,'ALL',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(4,'AMD',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(5,'ANG',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(6,'AOA',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(7,'ARS',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(8,'AUD',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',1),(9,'AWG',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(10,'AZN',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(11,'BAM',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(12,'BBD',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(13,'BDT',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(14,'BGN',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',1),(15,'BHD',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(16,'BIF',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(17,'BMD',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(18,'BND',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(19,'BOB',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(20,'BRL',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',1),(21,'BSD',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(22,'BTN',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(23,'BWP',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(24,'BYN',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(25,'BYR',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(26,'BZD',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(27,'CAD',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(28,'CDF',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(29,'CHF',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(30,'CLF',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(31,'CLP',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(32,'CNH',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(33,'CNY',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(34,'COP',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(35,'CRC',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(36,'CUC',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(37,'CUP',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(38,'CVE',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(39,'CZK',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(40,'DJF',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(41,'DKK',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(42,'DOP',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(43,'DZD',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(44,'EEK',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(45,'EGP',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(46,'ETB',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(47,'EUR',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',1),(48,'FJD',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(49,'FKP',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(50,'GBP',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(51,'GEL',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(52,'GGP',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(53,'GHS',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(54,'GIP',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(55,'GMD',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(56,'GNF',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(57,'GTQ',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(58,'GYD',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(59,'HKD',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(60,'HNL',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(61,'HRK',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(62,'HTG',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(63,'HUF',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(64,'IDR',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(65,'ILS',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(66,'IMP',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(67,'INR',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(68,'IQD',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(69,'IRR',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(70,'ISK',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(71,'JEP',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(72,'JMD',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(73,'JOD',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(74,'JPY',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(75,'KES',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(76,'KGS',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(77,'KHR',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(78,'KMF',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(79,'KPW',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(80,'KRW',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(81,'KWD',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(82,'KYD',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(83,'KZT',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(84,'LAK',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(85,'LBP',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(86,'LKR',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(87,'LRD',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(88,'LSL',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(89,'LTL',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(90,'LVL',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(91,'LYD',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(92,'MAD',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(93,'MDL',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(94,'MGA',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(95,'MKD',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(96,'MMK',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(97,'MNT',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(98,'MOP',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(99,'MRO',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(100,'MRU',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(101,'MUR',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(102,'MVR',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(103,'MWK',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(104,'MXN',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(105,'MYR',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(106,'MZN',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(107,'NAD',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(108,'NGN',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(109,'NIO',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(110,'NOK',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(111,'NPR',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(112,'NZD',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(113,'OMR',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(114,'PAB',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(115,'PEN',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(116,'PGK',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(117,'PHP',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',1),(118,'PKR',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(119,'PLN',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(120,'PYG',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(121,'QAR',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(122,'RON',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(123,'RSD',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(124,'RUB',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',1),(125,'RWF',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(126,'SAR',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(127,'SBD',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(128,'SCR',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(129,'SDG',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(130,'SEK',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(131,'SGD',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',1),(132,'SHP',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(133,'SKK',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(134,'SLL',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(135,'SOS',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(136,'SRD',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(137,'SSP',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(138,'STD',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(139,'SVC',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(140,'SYP',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(141,'SZL',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(142,'THB',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',1),(143,'TJS',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(144,'TMM',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(145,'TMT',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(146,'TND',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(147,'TOP',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(148,'TRY',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',1),(149,'TTD',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(150,'TWD',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(151,'TZS',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(152,'UAH',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(153,'UGX',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(154,'USD',1,1,'2024-06-17 08:00:11','2024-06-17 08:00:11',1),(155,'UYU',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(156,'UZS',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(157,'VEF',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(158,'VES',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(159,'VND',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(160,'VUV',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(161,'WST',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(162,'XAF',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(163,'XAG',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(164,'XAU',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(165,'XCD',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(166,'XDR',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(167,'XOF',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(168,'XPD',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(169,'XPF',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(170,'XPT',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(171,'YER',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(172,'ZAR',0,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(173,'ZMK',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(174,'ZMW',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0),(175,'ZWD',1,0,'2024-06-17 08:00:11','2024-06-17 08:00:11',0);
/*!40000 ALTER TABLE `Currencies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CurrencyRates`
--

DROP TABLE IF EXISTS `CurrencyRates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CurrencyRates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `currencyCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `rate` float NOT NULL,
  `isBase` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=476 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CurrencyRates`
--

LOCK TABLES `CurrencyRates` WRITE;
/*!40000 ALTER TABLE `CurrencyRates` DISABLE KEYS */;
INSERT INTO `CurrencyRates` VALUES (1,'00',16.4609,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(2,'1INCH',2.46609,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(3,'AAVE',0.0117682,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(4,'ABT',0.329603,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(5,'ACH',42.545,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(6,'ACS',501.027,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(7,'ADA',2.43784,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(8,'AED',3.67295,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(9,'AERGO',11.3443,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(10,'AERO',1.17234,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(11,'AEVO',1.66102,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(12,'AFN',70.7781,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(13,'AGLD',0.792173,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(14,'AIOZ',1.71954,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(15,'AKT',0.326318,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(16,'ALCX',0.0486855,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(17,'ALEPH',3.64697,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(18,'ALGO',6.73401,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(19,'ALICE',0.756716,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(20,'ALL',93.9119,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(21,'AMD',387.794,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(22,'AMP',185.529,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(23,'ANG',1.79564,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(24,'ANKR',29.9536,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(25,'ANT',0.107223,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(26,'AOA',854.997,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(27,'APE',0.959693,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(28,'API3',0.377003,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(29,'APT',0.130804,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(30,'AR',0.0366991,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(31,'ARB',1.12657,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(32,'ARKM',0.562272,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(33,'ARPA',18.0668,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(34,'ARS',903.225,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(35,'ASM',31.3627,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(36,'AST',8.78349,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(37,'ATA',8.02393,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(38,'ATOM',0.140154,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(39,'AUCTION',0.0459453,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(40,'AUD',1.51449,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(41,'AUDIO',5.96481,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(42,'AURORA',5.30504,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(43,'AVAX',0.034323,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(44,'AVT',0.402415,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(45,'AWG',1.8,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(46,'AXL',1.3508,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(47,'AXS',0.153728,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(48,'AZN',1.7,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(49,'BADGER',0.27894,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(50,'BAL',0.296736,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(51,'BAM',1.82753,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(52,'BAND',0.775795,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(53,'BAT',4.8689,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(54,'BBD',2,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(55,'BCH',0.00238129,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(56,'BDT',117.461,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(57,'BGN',1.82734,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(58,'BHD',0.376868,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(59,'BICO',2.23264,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(60,'BIF',2871.97,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(61,'BIGTIME',7.33192,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(62,'BIT',1.12931,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(63,'BLUR',3.41413,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(64,'BLZ',3.70302,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(65,'BMD',1,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(66,'BND',1.3531,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(67,'BNT',1.46692,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(68,'BOB',6.9162,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(69,'BOBA',3.5392,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(70,'BOND',0.378682,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(71,'BONK',41554.1,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(72,'BRL',5.37629,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(73,'BSD',1,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(74,'BSV',0.0207813,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(75,'BTC',0.0000151224,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(76,'BTN',83.5219,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(77,'BTRST',1.88857,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(78,'BUSD',1.00128,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(79,'BWP',13.604,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(80,'BYN',3.27035,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(81,'BYR',32703.5,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(82,'BZD',2.01723,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(83,'C98',4.91159,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(84,'CAD',1.37445,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(85,'CBETH',0.000262636,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(86,'CDF',2835.01,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(87,'CELR',53.0926,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(88,'CGLD',1.57729,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(89,'CHF',0.89164,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(90,'CHZ',10.5208,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(91,'CLF',0.0334381,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(92,'CLP',928.137,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(93,'CLV',17.762,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(94,'CNH',7.27052,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(95,'CNY',7.256,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(96,'COMP',0.0190204,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(97,'COP',4139.94,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(98,'COTI',9.78474,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(99,'COVAL',52.7009,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(100,'CRC',526.357,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(101,'CRO',10.3842,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(102,'CRPT',23.0153,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(103,'CRV',2.90571,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(104,'CTSI',5.56328,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(105,'CTX',0.267738,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(106,'CUC',1,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(107,'CUP',25.375,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(108,'CVC',8.54336,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(109,'CVE',103.029,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(110,'CVX',0.273898,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(111,'CZK',23.0727,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(112,'DAI',1.00015,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(113,'DAR',7.49064,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(114,'DASH',0.0396668,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(115,'DDX',20.2409,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(116,'DESO',0.0570776,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(117,'DEXT',1.39451,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(118,'DIA',2.26739,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(119,'DIMO',5.61719,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(120,'DJF',177.835,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(121,'DKK',6.97242,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(122,'DNT',20.3874,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(123,'DOGE',7.48055,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(124,'DOP',59.301,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(125,'DOT',0.159604,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(126,'DREP',119.745,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(127,'DYP',3.40576,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(128,'DZD',134.826,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(129,'EEK',14.6222,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(130,'EGLD',0.0309023,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(131,'EGP',47.7128,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(132,'ELA',0.398406,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(133,'ENA',1.41236,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(134,'ENJ',4.74649,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(135,'ENS',0.0432526,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(136,'EOS',1.56177,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(137,'ERN',0.352734,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(138,'ETB',57.3196,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(139,'ETC',0.0405597,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(140,'ETH',0.000281734,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(141,'ETH2',0.000281734,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(142,'ETHFI',0.270057,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(143,'EUR',0.934678,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(144,'EUROC',0.938218,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(145,'FARM',0.0187319,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(146,'FET',0.754461,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(147,'FIDA',2.61952,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(148,'FIL',0.19558,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(149,'FIS',2.42014,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(150,'FJD',2.24194,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(151,'FKP',0.789314,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(152,'FLOW',1.45349,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(153,'FLR',37.2648,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(154,'FORT',5.26593,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(155,'FORTH',0.297177,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(156,'FOX',16.129,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(157,'FTM',1.60948,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(158,'FX',8.08081,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(159,'GAL',0.383215,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(160,'GALA',31.9963,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(161,'GBP',0.789342,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(162,'GEL',2.87,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(163,'GFI',0.381083,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(164,'GGP',0.789314,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(165,'GHS',15.0264,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(166,'GHST',0.704225,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(167,'GIP',0.789326,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(168,'GLM',2.51383,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(169,'GMD',67.7628,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(170,'GMT',5.43331,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(171,'GNF',8603.54,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(172,'GNO',0.00307064,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(173,'GNT',2.51254,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(174,'GODS',5.32538,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(175,'GRT',4.50045,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(176,'GST',51.1705,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(177,'GTC',0.900901,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(178,'GTQ',7.76453,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(179,'GUSD',0.9995,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(180,'GYD',209.059,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(181,'GYEN',168.549,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(182,'HBAR',12.0882,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(183,'HFT',4.11523,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(184,'HIGH',0.383877,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(185,'HKD',7.81016,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(186,'HNL',24.6965,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(187,'HNT',0.29976,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(188,'HONEY',15.1286,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(189,'HOPR',12.5786,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(190,'HRK',7.04238,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(191,'HTG',132.546,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(192,'HUF',370.8,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(193,'ICP',0.109212,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(194,'IDEX',20.3874,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(195,'IDR',16442.4,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(196,'ILS',3.74089,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(197,'ILV',0.0128559,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(198,'IMP',0.789342,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(199,'IMX',0.619867,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(200,'INDEX',0.253165,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(201,'INJ',0.0425922,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(202,'INR',83.5487,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(203,'INV',0.0298418,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(204,'IOTX',20.2593,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(205,'IQD',1309.26,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(206,'IRR',42100,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(207,'ISK',139.75,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(208,'JASMY',27.4763,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(209,'JEP',0.789314,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(210,'JMD',155.607,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(211,'JOD',0.708967,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(212,'JPY',157.533,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(213,'JTO',0.364784,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(214,'JUP',1113.12,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(215,'KARRAT',1.36874,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(216,'KAVA',1.84315,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(217,'KEEP',7.69231,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(218,'KES',129.294,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(219,'KGS',87.8599,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(220,'KHR',4115.11,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(221,'KMF',458.638,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(222,'KNC',1.48887,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(223,'KPW',135,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(224,'KRL',1.99601,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(225,'KRW',1381.03,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(226,'KSM',0.0384172,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(227,'KWD',0.306764,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(228,'KYD',0.833156,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(229,'KZT',452.829,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(230,'LAK',21822.5,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(231,'LBP',89506.3,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(232,'LCX',4.53309,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(233,'LDO',0.474608,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(234,'LINK',0.0677323,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(235,'LIT',1.15042,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(236,'LKR',303.951,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(237,'LOKA',4.2328,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(238,'LOOM',16.448,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(239,'LPT',0.0482276,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(240,'LQTY',1.03407,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(241,'LRC',5.41419,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(242,'LRD',193.849,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(243,'LSETH',0.000263466,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(244,'LSL',18.3557,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(245,'LTC',0.0127885,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(246,'LTL',3.04032,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(247,'LVL',0.656789,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(248,'LYD',4.84449,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(249,'MAD',10.0406,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(250,'MAGIC',1.50852,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(251,'MANA',2.70709,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(252,'MASK',0.373832,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(253,'MATH',2.86985,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(254,'MATIC',1.65289,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(255,'MCO2',1.55059,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(256,'MDL',17.816,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(257,'MDT',19.4609,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(258,'MEDIA',0.0717103,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(259,'METIS',0.0170692,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(260,'MGA',4460.35,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(261,'MINA',1.6116,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(262,'MIR',29.6675,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(263,'MKD',57.5625,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(264,'MKR',0.000419522,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(265,'MLN',0.0536049,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(266,'MMK',2096.29,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(267,'MNDE',8.09782,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(268,'MNT',3425.32,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(269,'MOBILE',779.423,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(270,'MONA',0.0081619,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(271,'MOP',8.0429,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(272,'MPL',0.0797448,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(273,'MRO',375.47,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(274,'MRU',39.357,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(275,'MSOL',0.00569411,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(276,'MTL',0.886305,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(277,'MULTI',4.08378,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(278,'MUR',47.1087,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(279,'MUSE',0.0934012,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(280,'MVR',15.4128,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(281,'MWK',1733.26,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(282,'MXC',89.4766,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(283,'MXN',18.4683,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(284,'MYR',4.71962,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(285,'MZN',63.865,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(286,'NAD',18.3557,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(287,'NCT',56.5611,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(288,'NEAR',0.187582,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(289,'NEON',1.35227,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(290,'NEST',444.915,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(291,'NGN',1488.03,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(292,'NIO',36.7798,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(293,'NKN',10.9649,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(294,'NMR',0.0475624,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(295,'NOK',10.7083,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(296,'NPR',133.607,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(297,'NU',12.0104,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(298,'NZD',1.63496,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(299,'OCEAN',1.7322,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(300,'OGN',8.80941,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(301,'OMG',2.60987,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(302,'OMR',0.384959,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(303,'ONDO',0.900037,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(304,'OOKI',509.039,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(305,'OP',0.496771,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(306,'ORCA',0.518861,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(307,'ORDI',0.0230236,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(308,'ORN',0.555247,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(309,'OSMO',1.70459,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(310,'OXT',11.8483,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(311,'PAB',1,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(312,'PAX',1.0006,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(313,'PEN',3.77474,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(314,'PEPE',84928.8,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(315,'PERP',1.20351,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(316,'PGK',3.88227,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(317,'PHP',58.6886,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(318,'PKR',278.394,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(319,'PLA',14.2468,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(320,'PLN',4.081,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(321,'PLU',0.27137,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(322,'PNG',2.61063,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(323,'POLS',1.61865,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(324,'POLY',9.43395,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(325,'POND',52.9521,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(326,'POWR',4.4613,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(327,'PRIME',0.105949,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(328,'PRO',0.651296,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(329,'PRQ',11.6347,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(330,'PUNDIX',2.58331,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(331,'PYG',7515.07,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(332,'PYR',0.248911,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(333,'PYUSD',1.00103,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(334,'QAR',3.64366,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(335,'QI',62.7569,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(336,'QNT',0.0123716,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(337,'QUICK',0.0193725,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(338,'RAD',0.699301,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(339,'RAI',0.352734,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(340,'RARE',9.28505,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(341,'RARI',0.445434,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(342,'RBN',1.66425,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(343,'REN',18.7946,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(344,'RENDER',0.127535,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(345,'REP',1.11417,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(346,'REPV2',1.11417,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(347,'REQ',8.51064,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(348,'RGT',3.20907,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(349,'RLC',0.440354,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(350,'RLY',115.066,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(351,'RNDR',0.126743,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(352,'RON',4.652,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(353,'RONIN',0.397931,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(354,'ROSE',9.10954,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(355,'RPL',0.0377501,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(356,'RSD',109.427,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(357,'RUB',89.0301,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(358,'RUNE',0.222558,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(359,'RWF',1311.18,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(360,'SAFE',0.66968,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(361,'SAND',2.74952,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(362,'SAR',3.75196,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(363,'SBD',8.4616,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(364,'SCR',14.1342,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(365,'SDG',586,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(366,'SEAM',0.212028,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(367,'SEI',2.57699,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(368,'SEK',10.5426,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(369,'SGD',1.3533,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(370,'SHDW',2.06825,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(371,'SHIB',49554,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(372,'SHP',0.789326,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(373,'SHPING',139.189,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(374,'SKK',28.1548,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(375,'SKL',16.7084,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(376,'SLL',20359.8,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(377,'SNT',38.1928,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(378,'SNX',0.477897,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(379,'SOL',0.00682571,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(380,'SOS',570.286,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(381,'SPA',107.776,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(382,'SPELL',1261.19,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(383,'SRD',31.7483,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(384,'SSP',1549.3,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(385,'STD',22654.5,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(386,'STG',2.04805,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(387,'STORJ',2.5208,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(388,'STRK',1.14877,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(389,'STX',0.549753,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(390,'SUI',1.09027,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(391,'SUKU',11.0011,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(392,'SUPER',1.29523,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(393,'SUSHI',1.08784,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(394,'SVC',8.74777,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(395,'SWFTC',162.259,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(396,'SYLO',619.927,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(397,'SYN',1.59744,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(398,'SYP',512.795,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(399,'SZL',18.3505,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(400,'T',40.0641,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(401,'THB',36.7812,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(402,'THETA',0.62952,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(403,'TIA',0.129316,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(404,'TIME',0.036846,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(405,'TJS',10.6888,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(406,'TMM',17528.6,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(407,'TMT',3.50285,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(408,'TND',3.12716,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(409,'TNSR',1.27959,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(410,'TONE',1667.94,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(411,'TOP',2.36235,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(412,'TRAC',1.37817,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(413,'TRB',0.00988875,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(414,'TRIBE',2.02431,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(415,'TRU',5.96659,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(416,'TRY',32.7544,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(417,'TTD',6.79024,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(418,'TVK',5.91296,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(419,'TWD',32.363,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(420,'TZS',2623.49,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(421,'UAH',40.7116,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(422,'UGX',3708.78,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(423,'UMA',0.345841,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(424,'UNFI',0.246153,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(425,'UNI',0.0908554,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(426,'UPI',3115.76,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(427,'USD',1,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(428,'USDC',1,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(429,'USDT',1.00059,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(430,'UST',49.158,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(431,'UYU',39.2472,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(432,'UZS',12607.8,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(433,'VARA',21.9394,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(434,'VEF',3621420,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(435,'VELO',10.4015,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(436,'VES',36.2484,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(437,'VET',35.2485,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(438,'VGX',12.4796,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(439,'VND',25456,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(440,'VOXEL',5.28681,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(441,'VTHO',377.003,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(442,'VUV',115.931,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(443,'WAMPL',0.0328138,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(444,'WAXL',1.35639,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(445,'WBTC',0.0000151222,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(446,'WCFG',1.97824,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(447,'WLUNA',34136.2,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(448,'WST',2.77211,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(449,'XAF',613.047,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(450,'XAG',0.0343563,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(451,'XAU',0.000431397,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(452,'XCD',2.70127,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(453,'XCN',583.09,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(454,'XDR',0.757523,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(455,'XLM',10.2005,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(456,'XMON',0.00188759,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(457,'XOF',612.748,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(458,'XPD',0.00113251,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(459,'XPF',111.542,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(460,'XPT',0.00105704,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(461,'XRP',2.0024,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(462,'XTZ',1.27632,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(463,'XYO',144.613,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(464,'YER',250.291,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(465,'YFI',0.000162719,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(466,'YFII',0.00247722,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(467,'ZAR',18.3588,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(468,'ZEC',0.044964,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(469,'ZEN',0.141443,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(470,'ZETA',1.01513,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(471,'ZMK',5223.62,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(472,'ZMW',26.0427,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(473,'ZRX',2.53215,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(474,'ZWD',377.382,0,'2024-06-17 08:00:23','2024-06-17 08:00:23'),(475,'USD',1,1,'2024-06-17 08:00:23','2024-06-17 08:00:23');
/*!40000 ALTER TABLE `CurrencyRates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DocumentVerification`
--

DROP TABLE IF EXISTS `DocumentVerification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DocumentVerification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fileName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fileType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `documentStatus` enum('pending','approved') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DocumentVerification`
--

LOCK TABLES `DocumentVerification` WRITE;
/*!40000 ALTER TABLE `DocumentVerification` DISABLE KEYS */;
/*!40000 ALTER TABLE `DocumentVerification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EmailToken`
--

DROP TABLE IF EXISTS `EmailToken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EmailToken` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `EmailToken_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EmailToken`
--

LOCK TABLES `EmailToken` WRITE;
/*!40000 ALTER TABLE `EmailToken` DISABLE KEYS */;
INSERT INTO `EmailToken` VALUES (1,'d1d6d5a0-5064-11e9-a14e-635e0fd3bfa6','demo@radicalstart.com','1553672955896','2019-03-27 07:49:16','2019-03-27 07:49:16'),(2,'977bc550-5069-11e9-a14e-635e0fd3bfa6','qa@radicalstart.com','1553675005475','2019-03-27 08:23:25','2019-03-27 08:23:25');
/*!40000 ALTER TABLE `EmailToken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FailedTransactionHistory`
--

DROP TABLE IF EXISTS `FailedTransactionHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FailedTransactionHistory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservationId` int NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` float NOT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `reason` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `transactionId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentMethodId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `reservationId` (`reservationId`),
  CONSTRAINT `failedtransactionhistory_ibfk_1` FOREIGN KEY (`reservationId`) REFERENCES `Reservation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FailedTransactionHistory`
--

LOCK TABLES `FailedTransactionHistory` WRITE;
/*!40000 ALTER TABLE `FailedTransactionHistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `FailedTransactionHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FooterBlock`
--

DROP TABLE IF EXISTS `FooterBlock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FooterBlock` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content1` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content2` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title3` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content3` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FooterBlock`
--

LOCK TABLES `FooterBlock` WRITE;
/*!40000 ALTER TABLE `FooterBlock` DISABLE KEYS */;
INSERT INTO `FooterBlock` VALUES (1,'24/7 customer support','If you need help while traveling or hosting, contact us at our toll free number: 000 000 0000 000','6,00,00,000 host guarantee','Hosts are protected against property damages for up to 6,00,00,000.','Verified ID','We aim to build a trusted community by giving you more info when youre deciding who to host or stay with.',1,'2018-05-22 11:12:19','2018-05-23 05:37:44'),(2,'one','hkh','one ','jkjh','one ','nknk',1,'2018-05-22 11:14:18','2018-05-22 11:14:18'),(3,'one','hkhih','one ','nhjlkhk','one ','klnklh',1,'2018-05-22 11:15:07','2018-05-22 11:15:07'),(4,'fdf','fdsfds','fdsfd','fdsfds','fdsff','fdssdfds',1,'2018-05-22 11:34:58','2018-05-22 11:34:58'),(5,'fdf','fdsfds','fdsfd','fdsfds','fdsff','fdss',1,'2018-05-22 11:35:14','2018-05-22 11:35:14'),(6,'fdf','fdsfds','fdsf','fdsfd','fds','fdss',1,'2018-05-22 11:39:06','2018-05-22 11:39:06');
/*!40000 ALTER TABLE `FooterBlock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ForgotPassword`
--

DROP TABLE IF EXISTS `ForgotPassword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ForgotPassword` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `ForgotPassword_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ForgotPassword`
--

LOCK TABLES `ForgotPassword` WRITE;
/*!40000 ALTER TABLE `ForgotPassword` DISABLE KEYS */;
/*!40000 ALTER TABLE `ForgotPassword` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HomeBanner`
--

DROP TABLE IF EXISTS `HomeBanner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HomeBanner` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `enable` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HomeBanner`
--

LOCK TABLES `HomeBanner` WRITE;
/*!40000 ALTER TABLE `HomeBanner` DISABLE KEYS */;
INSERT INTO `HomeBanner` VALUES (5,'74a6ae6e1cc8e5f633e6f9a4bb72ecff.png',1,'2022-11-03 11:14:32','2022-11-03 11:14:32'),(6,'a640bd64840e139381d5e29080603f87.png',1,'2022-11-03 11:15:43','2022-11-03 11:15:43'),(7,'63e5f1be971e5d0d7d45b6d77d8f0ee0.png',1,'2022-11-03 11:15:50','2022-11-03 11:15:50'),(8,'429f557eac7a7c69e5c67c5c039ce932.png',1,'2022-11-03 11:15:54','2022-11-03 11:15:54');
/*!40000 ALTER TABLE `HomeBanner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ImageBanner`
--

DROP TABLE IF EXISTS `ImageBanner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ImageBanner` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `buttonLabel` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ImageBanner`
--

LOCK TABLES `ImageBanner` WRITE;
/*!40000 ALTER TABLE `ImageBanner` DISABLE KEYS */;
INSERT INTO `ImageBanner` VALUES (1,'Lorem Ipsum is simply dummy text','Lorem Ipsum is simply dummy text of the printing and typesetting industry.','Lorem Ipsum','c450a107e6bf8600169b749d34980a56.png','2019-03-27 11:53:47','2022-11-03 11:13:34');
/*!40000 ALTER TABLE `ImageBanner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListBlockedDates`
--

DROP TABLE IF EXISTS `ListBlockedDates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ListBlockedDates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `reservationId` int DEFAULT NULL,
  `blockedDates` date NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `calendarId` int DEFAULT NULL,
  `calendarStatus` enum('available','blocked','reservation') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isSpecialPrice` double DEFAULT '0',
  `dayStatus` enum('firstHalf','secondHalf','full') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'full',
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  KEY `reservationId` (`reservationId`),
  CONSTRAINT `ListBlockedDates_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ListBlockedDates_ibfk_2` FOREIGN KEY (`reservationId`) REFERENCES `Reservation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListBlockedDates`
--

LOCK TABLES `ListBlockedDates` WRITE;
/*!40000 ALTER TABLE `ListBlockedDates` DISABLE KEYS */;
INSERT INTO `ListBlockedDates` VALUES (1,7,NULL,'2019-07-04','2019-07-04 06:49:04','2019-07-04 06:56:10',NULL,'blocked',10,'full'),(2,7,NULL,'2019-07-05','2019-07-04 06:49:04','2019-07-04 06:56:10',NULL,'blocked',10,'full'),(3,4,NULL,'2023-02-22','2023-02-14 07:06:25','2023-02-14 07:06:25',NULL,'available',2,'secondHalf'),(4,4,NULL,'2023-02-23','2023-02-14 07:06:25','2023-02-14 07:06:25',NULL,'available',2,'firstHalf');
/*!40000 ALTER TABLE `ListBlockedDates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListCalendar`
--

DROP TABLE IF EXISTS `ListCalendar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ListCalendar` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `ListCalendar_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListCalendar`
--

LOCK TABLES `ListCalendar` WRITE;
/*!40000 ALTER TABLE `ListCalendar` DISABLE KEYS */;
/*!40000 ALTER TABLE `ListCalendar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListPhotos`
--

DROP TABLE IF EXISTS `ListPhotos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ListPhotos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `isCover` int DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `ListPhotos_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListPhotos`
--

LOCK TABLES `ListPhotos` WRITE;
/*!40000 ALTER TABLE `ListPhotos` DISABLE KEYS */;
INSERT INTO `ListPhotos` VALUES (57,1,'dcda484c967e8df86e64f0f394498c6b.jpeg','image/jpeg',0,'2020-01-23 05:36:39','2020-01-23 05:36:39'),(58,1,'394d7c5d3da2621b559887435d8011d0.jpeg','image/jpeg',0,'2020-01-23 05:36:39','2020-01-23 05:36:39'),(60,1,'8698cc427d4e10b7eb6aaf5038db0040.jpeg','image/jpeg',0,'2020-01-23 05:36:39','2020-01-23 05:36:39'),(61,2,'77d1573a6965309f7a2c23ea11cef7e0.jpeg','image/jpeg',0,'2020-01-23 05:37:31','2020-01-23 05:37:31'),(62,2,'afd75f9701dbf592ce119162fc3e38b7.jpeg','image/jpeg',0,'2020-01-23 05:37:31','2020-01-23 05:37:31'),(63,2,'866f343a16430b0a9b97bfd3b1b6a587.jpeg','image/jpeg',0,'2020-01-23 05:37:31','2020-01-23 05:37:31'),(64,2,'b486b9fc9dde068102e964f37b5ff855.jpeg','image/jpeg',0,'2020-01-23 05:37:31','2020-01-23 05:37:31'),(65,3,'da06a23c01f8a092370cea8803249b4f.jpeg','image/jpeg',0,'2020-01-23 05:38:35','2020-01-23 05:38:35'),(67,3,'8e3a897a800f2c828a16032533a5f209.jpeg','image/jpeg',0,'2020-01-23 05:38:35','2020-01-23 05:38:35'),(68,3,'db757d32c2f546843c4ee734641c53c5.jpeg','image/jpeg',0,'2020-01-23 05:38:35','2020-01-23 05:38:35'),(69,3,'3628f4dc2294d66e680ccf7bb41682f9.jpeg','image/jpeg',0,'2020-01-23 05:38:35','2020-01-23 05:38:35'),(70,3,'27acc79bfce120f16cea205e51a3f324.jpeg','image/jpeg',0,'2020-01-23 05:39:29','2020-01-23 05:39:29'),(71,4,'42050893b5a4b64369f84033cf43987f.jpeg','image/jpeg',0,'2020-01-23 05:40:03','2020-01-23 05:40:03'),(73,4,'3e135cfea39185357f38a98ba1f201b0.jpeg','image/jpeg',0,'2020-01-23 05:40:11','2020-01-23 05:40:11'),(74,4,'91cac4f4d0d3e9cc72ff6ad75c38e663.jpeg','image/jpeg',0,'2020-01-23 05:40:19','2020-01-23 05:40:19'),(75,5,'8ad7c57de58e95f65aae90ddd2360008.jpeg','image/jpeg',0,'2020-01-23 05:41:36','2020-01-23 05:41:36'),(76,5,'84958eea5f87554e55b6544659b5710a.jpeg','image/jpeg',0,'2020-01-23 05:41:42','2020-01-23 05:41:42'),(77,5,'5f15b1ad8688df1c85d321995a0c0737.jpeg','image/jpeg',0,'2020-01-23 05:41:49','2020-01-23 05:41:49'),(78,5,'14a9105e3a02bd3ee426fc872b3a7e74.jpeg','image/jpeg',0,'2020-01-23 05:41:54','2020-01-23 05:41:54'),(79,6,'9d956fb476a25976009d856703a59e84.jpeg','image/jpeg',0,'2020-01-23 05:42:24','2020-01-23 05:42:24'),(80,6,'42a7e827a18c9a51b7b8fedebac09349.jpeg','image/jpeg',0,'2020-01-23 05:42:32','2020-01-23 05:42:32'),(81,6,'8c649d8e694481e5bc77196a7634d397.jpeg','image/jpeg',0,'2020-01-23 05:42:37','2020-01-23 05:42:37'),(82,6,'9be399d3fd4c13f2b03c719728847b68.jpeg','image/jpeg',0,'2020-01-23 05:42:45','2020-01-23 05:42:45'),(83,6,'182abd0d95358fc8616e4461928d27ae.jpeg','image/jpeg',0,'2020-01-23 05:42:51','2020-01-23 05:42:51'),(84,7,'33aeec2a8924021116181daa8074a417.jpeg','image/jpeg',0,'2020-01-23 05:43:40','2020-01-23 05:43:40'),(85,7,'01608e58a5d1c6e843c479da5384e47e.jpeg','image/jpeg',0,'2020-01-23 05:43:57','2020-01-23 05:43:57'),(86,7,'1a32aaeec0eb1e2b51bb5f9143e63670.jpeg','image/jpeg',0,'2020-01-23 05:44:11','2020-01-23 05:44:11'),(87,7,'e981d7b0d542793aef6a917b4eedccb1.jpeg','image/jpeg',0,'2020-01-23 05:44:16','2020-01-23 05:44:16'),(88,1,'3ad006e157cd885569f68988c026bfc4.jpeg','image/jpeg',0,'2020-01-23 05:47:34','2020-01-23 05:47:34'),(89,8,'de5861a5c50f95fd36c2aaa705dad602.jpeg','image/jpeg',0,'2020-01-23 05:51:24','2020-01-23 05:51:24'),(90,8,'90f82aab773399b4b89575ba2d04f6f8.jpeg','image/jpeg',0,'2020-01-23 05:51:24','2020-01-23 05:51:24'),(91,8,'f28fc2ffae8165c6ad2cfc7222d20093.jpeg','image/jpeg',0,'2020-01-23 05:52:02','2020-01-23 05:52:02'),(92,8,'e814f3b9c0221b7a6b64dae48c1ad50b.jpeg','image/jpeg',0,'2020-01-23 05:52:10','2020-01-23 05:52:10');
/*!40000 ALTER TABLE `ListPhotos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListSettings`
--

DROP TABLE IF EXISTS `ListSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ListSettings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `typeId` int NOT NULL,
  `itemName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `otherItemName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `maximum` int DEFAULT NULL,
  `minimum` int DEFAULT NULL,
  `startValue` int DEFAULT NULL,
  `endValue` int DEFAULT NULL,
  `step` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isEnable` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `itemDescription` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `typeId` (`typeId`),
  CONSTRAINT `ListSettings_ibfk_1` FOREIGN KEY (`typeId`) REFERENCES `ListSettingsTypes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=138 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListSettings`
--

LOCK TABLES `ListSettings` WRITE;
/*!40000 ALTER TABLE `ListSettings` DISABLE KEYS */;
INSERT INTO `ListSettings` VALUES (5,3,'House',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:46:35','2018-04-11 15:19:10',NULL,NULL),(6,3,'Apartment',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:46:42','2017-01-09 07:46:42',NULL,NULL),(7,3,'Bed & Breakfast',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:46:49','2017-01-09 07:46:49',NULL,NULL),(8,3,'Boutique hotel',NULL,NULL,NULL,NULL,NULL,NULL,'0','2017-01-09 07:46:57','2018-05-05 11:23:23',NULL,NULL),(10,4,'1-5 Rooms',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:49:23','2017-01-09 07:49:23',NULL,NULL),(11,4,'6-25 Rooms',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:49:35','2017-01-09 07:49:35',NULL,NULL),(14,5,'bedroom  ','bedrooms ',NULL,NULL,1,10,NULL,'1','2017-01-09 07:53:04','2018-05-02 04:54:59',NULL,NULL),(15,6,'bed','beds',NULL,NULL,1,16,NULL,'1','2017-01-09 07:53:48','2018-04-28 04:50:39',NULL,NULL),(16,7,'Single',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:59:47','2017-01-09 07:59:47',NULL,NULL),(17,7,'Double',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:59:57','2017-01-09 07:59:57',NULL,NULL),(18,7,'Queen',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:00:05','2017-01-09 08:00:05',NULL,NULL),(19,7,'King',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:00:13','2017-01-09 08:00:13',NULL,NULL),(20,7,'Bunk bed',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:00:20','2017-01-09 08:00:20',NULL,NULL),(21,8,'bathroom','bathrooms',NULL,NULL,1,8,NULL,'1','2017-01-09 08:12:24','2018-04-10 07:04:01',NULL,NULL),(22,9,'Private Room',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:31:16','2017-01-09 08:31:16',NULL,NULL),(23,9,'Shared Room',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:31:28','2017-01-09 08:31:28',NULL,NULL),(24,9,'Other',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:31:32','2017-01-09 08:31:32',NULL,NULL),(25,10,'Towels, bed sheets, soap, and toilet paper',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:43:32','2017-01-09 08:43:32',NULL,NULL),(26,10,'Wifi',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:43:42','2017-01-09 08:43:42',NULL,NULL),(27,10,'Shampoo ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:43:51','2017-01-09 08:43:51',NULL,NULL),(28,10,'Closet/drawers',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:44:00','2017-01-09 08:44:00',NULL,NULL),(29,11,'Smoke detector',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:44:17','2017-01-09 08:44:17',NULL,NULL),(30,11,'Carbon monoxide detector',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:44:25','2017-01-09 08:44:25',NULL,NULL),(31,11,'First aid kit ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:44:33','2017-01-09 08:44:33',NULL,NULL),(32,11,'Safety card',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:44:41','2017-01-09 08:44:41',NULL,NULL),(33,12,'Kitchen',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 09:05:19','2017-01-09 09:05:19',NULL,NULL),(34,12,'Laundry – washer ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 09:05:26','2017-01-09 09:05:26',NULL,NULL),(35,12,'Laundry – dryer',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 09:05:33','2017-01-09 09:05:33',NULL,NULL),(36,12,'Parking',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 09:05:40','2017-01-09 09:05:40',NULL,NULL),(39,2,'guest','guests',NULL,NULL,1,20,NULL,'1','2017-01-09 10:51:56','2018-05-22 08:47:42',NULL,NULL),(45,13,'Payment information',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 07:48:16','2017-01-18 07:48:16',NULL,NULL),(46,13,'Agree to your House Rules',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 08:02:20','2018-04-12 08:08:01',NULL,NULL),(47,13,'Tell you their trip purpose',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 08:02:29','2017-01-18 08:02:29',NULL,NULL),(48,14,'Suitable for children (2-14 years) ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 10:00:20','2018-03-15 18:16:04',NULL,NULL),(49,14,'Suitable for infants (Under 2 years)',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 10:00:28','2017-01-18 10:00:28',NULL,NULL),(50,14,'Suitable for pets',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 10:00:35','2017-01-18 10:00:35',NULL,NULL),(51,14,'Smoking Not allowed ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 10:00:41','2018-04-25 01:16:08',NULL,NULL),(52,14,'Events or parties allowed',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 10:00:56','2017-01-18 10:00:56',NULL,NULL),(53,15,'Meet RentAll’s guest requirements',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 11:01:08','2017-01-18 11:01:08',NULL,NULL),(54,15,'Agree to your house rules',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 11:01:16','2017-01-18 11:01:16',NULL,NULL),(55,15,'Tell you their trip purpose',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 11:01:25','2017-01-18 11:01:25',NULL,NULL),(56,15,'Let you know how many people are coming on the trip',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 11:03:00','2018-05-02 04:57:56',NULL,NULL),(58,16,'1 day',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 15:19:43','2017-01-18 15:19:43',NULL,NULL),(59,16,'2 days',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 15:19:48','2017-01-18 15:19:48',NULL,NULL),(60,16,'3 days',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 15:19:58','2017-01-18 15:19:58',NULL,NULL),(61,16,'7 days',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 15:20:03','2017-01-18 15:20:03',NULL,NULL),(62,17,'Dates unavailable by default',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 18:01:01','2017-01-18 18:01:01',NULL,NULL),(63,17,'Any time',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 18:01:16','2017-01-18 18:01:16',NULL,NULL),(64,17,'3 months',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 18:01:22','2017-01-18 18:01:22',NULL,NULL),(65,17,'6 months',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 18:01:29','2017-01-18 18:01:29',NULL,NULL),(66,17,'1 year',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 18:01:42','2017-01-18 18:01:42',NULL,NULL),(67,18,'night min','nights min',NULL,NULL,0,100,NULL,'1','2017-01-18 18:18:28','2018-04-28 04:56:03',NULL,NULL),(68,19,'night max','nights max',NULL,NULL,0,100,NULL,'1','2017-01-18 18:19:00','2018-05-02 04:59:10',NULL,NULL),(73,10,'Hair dryer',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-07-28 11:36:34','2017-07-28 14:45:50',NULL,NULL),(74,1,'Guest Room',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-07-28 14:21:14','2024-01-03 05:29:12',NULL,NULL),(76,1,'Private Room',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-07-30 04:24:13','2017-07-30 04:24:13',NULL,NULL),(77,1,'Entire Place',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-07-30 04:24:18','2018-04-27 13:10:06',NULL,NULL),(87,10,'LED TV',NULL,NULL,NULL,NULL,NULL,NULL,'0','2018-04-10 05:13:44','2018-04-28 04:52:14',NULL,NULL),(97,10,'TV',NULL,NULL,NULL,NULL,NULL,NULL,'0','2018-04-10 07:29:11','2018-04-10 07:29:32',NULL,NULL),(100,3,'Cottage ',NULL,NULL,NULL,NULL,NULL,NULL,'0','2018-04-10 08:56:22','2018-04-28 04:47:07',NULL,NULL),(102,4,'25-50 Rooms',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-10 08:57:40','2018-04-28 04:48:13',NULL,NULL),(103,14,'Loud Music Not Allowed',NULL,NULL,NULL,NULL,NULL,NULL,'0','2018-04-10 09:00:48','2018-05-02 04:57:29',NULL,NULL),(105,4,'50-100 Rooms',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-12 08:08:55','2018-04-28 04:48:27',NULL,NULL),(106,10,'item',NULL,NULL,NULL,NULL,NULL,NULL,'0','2018-04-12 08:09:22','2018-04-23 15:27:14',NULL,NULL),(110,1,'Landscape',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-24 00:24:06','2024-01-03 05:42:41',NULL,NULL),(112,1,'Tent',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-24 02:28:25','2024-01-03 05:29:04',NULL,NULL),(113,1,'Shared Room',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-24 02:28:41','2018-04-24 02:28:41',NULL,NULL),(118,10,'Parking',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-24 02:33:13','2018-04-24 02:33:13',NULL,NULL),(119,10,'Swimming Pool',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-24 02:33:23','2020-04-13 13:09:35','d8e103a2e500b56205bd28147fccae88.png',NULL),(123,3,'House with garden',NULL,NULL,NULL,NULL,NULL,NULL,'0','2018-04-25 14:56:34','2018-04-28 04:47:28',NULL,NULL),(125,14,'Loud People are not allowed',NULL,NULL,NULL,NULL,NULL,NULL,'0','2018-04-25 14:59:40','2018-04-28 04:27:21',NULL,NULL),(126,4,'100+ Rooms',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-28 04:49:12','2018-04-28 04:49:12',NULL,NULL),(127,13,'Confirmed Email',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-28 04:53:50','2018-04-28 04:53:50',NULL,NULL),(128,16,'Same day',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-28 04:55:21','2018-04-30 21:33:25',NULL,NULL),(129,1,'Apartment',NULL,NULL,NULL,NULL,NULL,NULL,'1','2024-01-03 05:39:21','2024-01-03 05:39:21',NULL,NULL),(130,1,'Villa',NULL,NULL,NULL,NULL,NULL,NULL,'1','2024-01-03 05:39:26','2024-01-03 05:39:26',NULL,NULL),(131,1,'Cottage',NULL,NULL,NULL,NULL,NULL,NULL,'1','2024-01-03 05:39:30','2024-01-03 05:39:30',NULL,NULL),(132,1,'House',NULL,NULL,NULL,NULL,NULL,NULL,'1','2024-01-03 05:39:40','2024-01-03 05:39:40',NULL,NULL),(133,1,'Igloo stay',NULL,NULL,NULL,NULL,NULL,NULL,'1','2024-01-03 05:40:16','2024-01-03 05:40:16',NULL,NULL),(134,1,'Beach house',NULL,NULL,NULL,NULL,NULL,NULL,'1','2024-01-03 05:40:21','2024-01-03 05:40:21',NULL,NULL),(135,1,'Smart house',NULL,NULL,NULL,NULL,NULL,NULL,'1','2024-01-03 05:40:32','2024-01-03 05:40:39',NULL,NULL),(136,1,'Tree house',NULL,NULL,NULL,NULL,NULL,NULL,'1','2024-01-03 05:40:50','2024-01-03 05:40:57',NULL,NULL),(137,1,'Pool view',NULL,NULL,NULL,NULL,NULL,NULL,'1','2024-01-03 05:41:24','2024-01-03 05:41:24',NULL,NULL);
/*!40000 ALTER TABLE `ListSettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListSettingsTypes`
--

DROP TABLE IF EXISTS `ListSettingsTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ListSettingsTypes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `typeName` varchar(255) NOT NULL,
  `fieldType` enum('stringType','numberType') DEFAULT 'stringType',
  `step` int DEFAULT '1',
  `isEnable` varchar(255) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `typeLabel` varchar(255) DEFAULT NULL,
  `isMultiValue` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListSettingsTypes`
--

LOCK TABLES `ListSettingsTypes` WRITE;
/*!40000 ALTER TABLE `ListSettingsTypes` DISABLE KEYS */;
INSERT INTO `ListSettingsTypes` VALUES (1,'roomType','stringType',1,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Room Type',0),(2,'personCapacity','numberType',1,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Person Capacity',0),(3,'houseType','stringType',1,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','House Type',0),(4,'buildingSize','stringType',1,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Building Size',0),(5,'bedrooms','numberType',1,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Bed Rooms',0),(6,'beds','numberType',1,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Beds',0),(7,'bedType','stringType',1,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Bed Type',0),(8,'bathrooms','numberType',1,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Bathrooms',0),(9,'bathroomType','stringType',1,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Bathroom Type',0),(10,'essentialsAmenities','stringType',1,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Essential Amenities',1),(11,'safetyAmenities','stringType',1,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Safety Amenities',1),(12,'spaces','stringType',1,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Spaces',1),(13,'guestRequirements','stringType',3,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Guest Requirements',0),(14,'houseRules','stringType',3,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','House Rules',1),(15,'reviewGuestBook','stringType',3,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Review How Guests Book',0),(16,'bookingNoticeTime','stringType',3,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Booking Notice Time',0),(17,'maxDaysNotice','stringType',3,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Maximum Days Notice',0),(18,'minNight','numberType',3,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Minimum Nights',0),(19,'maxNight','numberType',3,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Maximum Nights',0);
/*!40000 ALTER TABLE `ListSettingsTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListViews`
--

DROP TABLE IF EXISTS `ListViews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ListViews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`,`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListViews`
--

LOCK TABLES `ListViews` WRITE;
/*!40000 ALTER TABLE `ListViews` DISABLE KEYS */;
INSERT INTO `ListViews` VALUES (1,1,'977bc550-5069-11e9-a14e-635e0fd3bfa6','2019-07-04 13:37:45','2019-07-04 13:37:45'),(2,6,'d1d6d5a0-5064-11e9-a14e-635e0fd3bfa6','2020-04-13 12:54:11','2020-04-13 12:54:11'),(3,6,'d1d6d5a0-5064-11e9-a14e-635e0fd3bfa6','2022-11-03 12:40:55','2022-11-03 12:40:55'),(4,6,'d1d6d5a0-5064-11e9-a14e-635e0fd3bfa6','2023-02-14 07:06:44','2023-02-14 07:06:44'),(5,5,'d1d6d5a0-5064-11e9-a14e-635e0fd3bfa6','2024-08-20 12:31:08','2024-08-20 12:31:08');
/*!40000 ALTER TABLE `ListViews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Listing`
--

DROP TABLE IF EXISTS `Listing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Listing` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `roomType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `houseType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `residenceType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bedrooms` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `buildingSize` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bedType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `beds` int DEFAULT NULL,
  `personCapacity` int DEFAULT NULL,
  `bathrooms` float DEFAULT NULL,
  `bathroomType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `street` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `buildingName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zipcode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lng` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isMapTouched` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `coverPhoto` int DEFAULT NULL,
  `bookingType` enum('request','instant') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'instant',
  `isPublished` tinyint(1) NOT NULL DEFAULT '0',
  `isReady` tinyint(1) NOT NULL DEFAULT '0',
  `reviewsCount` tinyint(1) DEFAULT '0',
  `listApprovalStatus` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastUpdatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `Listing_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Listing`
--

LOCK TABLES `Listing` WRITE;
/*!40000 ALTER TABLE `Listing` DISABLE KEYS */;
INSERT INTO `Listing` VALUES (1,'d1d6d5a0-5064-11e9-a14e-635e0fd3bfa6',NULL,NULL,'1','2',NULL,NULL,3,3,3,NULL,'US','763 Massachusetts Avenue',NULL,'Middlesex County','MA','02420','42.42703074607657','-71.20063239836423',1,'2019-03-27 09:45:41','2024-03-26 13:00:01','Off-grid it House and stunning view ','The Off-grid itHouse is an architecturally significant house, recently noted by Dwell as one of the \'Best Homes in America\' and in the Los Angeles Times as one of the best houses of all time in Southern California. The Off-grid itHouse is one of 10 IT Houses built in California, which have received much acclaim such as the Western Home award sponsored by Sunset magazine. Also noted as one of the top 10 airbnb rentals worldwide. This is the prototype for the pre-engineered system known as the IT House.\n\nThe house is 100% off-grid, powered by solar panels for energy and hot water, and is located in a pristine remote valley in the beautiful California high desert. The house observes key green principals of smaller footprint, minimal disturbance to the natural beauty of the surrounding landscape, use of renewable resources, and living simply and minimally.\n\nThe setting of the house is remote and serene, a quiet refuge from everything, free from distractions. Amazing views and vistas in all directions.\n\nPerfect for design or green aficionados, writers or those needing a secluded quiet getaway.',58,'request',1,1,0,'approved','2022-11-03 09:57:34'),(2,'d1d6d5a0-5064-11e9-a14e-635e0fd3bfa6',NULL,NULL,'0','1',NULL,NULL,2,2,2,NULL,'US','Guizhou Province Architectural Design & Research Institute, Nanming, , , /','','YunYan','Guizhou','551400','26.8429645','107.2902839',1,'2019-03-27 09:50:28','2024-03-26 13:00:01','Classic Harlem Brownstone - NYC',' Your Master Bedroom is located on the top floor of a classic Harlem brownstone, with a full guests-shared kitchen and bath. The home is located on Sugar Hill and is across the street from St. Nicholas Park and Hamilton Grange.\n\nThe Master Bedroom is on the top floor of a classic Harlem brownstone, build in 1901. It is gorgeous and spacious, facing the front of the house. You will have soft light in the morning, and a wonderful view of the city lights at night.\n\nPop out to the balcony or across the street to the park for some fresh air! Hamilton Heights, where the home is located, is a fun neighborhood with great fine dining, brunch and tasty takeout! You will have plenty of options for restaurants, bars, music venues and historical landmarks to visit during your stay.\n\nOnce home, enjoy the peace and quite of Hamilton Terrace. This beautiful and historic block is a quaint residential enclave you\'ll love at first sight!\n\nGuest access\n\nGuest have complete access to the full kitchen and full bath.',62,'instant',1,1,0,'approved','2022-11-03 09:57:34'),(3,'d1d6d5a0-5064-11e9-a14e-635e0fd3bfa6',NULL,NULL,'0','3',NULL,NULL,3,5,2.5,NULL,'GB','76 Russell Rd, ',NULL,'Nottingham','UK','NG1 5AW','52.9550908','-1.1583049',1,'2019-03-27 09:54:02','2024-03-26 13:00:01','Immaculate Lakefront Condo w/boat slip-THIS IS IT!','Whether you need a romantic getaway for two, a family fun week at the lake, or a fisherman\'s weekend, Smith Mountain Lake & our penthouse condo has it all just steps from the water. From sitting on the deck watching the sunset over the water while enjoying your favorite beverage, to drifting off to sleep cuddled up in our crisp linens after a day on the lake - Come for a visit - fall in love for a lifetime!',68,'request',1,1,0,'approved','2022-11-03 09:57:34'),(4,'d1d6d5a0-5064-11e9-a14e-635e0fd3bfa6',NULL,NULL,'1','1',NULL,NULL,1,1,1,NULL,'US','328 East Fir Avenue, ',NULL,'Atwater','CA','90001','37.3456814','-120.5913511',1,'2019-03-27 09:56:36','2024-03-26 13:00:01','Adorable townhouse near MFL train & hipster spots','Relax in this adorable and cozy little Philly row house in the calm end of Fishtown. Steps from great coffee, cute independent shops and galleries, a stones throw from more hipster amenities, food and nightlife throughout Fishtown and Northern Liberties. And just a quick ride away from Old City, Center City or the airport.\n\nFull kitchen - Laundry - Patio - Free unlimited street parking all around and easy loading area right out front',73,'request',1,1,0,'approved','2022-11-03 12:35:13'),(5,'977bc550-5069-11e9-a14e-635e0fd3bfa6',NULL,NULL,NULL,'3',NULL,NULL,3,3,3,NULL,'GB','Basse Normandie, Rue Verte, ',NULL,'Hérouville-Saint-Clair','France','75116','49.205084','-0.318614',1,'2019-03-27 10:03:30','2024-03-26 13:00:01','Historic Georgian Lakeside Mansion 500 acre Park','This 250 year old delightful and spacious Georgian Menagerie - a replica of that built for Marie Antoinette at Palace of Versailles - is set within 10 acres of private grounds in a 500 acre country park. Sleep in a four poster bed, handmade from oak gifted to the owners by Prince Charles; one of 5 bedrooms available (with a further 2 by separate negotiation)',75,'request',1,1,0,'approved','2022-11-03 09:57:34'),(6,'977bc550-5069-11e9-a14e-635e0fd3bfa6',NULL,NULL,'1','2',NULL,NULL,2,2,2,NULL,'GB','Oristano Stazione F.s., Oristano, ','','Province of Oristano','Italy','09170','39.90105570554223','8.60587392065429',1,'2019-03-27 10:07:00','2024-03-26 13:00:01','Lux LoftApartment Nr City Centre with GatedParking','A ground floor light filled spacious apartment with amazing décor perfect for singles, couples, a romantic retreat, a group of friends, families and business travel. A stone\'s throw from City Centre with easy quick transport links or walking. 15/20 min walk to City Centre . 10 min walk to Cardiff City Stadium. The stunning galleried bedroom area is on a mezzanine level overlooking a large living area. Secure Private Parking and Bike Shed in gated courtyard and outside seating area.',81,'instant',1,1,0,'approved','2022-11-03 09:57:34'),(7,'977bc550-5069-11e9-a14e-635e0fd3bfa6',NULL,NULL,'1','5',NULL,NULL,6,4,4,NULL,'GB','69 Commercial Street',NULL,'Greater London','England','E1 7NE','51.51743291864772','-0.07390837724608446',1,'2019-03-27 10:09:22','2024-03-26 13:00:01','Historic and Stunning, Large Central Bedford House','Amazing Georgian home which can accommodate several families (up to 20+): roaring fires, kitchen range vast living rooms (can be candlelit throughout), third-acre garden; lawn tennis, swimming, piano. Our home is in the centre of Bedford, close for shopping, a huge variety of restaurants and pubs. A five minute walk to the town and beautiful river beyond; less to the bus station, and ten to the railway station with easy access to London (35 minutes) and a short drive (45 minutes) to Cambridge.',87,'request',1,1,0,'approved','2022-11-03 09:57:34'),(8,'977bc550-5069-11e9-a14e-635e0fd3bfa6',NULL,NULL,'1','5',NULL,NULL,5,5,2.5,NULL,'IE','Aidan Chamberlain property is located in Killorglin, IE',NULL,'KE','County Kerry','53665','52.122014593253695','-9.751445003857414',1,'2020-01-23 05:50:54','2024-03-26 13:00:01','River Laune in Main st Killorglin, - 3-star guest','It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English the banks of the River Laune in Killorglin, Couples particularly like the location, Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humor and the like). this 3-star guest house has pretty river and mountain views. There is free Wi-Fi throughout, and free private parking on site. Coffey\'s Rivers Edge guest house has a balcony running the width of the house, and you can sit outside to read, play cards, or enjoy a drink and the picturesque views.',90,'request',1,1,0,'approved','2022-11-03 09:57:34');
/*!40000 ALTER TABLE `Listing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListingData`
--

DROP TABLE IF EXISTS `ListingData`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ListingData` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int DEFAULT NULL,
  `bookingNoticeTime` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `checkInStart` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Flexible',
  `checkInEnd` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Flexible',
  `minNight` int DEFAULT NULL,
  `maxNight` int DEFAULT NULL,
  `priceMode` tinyint(1) DEFAULT NULL,
  `basePrice` double DEFAULT '0',
  `maxPrice` float DEFAULT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hostingFrequency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `weeklyDiscount` float DEFAULT '0',
  `monthlyDiscount` float DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `cleaningPrice` double DEFAULT '0',
  `maxDaysNotice` enum('unavailable','3months','6months','9months','12months','available') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'unavailable',
  `cancellationPolicy` int DEFAULT '1',
  `taxRate` float DEFAULT '0',
  `tax` float DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `ListingData_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListingData`
--

LOCK TABLES `ListingData` WRITE;
/*!40000 ALTER TABLE `ListingData` DISABLE KEYS */;
INSERT INTO `ListingData` VALUES (1,1,'59','14','19',0,6,NULL,135,NULL,'USD',NULL,2,5,'2019-03-27 09:49:54','2019-03-27 09:49:54',50,'available',2,0,0),(2,2,'58','Flexible','Flexible',0,4,NULL,250,NULL,'USD',NULL,5,10,'2019-03-27 09:52:48','2019-03-27 09:52:48',50,'available',3,0,0),(3,3,'59','14','22',2,0,NULL,500,NULL,'USD',NULL,4,8,'2019-03-27 09:55:45','2019-03-27 09:55:45',50,'available',1,0,0),(4,4,'58','10','15',1,6,NULL,550,NULL,'USD',NULL,3,6,'2019-03-27 09:59:06','2023-02-14 07:06:26',25,'available',1,0,0),(5,5,'59','16','19',0,11,NULL,650,NULL,'EUR',NULL,5,15,'2019-03-27 10:05:46','2019-03-27 10:05:46',0,'available',3,0,0),(6,6,'58','11','20',2,0,NULL,850,NULL,'EUR',NULL,5,NULL,'2019-03-27 10:08:24','2019-03-27 10:08:28',50,'available',1,0,0),(7,7,'59','15','Flexible',1,0,NULL,550,NULL,'EUR',NULL,3,8,'2019-03-27 10:11:05','2019-11-13 11:56:53',45,'available',2,0,0),(8,8,'60','10','20',3,0,NULL,750,NULL,'USD',NULL,4,12,'2020-01-23 05:53:23','2020-01-23 05:53:23',25,'available',3,0,0);
/*!40000 ALTER TABLE `ListingData` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListingPermissionHistory`
--

DROP TABLE IF EXISTS `ListingPermissionHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ListingPermissionHistory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reason` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListingPermissionHistory`
--

LOCK TABLES `ListingPermissionHistory` WRITE;
/*!40000 ALTER TABLE `ListingPermissionHistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `ListingPermissionHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PaymentMethods`
--

DROP TABLE IF EXISTS `PaymentMethods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PaymentMethods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `processedIn` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fees` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `details` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `paymentType` tinyint(1) DEFAULT '1',
  `paymentName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PaymentMethods`
--

LOCK TABLES `PaymentMethods` WRITE;
/*!40000 ALTER TABLE `PaymentMethods` DISABLE KEYS */;
INSERT INTO `PaymentMethods` VALUES (1,'PayPal','3–4 hours','PayPal withdrawal fees','USD','Connect your existing PayPal account.',1,'2017-04-18 20:13:25','2017-04-18 20:13:25',1,'PayPal');
/*!40000 ALTER TABLE `PaymentMethods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Payout`
--

DROP TABLE IF EXISTS `Payout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Payout` (
  `id` int NOT NULL AUTO_INCREMENT,
  `methodId` int NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payEmail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `address1` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `address2` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `zipcode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `default` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `last4Digits` int DEFAULT NULL,
  `isVerified` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `Payout_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payout`
--

LOCK TABLES `Payout` WRITE;
/*!40000 ALTER TABLE `Payout` DISABLE KEYS */;
/*!40000 ALTER TABLE `Payout` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PopularLocation`
--

DROP TABLE IF EXISTS `PopularLocation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PopularLocation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `locationAddress` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PopularLocation`
--

LOCK TABLES `PopularLocation` WRITE;
/*!40000 ALTER TABLE `PopularLocation` DISABLE KEYS */;
INSERT INTO `PopularLocation` VALUES (1,'Greater London','198 Gambler Lane, Clarksburg, WV, USA','640cfab675d449a1187ffe26c17f3161.jpeg',1,'2019-03-27 10:17:45','2019-07-04 10:49:43'),(2,'Oristano','Oristano Stazione F.s., Oristano, Province of Oristano, Italy','9b1373af96b5dff40edd6bd9e7735cdb.jpeg',1,'2019-03-27 10:20:32','2019-07-04 10:53:02'),(3,'Basse-Normandie','Basse Normandie, Rue Verte, Hérouville-Saint-Clair, France','76c7707dbec00ac80e22b07cde982e33.jpeg',1,'2019-03-27 10:27:32','2019-07-04 10:57:37'),(4,'Fergus Falls','328 East Fir Avenue, Atwater, CA, USA','67416a5277d6d7b21236794d9548f04c.jpeg',1,'2019-03-27 10:28:56','2019-07-04 10:59:06'),(5,'SHIELS','76 Russell Rd, Nottingham, UK','13f96d1479f69394ae3947663a5b2746.jpeg',1,'2019-03-27 10:30:17','2019-07-04 11:00:44'),(7,'Cambridge','763 Massachusetts Avenue, Cambridge, MA 02420, U.S.','584540d3bc9408b86bc0507d668bd411.jpeg',1,'2019-07-04 11:03:21','2019-07-04 11:03:21'),(9,'Cambodia','no. 15 St 420, Phnom Penh, Cambodia','01310e90580242aaa6b1de8029d27d54.jpeg',1,'2019-07-04 11:17:30','2019-07-04 11:17:30'),(10,'Blue Lagoon, Ölüdeniz, Turkey','Laleli, Mimar Kemalettin Mahallesi, Fatih/Istanbul, Turkey','cb9a75cdf4f5f82eaae80d801e52b674.jpeg',1,'2019-07-04 11:18:38','2019-07-04 11:18:38'),(11,'Seychelles','Anse Source d\'Argent, La Digue, Seychelles','9f74354f93356bf6a3955804fd95020f.jpeg',1,'2019-07-04 11:19:11','2019-07-04 11:19:11'),(12,'New York','NYC, NY, USA','e6b011cfb2eaa59eb00278ebc066c4ee.jpeg',1,'2019-07-04 11:20:15','2019-07-04 11:20:15'),(13,'Paris','Paris-Charles de Gaulle Airport (CDG), Roissy-en-France, France','44931b9e30b46e51d1aa2bcb09f8b906.jpeg',1,'2019-07-04 11:20:48','2019-07-04 15:30:26'),(14,'Bradford','261 Southfield Lane, Bradford BD7 3NN, UK','1ce7239bb959bf72d651019eda3a8a2c.jpeg',1,'2019-07-04 11:21:19','2019-07-04 11:21:19');
/*!40000 ALTER TABLE `PopularLocation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Recommend`
--

DROP TABLE IF EXISTS `Recommend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Recommend` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Recommend`
--

LOCK TABLES `Recommend` WRITE;
/*!40000 ALTER TABLE `Recommend` DISABLE KEYS */;
INSERT INTO `Recommend` VALUES (1,7,'2019-03-27 10:32:50','2019-03-27 10:32:50'),(2,6,'2019-03-27 10:32:51','2019-03-27 10:32:51'),(3,5,'2019-03-27 10:32:52','2019-03-27 10:32:52'),(4,4,'2019-03-27 10:32:53','2019-03-27 10:32:53'),(5,3,'2019-03-27 10:32:54','2019-03-27 10:32:54'),(6,2,'2019-03-27 10:32:55','2019-03-27 10:32:55'),(7,1,'2019-03-27 10:32:56','2019-03-27 10:32:56');
/*!40000 ALTER TABLE `Recommend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ReportType`
--

DROP TABLE IF EXISTS `ReportType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ReportType` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reportType` varchar(255) NOT NULL,
  `reportContent` varchar(255) NOT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ReportType`
--

LOCK TABLES `ReportType` WRITE;
/*!40000 ALTER TABLE `ReportType` DISABLE KEYS */;
/*!40000 ALTER TABLE `ReportType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ReportUser`
--

DROP TABLE IF EXISTS `ReportUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ReportUser` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reporterId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `reportType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ReportUser`
--

LOCK TABLES `ReportUser` WRITE;
/*!40000 ALTER TABLE `ReportUser` DISABLE KEYS */;
/*!40000 ALTER TABLE `ReportUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reservation`
--

DROP TABLE IF EXISTS `Reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Reservation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `hostId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `guestId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `checkIn` date NOT NULL,
  `checkOut` date NOT NULL,
  `guests` int DEFAULT '1',
  `message` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `basePrice` float NOT NULL,
  `cleaningPrice` float DEFAULT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount` float DEFAULT NULL,
  `discountType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `guestServiceFee` float DEFAULT NULL,
  `hostServiceFee` float DEFAULT NULL,
  `total` float(9,2) DEFAULT NULL,
  `confirmationCode` int DEFAULT NULL,
  `paymentState` enum('pending','completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `payoutId` int DEFAULT NULL,
  `reservationState` enum('pending','approved','declined','completed','cancelled','expired') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `paymentMethodId` tinyint(1) DEFAULT NULL,
  `cancellationPolicy` int DEFAULT NULL,
  `isSpecialPriceAverage` float DEFAULT NULL,
  `dayDifference` float DEFAULT NULL,
  `paymentIntentId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxRate` float DEFAULT '0',
  `isHold` tinyint(1) NOT NULL DEFAULT '0',
  `paymentAttempt` int NOT NULL DEFAULT '0',
  `checkInStart` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `checkInEnd` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `bookingType` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hostServiceFeeType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `hostServiceFeeValue` float NOT NULL,
  `threadId` int DEFAULT NULL,
  `taxPrice` float DEFAULT '0',
  `listTitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reservation`
--

LOCK TABLES `Reservation` WRITE;
/*!40000 ALTER TABLE `Reservation` DISABLE KEYS */;
/*!40000 ALTER TABLE `Reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ReservationSpecialPricing`
--

DROP TABLE IF EXISTS `ReservationSpecialPricing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ReservationSpecialPricing` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int DEFAULT NULL,
  `reservationId` int DEFAULT NULL,
  `blockedDates` date NOT NULL,
  `isSpecialPrice` float DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ReservationSpecialPricing`
--

LOCK TABLES `ReservationSpecialPricing` WRITE;
/*!40000 ALTER TABLE `ReservationSpecialPricing` DISABLE KEYS */;
/*!40000 ALTER TABLE `ReservationSpecialPricing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reviews`
--

DROP TABLE IF EXISTS `Reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservationId` int NOT NULL,
  `listId` int NOT NULL,
  `authorId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `reviewContent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `rating` float NOT NULL,
  `privateFeedback` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `parentId` int DEFAULT '0',
  `automated` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  `isAdminEnable` int DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `reservationId` (`reservationId`),
  KEY `userId` (`userId`),
  CONSTRAINT `Reviews_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reviews`
--

LOCK TABLES `Reviews` WRITE;
/*!40000 ALTER TABLE `Reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `Reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SearchSettings`
--

DROP TABLE IF EXISTS `SearchSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SearchSettings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `minPrice` float NOT NULL,
  `maxPrice` float NOT NULL,
  `PriceRangecurrency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SearchSettings`
--

LOCK TABLES `SearchSettings` WRITE;
/*!40000 ALTER TABLE `SearchSettings` DISABLE KEYS */;
INSERT INTO `SearchSettings` VALUES (1,10,10000,'USD','2019-03-27 11:53:47','2018-05-02 04:53:20');
/*!40000 ALTER TABLE `SearchSettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `SequelizeMeta_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20180804061511-addUserBanStatus.js'),('20180804062523-addIsReadColumnInThreads.js'),('20180809095644-createBedTypeTable.js'),('20180919114144-addBanUserDefault.js'),('20180924105437-updateUserLoginTable.js'),('20180924130941-addNewUserLoginTable.js'),('20180929101729-updateNulledBanUserStatus.js'),('20180929110523-addColumnsForSmsVerification.js'),('20180929112313-updateCountyListWithDialCodes.js'),('20190105123130-addHomePageTypeSiteSettings.js'),('20190202071052-addIsListActiveField.js'),('20190202103305-updatePaymentMethods.js'),('20190206111430-createReportUser.js'),('20190223073145-addIsDeleteAtField.js'),('20190225042333-addReviewsCountInListing.js'),('20190322050510-addSiteSettingsField.js'),('20190325035946-addListBlockedDates.js'),('20190429092459-addColumNewThread.js'),('20190430110742-changeListingDataCloum.js'),('20190503052141-addColumnItemDescriptionListSettingsTable.js'),('20190513044345-addMetaFields.js'),('20190513070310-insertStaticpage.js'),('20190514121558-addCancellationPolicyReservation.js'),('20190525050311-changeDataTypeForItemDescription.js'),('20190527125405-addIsAdminEnableReviews.js'),('20190531062204-addReservationSpecialPricing.js'),('20190603083234-modifyBlogAndStaticPage.js'),('20190603102231-deleteInboxItem.js'),('20190604051522-addReservationFields.js'),('20190614110520-addPhoneStatus.js'),('20190615092318-addCountryNameInUserProfile.js'),('20190622051622-changeColumnLocationUserProfile.js'),('20190701041011-changeColumnTypeInSiteSettingsValue.js'),('20190712094239-deleteCoverPhotoRecordsFromListingTable.js'),('20190824052016-addHomePageLogoSiteSettings.js'),('20190827080301-addHomeBannerImage.js'),('20190828122142-addEmailPageLogoSiteSettings.js'),('20190830111259-addHomeLogoHeightSettings.js'),('20190902042250-addStaticBlockInfo.js'),('20190903093907-addStatusFieldInBlock.js'),('20190910043026-addPaymentIntentIdInReservation.js'),('20191008110026-testMigration.js'),('20191020041756-addUserListing.js'),('20191108043353-updateSteps.js'),('20200110151340-addRoleIdToAdminUser.js'),('20200217052735-addIsVerifiedToPayoutTable.js'),('20200225061630-addIsVerifiedToPayoutTable.js'),('20200323101255-addAppAvailableStatus.js'),('20200323102340-addPlayStoreUrl.js'),('20200323102456-addAppStoreUrl.js'),('20200324122956-contactPageManage.js'),('20200325110911-addWhyHostInfoBlocks.js'),('20200326043522-addHelpStaticPageManage.js'),('20200413120822-changeColumnValueAtWhyHostInfoBlock.js'),('20200413133533-changeColumnValueWhyHostInfoBlock.js'),('20200609101516-addTaxRateinListing.js'),('20200609104246-addColumnInReservation.js'),('20200702125214-addNewColumnsInReservation.js'),('20200706135325-changeDialCodeForCyprus.js'),('20200707112614-updateCancellationContent.js'),('20200716101918-addNewColumnsInReservation.js'),('20200717064917-addBookingTypeColumninReservation.js'),('20200720134623-addBookingTypeColumnInReservation.js'),('20200721095812-AddServiceFeeInReservation.js'),('20200721095829-AddNonRefundableNightInCancellation.js'),('20200722081721-changeDefaultValueinCancellation.js'),('20200727121337-changeColumnvalueInReservation.js'),('20200826050109-addCookiePolicyStaticContent.js'),('20201015082101-addListSettingsImage.js'),('20201015114723-addSideMenuContent.js'),('20210107121042-updateProcessedInPaymentMethod.js'),('20210111061758-changeDateTypeToDateOnlyType.js'),('20210422134359-addApprovalListing.js'),('20210423130614-addApproveListingSiteAdmin.js'),('20210508123922-addDefaultFaviconImageInSiteSetttingTable.js'),('20210608121826-approvalChanges.js'),('20210720102227-updateCancellationTable.js'),('20211004131331-removeDefaultValueCountry.js'),('20220112083027-addPaymentName.js'),('20220112083245-addPaymentNameTable.js'),('20220331095750-userBanSTatus.js'),('20220517061053-addConfigSiteSettings.js'),('20220630053428-deleteUser.js'),('20220701064444-otpupdated.js'),('20220816052452-addHostingBlockImage.js'),('20220816071420-becomeHostBanner.js'),('20220824103654-lastUpdatedAt.js'),('20220824104922-lastUpdatedAtTime.js'),('20220909122316-priceField.js'),('20220925071050-policyContetn.js'),('20220926153825-addForceUpdate.js'),('20221114061101-dayStatusListBlockedDates.js'),('20221226104506-addTheme.js'),('20221226112603-addThreadItemType.js'),('20230206050500-addAssetsjson.js'),('20230424051710-addSiteKey.js'),('20230516134259-userVerififedInfo.js'),('20230627124444-aadminPrivileges.js'),('20230705094825-reservationIdColumn.js'),('20230715073617-fcmPushNotificationKey.js'),('20230728104421-ThreadTypesEnumDataType.js'),('20230728110424-addStatus.js'),('20230803122453-specialPriceMigration.js'),('20230807064409-defaultvaluechanges.js'),('20230921072742-addColunmTaxInListingData.js'),('20230921113100-addColunmTaxPriceInReservationTable.js'),('20231108103654-addColunmIsTaxRefundedInCancellationDetails.js'),('20231128091813-addReservationListTitle.js'),('20231208092140-updatePaymentMethodsName.js'),('20240224050543-addogimageinsitesettings.js'),('20240402103630-changeBannerSettingsContentDatatype.js'),('20240402111036-changeImageBannerDescriptionDatatype.js'),('20240530102407-removeUnusedPaymentSettingsTable.js'),('20240530112126-removeUnusedUserClaimTable.js'),('20240531091254-removeUnusedValuesinSiteSettingsAndWhyHostInfoBlock.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ServiceFees`
--

DROP TABLE IF EXISTS `ServiceFees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ServiceFees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `guestType` enum('fixed','percentage') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `guestValue` float NOT NULL,
  `hostType` enum('fixed','percentage') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `hostValue` float NOT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ServiceFees`
--

LOCK TABLES `ServiceFees` WRITE;
/*!40000 ALTER TABLE `ServiceFees` DISABLE KEYS */;
INSERT INTO `ServiceFees` VALUES (1,'percentage',3,'percentage',9,'USD','2018-05-26 06:43:13','2018-05-26 06:43:13');
/*!40000 ALTER TABLE `ServiceFees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SideMenu`
--

DROP TABLE IF EXISTS `SideMenu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SideMenu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `step` int DEFAULT NULL,
  `page` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isEnable` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SideMenu`
--

LOCK TABLES `SideMenu` WRITE;
/*!40000 ALTER TABLE `SideMenu` DISABLE KEYS */;
INSERT INTO `SideMenu` VALUES (1,'Flexible','Cancel up to 1 day prior to arrival and get a 100% refund.','block1',NULL,NULL,1,'2021-02-03 13:14:58','2021-02-03 13:14:58'),(2,'Moderate','Cancel up to 5 days prior to arrival and get a 50% refund.','block2',NULL,NULL,1,'2021-02-03 13:14:58','2021-02-03 13:14:58'),(3,'Strict','Cancel up to 7 days prior to arrival and get a 50% refund.','block3',NULL,NULL,1,'2021-02-03 13:14:58','2021-02-03 13:14:58');
/*!40000 ALTER TABLE `SideMenu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SiteSettings`
--

DROP TABLE IF EXISTS `SiteSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SiteSettings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SiteSettings`
--

LOCK TABLES `SiteSettings` WRITE;
/*!40000 ALTER TABLE `SiteSettings` DISABLE KEYS */;
INSERT INTO `SiteSettings` VALUES (1,'Site Name','siteName','Your Site','site_settings','2019-03-27 11:53:47','2024-06-24 11:27:09'),(2,'Site Title','siteTitle','Your Site Title','site_settings','2019-03-27 11:53:47','2024-06-24 11:27:09'),(3,'Meta Keyword','metaKeyword','Your Site Meta Keyword','site_settings','2019-03-27 11:53:47','2024-06-24 11:27:09'),(4,'Meta Discription','metaDescription','Your Site Meta Description','site_settings','2019-03-27 11:53:47','2024-06-24 11:27:09'),(10,'Facebook Link','facebookLink','https://www.facebook.com/radicalstartnow/','site_settings','2019-03-27 11:53:47','2024-06-24 11:27:09'),(11,'Twitter Link','twitterLink','https://twitter.com/radicalstartnow','site_settings','2019-03-27 11:53:47','2024-06-24 11:27:09'),(12,'Instagram Link','instagramLink','https://www.instagram.com/?hl=en','site_settings','2019-03-27 11:53:47','2024-06-24 11:27:09'),(66,'Home Page Banner Layout','homePageType','5','site_settings','2019-03-27 11:53:47','2024-06-24 11:27:09'),(68,'Phone Number Status','phoneNumberStatus','1','site_settings','2019-07-04 06:47:57','2024-06-24 11:27:09'),(74,'Logo','Logo','99ac17183073e38c787a71192f587608.png','site_settings','2019-09-06 06:44:40','2024-06-24 11:27:09'),(75,'Home Page Logo','homeLogo','337f4052d0be7376ff4e820956be1c57.png','site_settings','2019-09-06 06:45:00','2024-06-24 11:27:09'),(76,'Email Logo','emailLogo','88e8e1f411957f4ed28370d7eeb68774.png','site_settings','2019-09-06 06:45:13','2024-06-24 11:27:09'),(77,'App Available Status','appAvailableStatus','1','site_settings','2020-04-13 11:33:08','2024-06-24 11:27:09'),(78,'PlayStore URL','playStoreUrl','https://play.google.com/store','site_settings','2020-04-13 11:33:08','2024-06-24 11:27:09'),(79,'AppStore URL','appStoreUrl','https://www.apple.com/ios/app-store/','site_settings','2020-04-13 11:33:09','2024-06-24 11:27:09'),(80,'email','email','support@yourwebsite.com','site_settings','2020-04-13 11:33:09','2024-06-24 11:27:09'),(81,'Phone Number','phoneNumber','+0 000 0000','site_settings','2020-04-13 11:33:09','2024-06-24 11:27:09'),(82,'Address','address','Your Location, Country','site_settings','2020-04-13 11:33:09','2024-06-24 11:27:09'),(84,'Listing Approval','listingApproval','0','site_settings','2021-10-27 16:42:07','2024-06-24 11:27:09'),(85,'Favicon Logo','faviconLogo','a9edf7c563e190991557f67d805aa716.png','site_settings','2021-10-27 16:42:07','2024-08-20 12:34:13'),(86,'Max Upload Size','maxUploadSize','50','config_settings','2022-11-03 09:57:34','2024-01-03 05:15:42'),(87,'PushNotification Key','pushNotificationKey','AAAAK5aHG3c:APA91bG60ridFhKm7c4uAR-y_zON1wfhHpcgQWmbsU9byWDBky-7h-EEyulelmQq3CyQMOTuR347cmuXgxHruPKuU5THav1-UB440V5mRVbbfzLFZm34CB2APfDApkY7FagkrkZz796Q','config_settings','2022-11-03 09:57:34','2023-05-11 09:44:14'),(88,'Deep Link Bundle Id','deepLinkBundleId','Your Deep link bundle ID','config_settings','2022-11-03 09:57:34','2024-01-03 05:15:42'),(89,'Smtp Host','smtpHost','Your SMPT host','config_settings','2022-11-03 09:57:34','2024-01-03 05:15:42'),(90,'Smtp Port','smtpPort','Your SMPT port','config_settings','2022-11-03 09:57:34','2024-01-03 05:15:42'),(91,'Smpt Email','smptEmail','Your SMPT email','config_settings','2022-11-03 09:57:34','2024-01-03 05:15:42'),(92,'Smtp Sender','smtpSender','Your SMPTsender','config_settings','2022-11-03 09:57:34','2024-01-03 05:15:42'),(93,'Smtp Sender Email','smtpSenderEmail','yourSMPT@gmail.com','config_settings','2022-11-03 09:57:34','2024-01-03 05:15:42'),(94,'Smtp PassWord','smtpPassWord','Your SMPT passwork','config_settings','2022-11-03 09:57:34','2024-01-03 05:15:42'),(95,'Twillio AccountSid','twillioAccountSid','ACcd400137b32ab6a7243cc324929c51fd','config_settings','2022-11-03 09:57:34','2024-01-03 05:15:42'),(96,'Twillio AuthToken','twillioAuthToken','599880fe92a1e012e74b7f1ceb036fe0','config_settings','2022-11-03 09:57:34','2024-01-03 05:15:42'),(97,'Twillio Phonenumber','twillioPhone','+15103984916','config_settings','2022-11-03 09:57:34','2024-01-03 05:15:42'),(99,'PayPal ClientId','paypalClientId','Abax6FHO5FW8ausREpc182FX6Jwgq7ICYyUF6IBf_Pfi8-40CIXHMZL4l2TkMrVUznVG_2Q8yQLUb860','config_settings','2022-11-03 09:57:34','2024-01-03 05:15:42'),(100,'PayPal Secret','paypalSecret','EG6BrUaD-nArhcjJT3CDzCPeM-ENANATVbsXvTC-y-CMIVCccjP0ehkIX6Q5Vh9wC2HRInzxRsPfyFQZ','config_settings','2022-11-03 09:57:34','2024-01-03 05:15:42'),(101,'PayPal Host','paypalHost','https://api-m.sandbox.paypal.com','config_settings','2022-11-03 09:57:34','2024-01-03 05:15:42'),(103,'Cancellation Information','cancellationInfo','RentALL allows hosts to choose among three standardized cancellation policies (Flexible, Moderate, and Strict) Will be enforced to protect both guest and host alike. Each listing and reservation on our site will clearly state the cancellation policy. Guests while viewing their travel plans are able to review any penalties and also cancel by clicking ‘Cancel’ on the respective reservation. A host will be able to see the number of reservations a guest has Cancelled Over the past 12 months when the guest submits Booking request.','site_settings','2022-11-03 09:57:35','2024-06-24 11:27:09'),(104,'Android Version','androidVersion',NULL,'appSettings','2022-11-03 09:57:35','2024-06-24 11:27:09'),(105,'Force Update','appForceUpdate','false','appSettings','2022-11-03 09:57:35','2024-06-24 11:27:09'),(106,'iOS Version','iosVersion',NULL,'appSettings','2022-11-03 09:57:35','2024-06-24 11:27:09'),(107,'Facebook App ID','facebookAppId','Your facebook app ID','config_settings','2023-02-14 06:59:00','2024-01-03 05:15:42'),(108,'Facebook Secret ID','facebookSecretId','Your facebook app secret key','config_settings','2023-02-14 06:59:00','2024-01-03 05:15:42'),(109,'Google CLient ID','googleClientId','Your google app client ID','config_settings','2023-02-14 06:59:00','2024-01-03 05:15:42'),(110,'Google Client Secret ID','googleSecretId','Your google app client secret key','config_settings','2023-02-14 06:59:00','2024-01-03 05:15:42'),(111,'Deep link JSON content','deepLinkContent','Your deep link JSON content','config_settings','2023-02-14 06:59:00','2024-01-03 05:15:42'),(112,'Platform secret key','platformSecretKey','JjQI:gHf+^=D','secret_settings','2023-05-11 09:31:27','2023-05-11 09:31:27'),(113,'Fcm PushNotification Key','fcmPushNotificationKey','Your FCM push notification key','config_settings','2023-09-14 11:38:42','2024-01-03 05:15:42'),(114,'OG Image','ogImage','d714adef77bc3aa49f265dfa9db6ab19.png','site_settings','2024-06-17 07:00:08','2024-06-24 11:27:09');
/*!40000 ALTER TABLE `SiteSettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `StaticInfoBlock`
--

DROP TABLE IF EXISTS `StaticInfoBlock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `StaticInfoBlock` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isEnable` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `StaticInfoBlock`
--

LOCK TABLES `StaticInfoBlock` WRITE;
/*!40000 ALTER TABLE `StaticInfoBlock` DISABLE KEYS */;
INSERT INTO `StaticInfoBlock` VALUES (1,'Rent amazing homes for your trip','Homes with high standards and better facilities',NULL,'header',1,'2019-09-06 06:41:03','2022-11-03 11:14:01'),(2,'Enjoy your trip!','Rent the home that\'s suitable for you & your family and enjoy your trip!','65106923e38ded649d01467cfbdb72bb.png','block1',1,'2019-09-06 06:41:03','2022-11-03 11:14:01'),(3,'Trusted community!','Our community is completely driven by trust and your family safety is assured','22154b95a0741b5a2201f7937fe82791.png','block2',1,'2019-09-06 06:41:03','2022-11-03 11:14:01');
/*!40000 ALTER TABLE `StaticInfoBlock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `StaticPage`
--

DROP TABLE IF EXISTS `StaticPage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `StaticPage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pageName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `metaTitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `metaDescription` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `StaticPage`
--

LOCK TABLES `StaticPage` WRITE;
/*!40000 ALTER TABLE `StaticPage` DISABLE KEYS */;
INSERT INTO `StaticPage` VALUES (1,'About Us','<h2><strong>What is Lorem Ipsum?</strong></h2><p><br></p><p>Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>','About Us','About Us','2019-07-12 07:58:42','2022-07-07 09:50:23'),(2,'Trust & Safety','<p>Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. guns,</p>','Trust & Safety','Trust & Safety','2019-07-12 07:58:42','2022-07-07 09:50:45'),(3,'Travel Credit','<p>Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>','Travel Credit','Travel Credit','2019-07-12 07:58:42','2022-07-07 09:51:16'),(4,'Terms & Privacy','<p>This Privacy Policy describes how your personal information is collected, used, and shared when you use our SITENAME application.</p><p><br></p><p>This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.</p><p><br></p><p>If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.</p><p><br></p><p>Information Collection and Use</p><p><br></p><p>For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information, including email address, profile picture and first name. The information that we request will be retained by us and used as described in this privacy policy.</p><p><br></p><p>This app collects the user’s identifiable information such as email address, first name and profile picture from the third party social websites when the user tries to register an account with third party social websites such as “Google” and “Facebook”.</p><p><br></p><p>We don\'t share your information with any third-party services.</p><p><br></p><p>We are collecting this information to operate, maintain, and provide to you the features and functionality of the service, as well as to communicate directly with you, such as to send you email messages.</p><p><br></p><p>The categories with respect to our business purposes for using information include:</p><p><br></p><p>1. Operate and manage our Service, including your registration and account.</p><p>2. Perform services requested by you, such as respond to your comments, questions, and requests, and provide customer service.</p><p>3. Sending you technical notices, updates, security alerts, information regarding changes to our policies, and support and administrative messages.</p><p>4. Preventing and addressing fraud, breach of policies or terms, and threats or harm.</p><p>5. Monitoring and analyzing trends, usage, and activities.</p><p>6. Conducting research, including focus groups and surveys.</p><h1><br></h1><h1><strong>Your Rights and Choices of your information:(Data Deletion Instructions)</strong></h1><p><br></p><p>You have rights and choices with respect to information that relates to you and you can contact “YOUR EMAIL” to disable or remove your information from the platform that is related to you and our team will support you within 5 to 7 business days.</p><p>&nbsp;</p><p>Log Data</p><p><br></p><p>We want to inform you that whenever you use our Service, in case of an error in the app we collect data and information (through third-party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.</p><p><br></p><p>Cookies</p><p><br></p><p>Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device\'s internal memory.</p><p>This Service does not use these “cookies” explicitly. However, the app may use a third party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.</p><p><br></p><p>Security</p><p><br></p><p>We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.</p><p><br></p><p>Changes to This Privacy Policy</p><p><br></p><p>We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page.</p><p>&nbsp;</p><p>Contact Us</p><p><br></p><p>If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at YOUR EMAIL.</p>','Terms & Privacy','Terms & Privacy','2019-07-12 07:58:42','2022-07-07 09:55:55'),(5,'Help','<p>Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>','Help','Help page description','2020-04-13 11:33:10','2022-07-07 09:56:28'),(6,'Cookie Policy','<p>Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>','Cookie Policy','Cookie Policy','2021-02-03 13:01:43','2022-07-07 09:56:13');
/*!40000 ALTER TABLE `StaticPage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ThreadItems`
--

DROP TABLE IF EXISTS `ThreadItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ThreadItems` (
  `id` int NOT NULL AUTO_INCREMENT,
  `threadId` int NOT NULL,
  `sentBy` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `isRead` tinyint(1) DEFAULT NULL,
  `type` enum('message','inquiry','preApproved','declined','approved','pending','cancelledByHost','cancelledByGuest','intantBooking','requestToBook','confirmed','expired','completed','instantBooking') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `personCapacity` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `reservationId` int DEFAULT NULL,
  `status` enum('inquiry','preApproved','booked') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `threadId` (`threadId`),
  CONSTRAINT `ThreadItems_ibfk_1` FOREIGN KEY (`threadId`) REFERENCES `Threads` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ThreadItems`
--

LOCK TABLES `ThreadItems` WRITE;
/*!40000 ALTER TABLE `ThreadItems` DISABLE KEYS */;
/*!40000 ALTER TABLE `ThreadItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Threads`
--

DROP TABLE IF EXISTS `Threads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Threads` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `host` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `guest` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isRead` tinyint(1) DEFAULT NULL,
  `messageUpdatedDate` datetime DEFAULT NULL,
  `reservationId` int DEFAULT NULL,
  `checkIn` date DEFAULT NULL,
  `checkOut` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `Threads_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Threads`
--

LOCK TABLES `Threads` WRITE;
/*!40000 ALTER TABLE `Threads` DISABLE KEYS */;
/*!40000 ALTER TABLE `Threads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Transaction`
--

DROP TABLE IF EXISTS `Transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Transaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservationId` int NOT NULL,
  `payerEmail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payerId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `receiverEmail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `receiverId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `transactionId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `total` float NOT NULL,
  `transactionFee` float DEFAULT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ipn_track_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentType` enum('booking','cancellation','host') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'booking',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `paymentMethodId` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `reservationId` (`reservationId`),
  CONSTRAINT `Transaction_ibfk_1` FOREIGN KEY (`reservationId`) REFERENCES `Reservation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Transaction`
--

LOCK TABLES `Transaction` WRITE;
/*!40000 ALTER TABLE `Transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `Transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TransactionHistory`
--

DROP TABLE IF EXISTS `TransactionHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TransactionHistory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservationId` int NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payoutId` int NOT NULL,
  `payoutEmail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` float NOT NULL,
  `fees` float DEFAULT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `transactionId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentMethodId` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reservationId` (`reservationId`),
  CONSTRAINT `TransactionHistory_ibfk_1` FOREIGN KEY (`reservationId`) REFERENCES `Reservation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TransactionHistory`
--

LOCK TABLES `TransactionHistory` WRITE;
/*!40000 ALTER TABLE `TransactionHistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `TransactionHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `emailConfirmed` tinyint(1) DEFAULT '0',
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userBanStatus` tinyint(1) DEFAULT '0',
  `userDeletedAt` datetime DEFAULT NULL,
  `userDeletedBy` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('977bc550-5069-11e9-a14e-635e0fd3bfa6','qa@radicalstart.com','$2a$08$lqcmo6OgjVbcioD1uDAlueCdu6JYBwZe2xaoc1dEparRYKDjFrv9y',1,'email','2019-03-27 08:23:25','2019-03-27 08:23:25',0,NULL,NULL),('d1d6d5a0-5064-11e9-a14e-635e0fd3bfa6','demo@radicalstart.com','$2a$08$jkiXGz2lM41L47LdWFTBZuLhwT3dTLDK3Nmhjx6PrRydp0DEEb9gG',1,'email','2019-03-27 07:49:15','2019-03-27 07:49:15',0,NULL,NULL);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserAmenities`
--

DROP TABLE IF EXISTS `UserAmenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserAmenities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `amenitiesId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `UserAmenities_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserAmenities`
--

LOCK TABLES `UserAmenities` WRITE;
/*!40000 ALTER TABLE `UserAmenities` DISABLE KEYS */;
INSERT INTO `UserAmenities` VALUES (1,1,26,'2019-03-27 09:46:00','2019-03-27 09:46:00'),(2,1,25,'2019-03-27 09:46:00','2019-03-27 09:46:00'),(3,1,27,'2019-03-27 09:46:00','2019-03-27 09:46:00'),(4,1,73,'2019-03-27 09:46:00','2019-03-27 09:46:00'),(5,1,118,'2019-03-27 09:46:00','2019-03-27 09:46:00'),(21,7,27,'2019-03-27 10:09:33','2019-03-27 10:09:33'),(22,7,73,'2019-03-27 10:09:33','2019-03-27 10:09:33'),(23,7,25,'2019-03-27 10:09:33','2019-03-27 10:09:33'),(24,7,118,'2019-03-27 10:09:33','2019-03-27 10:09:33'),(28,6,27,'2019-07-04 10:52:39','2019-07-04 10:52:39'),(29,6,25,'2019-07-04 10:52:39','2019-07-04 10:52:39'),(30,6,118,'2019-07-04 10:52:39','2019-07-04 10:52:39'),(31,5,25,'2019-07-04 10:57:09','2019-07-04 10:57:09'),(32,5,73,'2019-07-04 10:57:09','2019-07-04 10:57:09'),(33,5,28,'2019-07-04 10:57:09','2019-07-04 10:57:09'),(37,3,26,'2019-07-04 11:00:34','2019-07-04 11:00:34'),(38,3,27,'2019-07-04 11:00:34','2019-07-04 11:00:34'),(39,3,73,'2019-07-04 11:00:34','2019-07-04 11:00:34'),(40,2,25,'2019-07-04 11:02:18','2019-07-04 11:02:18'),(41,2,119,'2019-07-04 11:02:18','2019-07-04 11:02:18'),(42,2,73,'2019-07-04 11:02:18','2019-07-04 11:02:18'),(57,8,26,'2020-04-13 13:10:32','2020-04-13 13:10:32'),(58,8,25,'2020-04-13 13:10:32','2020-04-13 13:10:32'),(59,8,27,'2020-04-13 13:10:32','2020-04-13 13:10:32'),(60,8,73,'2020-04-13 13:10:32','2020-04-13 13:10:32'),(61,8,119,'2020-04-13 13:10:32','2020-04-13 13:10:32'),(62,8,118,'2020-04-13 13:10:32','2020-04-13 13:10:32'),(63,8,28,'2020-04-13 13:10:32','2020-04-13 13:10:32'),(64,4,27,'2020-08-10 07:12:12','2020-08-10 07:12:12'),(65,4,25,'2020-08-10 07:12:12','2020-08-10 07:12:12'),(66,4,73,'2020-08-10 07:12:12','2020-08-10 07:12:12'),(67,4,28,'2020-08-10 07:12:12','2020-08-10 07:12:12'),(68,4,118,'2020-08-10 07:12:12','2020-08-10 07:12:12'),(69,4,26,'2020-08-10 07:12:12','2020-08-10 07:12:12'),(70,4,119,'2020-08-10 07:12:12','2020-08-10 07:12:12');
/*!40000 ALTER TABLE `UserAmenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserHouseRules`
--

DROP TABLE IF EXISTS `UserHouseRules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserHouseRules` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `houseRulesId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  KEY `houseRulesId` (`houseRulesId`),
  CONSTRAINT `UserHouseRules_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserHouseRules_ibfk_2` FOREIGN KEY (`houseRulesId`) REFERENCES `ListSettings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserHouseRules`
--

LOCK TABLES `UserHouseRules` WRITE;
/*!40000 ALTER TABLE `UserHouseRules` DISABLE KEYS */;
INSERT INTO `UserHouseRules` VALUES (1,1,'2019-03-27 09:49:54','2019-03-27 09:49:54',48),(2,1,'2019-03-27 09:49:54','2019-03-27 09:49:54',50),(3,1,'2019-03-27 09:49:54','2019-03-27 09:49:54',51),(4,2,'2019-03-27 09:52:48','2019-03-27 09:52:48',50),(5,2,'2019-03-27 09:52:48','2019-03-27 09:52:48',52),(6,3,'2019-03-27 09:55:45','2019-03-27 09:55:45',50),(7,3,'2019-03-27 09:55:45','2019-03-27 09:55:45',52),(11,5,'2019-03-27 10:05:46','2019-03-27 10:05:46',51),(12,5,'2019-03-27 10:05:46','2019-03-27 10:05:46',50),(13,5,'2019-03-27 10:05:46','2019-03-27 10:05:46',52),(17,6,'2019-03-27 10:08:28','2019-03-27 10:08:28',50),(18,6,'2019-03-27 10:08:28','2019-03-27 10:08:28',51),(19,6,'2019-03-27 10:08:28','2019-03-27 10:08:28',49),(25,7,'2019-11-13 11:56:53','2019-11-13 11:56:53',50),(26,8,'2020-01-23 05:53:23','2020-01-23 05:53:23',48),(27,8,'2020-01-23 05:53:23','2020-01-23 05:53:23',50),(28,8,'2020-01-23 05:53:23','2020-01-23 05:53:23',52),(29,8,'2020-01-23 05:53:23','2020-01-23 05:53:23',49),(30,8,'2020-01-23 05:53:23','2020-01-23 05:53:23',51),(40,4,'2023-02-14 07:06:26','2023-02-14 07:06:26',52),(41,4,'2023-02-14 07:06:26','2023-02-14 07:06:26',49),(42,4,'2023-02-14 07:06:26','2023-02-14 07:06:26',50);
/*!40000 ALTER TABLE `UserHouseRules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserListingData`
--

DROP TABLE IF EXISTS `UserListingData`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserListingData` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `settingsId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `UserListingData_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserListingData`
--

LOCK TABLES `UserListingData` WRITE;
/*!40000 ALTER TABLE `UserListingData` DISABLE KEYS */;
INSERT INTO `UserListingData` VALUES (6,1,77,'2019-03-27 09:46:00','2019-03-27 09:46:00'),(7,1,5,'2019-03-27 09:46:00','2019-03-27 09:46:00'),(8,1,10,'2019-03-27 09:46:00','2019-03-27 09:46:00'),(9,1,16,'2019-03-27 09:46:00','2019-03-27 09:46:00'),(10,1,22,'2019-03-27 09:46:00','2019-03-27 09:46:00'),(66,7,77,'2019-03-27 10:09:32','2019-03-27 10:09:32'),(67,7,5,'2019-03-27 10:09:32','2019-03-27 10:09:32'),(68,7,11,'2019-03-27 10:09:32','2019-03-27 10:09:32'),(69,7,16,'2019-03-27 10:09:32','2019-03-27 10:09:32'),(70,7,22,'2019-03-27 10:09:32','2019-03-27 10:09:32'),(76,6,76,'2019-07-04 10:52:39','2019-07-04 10:52:39'),(77,6,6,'2019-07-04 10:52:39','2019-07-04 10:52:39'),(78,6,10,'2019-07-04 10:52:39','2019-07-04 10:52:39'),(79,6,16,'2019-07-04 10:52:39','2019-07-04 10:52:39'),(80,6,22,'2019-07-04 10:52:39','2019-07-04 10:52:39'),(81,5,77,'2019-07-04 10:57:09','2019-07-04 10:57:09'),(82,5,5,'2019-07-04 10:57:09','2019-07-04 10:57:09'),(83,5,10,'2019-07-04 10:57:09','2019-07-04 10:57:09'),(84,5,16,'2019-07-04 10:57:09','2019-07-04 10:57:09'),(85,5,22,'2019-07-04 10:57:09','2019-07-04 10:57:09'),(91,3,113,'2019-07-04 11:00:34','2019-07-04 11:00:34'),(92,3,6,'2019-07-04 11:00:34','2019-07-04 11:00:34'),(93,3,10,'2019-07-04 11:00:34','2019-07-04 11:00:34'),(94,3,16,'2019-07-04 11:00:34','2019-07-04 11:00:34'),(95,3,22,'2019-07-04 11:00:34','2019-07-04 11:00:34'),(96,2,74,'2019-07-04 11:02:18','2019-07-04 11:02:18'),(97,2,5,'2019-07-04 11:02:18','2019-07-04 11:02:18'),(98,2,10,'2019-07-04 11:02:18','2019-07-04 11:02:18'),(99,2,16,'2019-07-04 11:02:18','2019-07-04 11:02:18'),(100,2,22,'2019-07-04 11:02:18','2019-07-04 11:02:18'),(116,8,77,'2020-04-13 13:10:32','2020-04-13 13:10:32'),(117,8,5,'2020-04-13 13:10:32','2020-04-13 13:10:32'),(118,8,11,'2020-04-13 13:10:32','2020-04-13 13:10:32'),(119,8,16,'2020-04-13 13:10:32','2020-04-13 13:10:32'),(120,8,22,'2020-04-13 13:10:32','2020-04-13 13:10:32'),(121,4,113,'2020-08-10 07:12:12','2020-08-10 07:12:12'),(122,4,7,'2020-08-10 07:12:12','2020-08-10 07:12:12'),(123,4,10,'2020-08-10 07:12:12','2020-08-10 07:12:12'),(124,4,22,'2020-08-10 07:12:12','2020-08-10 07:12:12');
/*!40000 ALTER TABLE `UserListingData` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserListingSteps`
--

DROP TABLE IF EXISTS `UserListingSteps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserListingSteps` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `step1` enum('inactive','active','completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'inactive',
  `step2` enum('inactive','active','completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'inactive',
  `step3` enum('inactive','active','completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'inactive',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `step4` enum('inactive','active','completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `UserListingSteps_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserListingSteps`
--

LOCK TABLES `UserListingSteps` WRITE;
/*!40000 ALTER TABLE `UserListingSteps` DISABLE KEYS */;
INSERT INTO `UserListingSteps` VALUES (1,1,'completed','completed','completed','2019-03-27 09:45:45','2019-03-27 09:49:54','completed'),(2,2,'completed','completed','completed','2019-03-27 09:50:29','2019-03-27 09:52:49','completed'),(3,3,'completed','completed','completed','2019-03-27 09:54:04','2019-03-27 09:55:45','completed'),(4,4,'completed','completed','completed','2019-03-27 09:56:38','2019-03-27 09:59:06','completed'),(5,5,'completed','completed','completed','2019-03-27 10:03:31','2019-03-27 10:05:46','completed'),(6,6,'completed','completed','completed','2019-03-27 10:07:00','2019-03-27 10:08:24','completed'),(7,7,'completed','completed','completed','2019-03-27 10:09:22','2019-03-27 10:11:05','completed'),(8,8,'completed','completed','completed','2020-01-23 05:50:56','2020-01-23 05:53:24','completed');
/*!40000 ALTER TABLE `UserListingSteps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserLogin`
--

DROP TABLE IF EXISTS `UserLogin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserLogin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deviceType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deviceId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deviceDetail` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserLogin`
--

LOCK TABLES `UserLogin` WRITE;
/*!40000 ALTER TABLE `UserLogin` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserLogin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserProfile`
--

DROP TABLE IF EXISTS `UserProfile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserProfile` (
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `profileId` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `displayName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dateOfBirth` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `picture` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phoneNumber` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `preferredLanguage` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `preferredCurrency` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `info` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `location` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `rzpCustId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` int DEFAULT NULL,
  `verificationCode` int DEFAULT NULL,
  `countryCode` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `countryName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codeUpdatedAt` datetime DEFAULT NULL,
  `appTheme` enum('auto','light','dark') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'auto',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `profileId` (`profileId`),
  UNIQUE KEY `UserProfile_profileId_unique` (`profileId`),
  CONSTRAINT `UserProfile_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserProfile`
--

LOCK TABLES `UserProfile` WRITE;
/*!40000 ALTER TABLE `UserProfile` DISABLE KEYS */;
INSERT INTO `UserProfile` VALUES ('977bc550-5069-11e9-a14e-635e0fd3bfa6',2,'Radical','QA','Radical QA','1-2000-1','d61ba8288aa9dc05f73b34d9d8fc4871.jpeg','Female',NULL,'en','EUR','I always wanted to be a great writer, like Victor Hugo who wrote \"Les Miserable\", or like Roman Roland who wrote \"John Christopher\". They have influenced millions of people through their books. I also wanted to be a great psychologist, like William James or Sigmund Freud, who could read people’s mind. Of course, I am nowhere close to these people, yet. I am just someone who does some teaching, some research, and some writing. But my dream is still alive.','Lives in The City, United Kingdom','2019-03-27 08:23:25','2019-07-04 10:31:38',NULL,NULL,NULL,NULL,NULL,NULL,'auto'),('d1d6d5a0-5064-11e9-a14e-635e0fd3bfa6',1,'Demo','User','Demo User','10-1994-5','13579aa2edf46b7a707be6b537259f45.jpeg','Male',NULL,'en','USD','I am a person who is positive about every aspect of life. There are many things I like to do, to see, and to experience. I like to read, I like to write; I like to think, I like to dream; I like to talk, I like to listen. I like to see the sunrise in the morning, I like to see the moonlight at night; I like to feel the music flowing on my face, I like to smell the wind coming from the ocean. I like to look at the clouds in the sky with a blank mind, I like to do thought experiment when I cannot sleep in the middle of the night. I like flowers in spring, rain in summer, leaves in autumn, and snow in winter. I like to sleep early, I like to get up late; I like to be alone, I like to be surrounded by people. I like country’s peace, I like metropolis’ noise; I like the beautiful west lake in Hangzhou, I like the flat cornfield in Campaign. I like delicious food and comfortable shoes; I like good books and romantic movies. I like the land and the nature, I like people. And, I like to laugh.','Architect based in Los Angeles,  CA.','2019-03-27 07:49:16','2019-07-04 11:29:49',NULL,NULL,NULL,NULL,NULL,NULL,'auto');
/*!40000 ALTER TABLE `UserProfile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserSafetyAmenities`
--

DROP TABLE IF EXISTS `UserSafetyAmenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserSafetyAmenities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `safetyAmenitiesId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `UserSafetyAmenities_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserSafetyAmenities`
--

LOCK TABLES `UserSafetyAmenities` WRITE;
/*!40000 ALTER TABLE `UserSafetyAmenities` DISABLE KEYS */;
INSERT INTO `UserSafetyAmenities` VALUES (1,1,32,'2019-03-27 09:46:01','2019-03-27 09:46:01'),(2,1,29,'2019-03-27 09:46:01','2019-03-27 09:46:01'),(3,1,31,'2019-03-27 09:46:01','2019-03-27 09:46:01'),(15,7,30,'2019-03-27 10:09:33','2019-03-27 10:09:33'),(16,7,32,'2019-03-27 10:09:33','2019-03-27 10:09:33'),(19,6,30,'2019-07-04 10:52:39','2019-07-04 10:52:39'),(20,6,32,'2019-07-04 10:52:39','2019-07-04 10:52:39'),(21,5,30,'2019-07-04 10:57:10','2019-07-04 10:57:10'),(22,5,29,'2019-07-04 10:57:10','2019-07-04 10:57:10'),(23,5,31,'2019-07-04 10:57:10','2019-07-04 10:57:10'),(26,3,29,'2019-07-04 11:00:34','2019-07-04 11:00:34'),(27,3,31,'2019-07-04 11:00:34','2019-07-04 11:00:34'),(28,2,30,'2019-07-04 11:02:19','2019-07-04 11:02:19'),(29,2,32,'2019-07-04 11:02:19','2019-07-04 11:02:19'),(38,8,30,'2020-04-13 13:10:33','2020-04-13 13:10:33'),(39,8,32,'2020-04-13 13:10:33','2020-04-13 13:10:33'),(40,8,29,'2020-04-13 13:10:33','2020-04-13 13:10:33'),(41,8,31,'2020-04-13 13:10:33','2020-04-13 13:10:33'),(42,4,29,'2020-08-10 07:12:12','2020-08-10 07:12:12'),(43,4,31,'2020-08-10 07:12:12','2020-08-10 07:12:12'),(44,4,32,'2020-08-10 07:12:12','2020-08-10 07:12:12'),(45,4,30,'2020-08-10 07:12:12','2020-08-10 07:12:12');
/*!40000 ALTER TABLE `UserSafetyAmenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserSpaces`
--

DROP TABLE IF EXISTS `UserSpaces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserSpaces` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `spacesId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  KEY `spacesId` (`spacesId`),
  CONSTRAINT `UserSpaces_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserSpaces_ibfk_2` FOREIGN KEY (`spacesId`) REFERENCES `ListSettings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserSpaces`
--

LOCK TABLES `UserSpaces` WRITE;
/*!40000 ALTER TABLE `UserSpaces` DISABLE KEYS */;
INSERT INTO `UserSpaces` VALUES (1,1,36,'2019-03-27 09:46:01','2019-03-27 09:46:01'),(2,1,34,'2019-03-27 09:46:01','2019-03-27 09:46:01'),(13,7,34,'2019-03-27 10:09:33','2019-03-27 10:09:33'),(14,7,36,'2019-03-27 10:09:33','2019-03-27 10:09:33'),(15,7,33,'2019-03-27 10:09:33','2019-03-27 10:09:33'),(18,6,34,'2019-07-04 10:52:39','2019-07-04 10:52:39'),(19,6,36,'2019-07-04 10:52:39','2019-07-04 10:52:39'),(20,5,34,'2019-07-04 10:57:10','2019-07-04 10:57:10'),(21,5,33,'2019-07-04 10:57:10','2019-07-04 10:57:10'),(22,5,35,'2019-07-04 10:57:10','2019-07-04 10:57:10'),(24,3,33,'2019-07-04 11:00:34','2019-07-04 11:00:34'),(25,3,36,'2019-07-04 11:00:34','2019-07-04 11:00:34'),(26,2,34,'2019-07-04 11:02:19','2019-07-04 11:02:19'),(27,2,33,'2019-07-04 11:02:19','2019-07-04 11:02:19'),(33,8,33,'2020-04-13 13:10:33','2020-04-13 13:10:33'),(34,8,34,'2020-04-13 13:10:33','2020-04-13 13:10:33'),(35,8,35,'2020-04-13 13:10:33','2020-04-13 13:10:33'),(36,8,36,'2020-04-13 13:10:33','2020-04-13 13:10:33'),(37,4,34,'2020-08-10 07:12:12','2020-08-10 07:12:12');
/*!40000 ALTER TABLE `UserSpaces` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserVerifiedInfo`
--

DROP TABLE IF EXISTS `UserVerifiedInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserVerifiedInfo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isEmailConfirmed` tinyint(1) DEFAULT '0',
  `isFacebookConnected` tinyint(1) DEFAULT '0',
  `isGoogleConnected` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isIdVerification` int DEFAULT '0',
  `isPhoneVerified` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `UserVerifiedInfo_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserVerifiedInfo`
--

LOCK TABLES `UserVerifiedInfo` WRITE;
/*!40000 ALTER TABLE `UserVerifiedInfo` DISABLE KEYS */;
INSERT INTO `UserVerifiedInfo` VALUES (1,'d1d6d5a0-5064-11e9-a14e-635e0fd3bfa6',1,0,0,'2019-03-27 07:49:16','2019-03-27 07:49:16',0,0),(2,'977bc550-5069-11e9-a14e-635e0fd3bfa6',1,0,0,'2019-03-27 08:23:25','2019-03-27 08:23:25',0,0);
/*!40000 ALTER TABLE `UserVerifiedInfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WhyHost`
--

DROP TABLE IF EXISTS `WhyHost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `WhyHost` (
  `id` int NOT NULL AUTO_INCREMENT,
  `imageName` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `buttonLabel` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WhyHost`
--

LOCK TABLES `WhyHost` WRITE;
/*!40000 ALTER TABLE `WhyHost` DISABLE KEYS */;
INSERT INTO `WhyHost` VALUES (1,'dbdad989566a6ce0de251caf3b927dfe.jpeg','It\'s simple to become a RentALL host','Become a host','2022-11-03 10:39:03','2022-11-03 10:39:03');
/*!40000 ALTER TABLE `WhyHost` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WhyHostInfoBlock`
--

DROP TABLE IF EXISTS `WhyHostInfoBlock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `WhyHostInfoBlock` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WhyHostInfoBlock`
--

LOCK TABLES `WhyHostInfoBlock` WRITE;
/*!40000 ALTER TABLE `WhyHostInfoBlock` DISABLE KEYS */;
INSERT INTO `WhyHostInfoBlock` VALUES (1,'Host Banner Title 1','hostBannerTitle1','It\'s simple to become a YourSite host','2020-04-13 11:33:10','2022-11-03 11:20:47'),(2,'Host Banner Image 1','hostBannerImage1','b057564695396f78ef5b9d5e717b681d.png','2020-04-13 11:33:10','2022-11-03 11:20:47'),(7,'Hosting Block Title Heading','hostingBlockTitleHeading','There are 3 Lorem Ipsum generators','2020-04-13 11:33:10','2022-11-03 11:20:47'),(8,'Hosting Block Title 1','hostingBlockTitle1','Lorem Ipsum','2020-04-13 11:33:10','2022-11-03 11:20:47'),(9,'Hosting Block Title 2','hostingBlockTitle2','Lorem Ipsum','2020-04-13 11:33:10','2022-11-03 11:20:47'),(10,'Hosting Block Title 3','hostingBlockTitle3','Lorem Ipsum','2020-04-13 11:33:10','2022-11-03 11:20:47'),(11,'Hosting Block Content 1','hostingBlockContent1','Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n\n','2020-04-13 11:33:10','2022-11-03 11:20:47'),(12,'Hosting Block Content 2','hostingBlockContent2','Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n\n','2020-04-13 11:33:10','2022-11-03 11:20:47'),(13,'Hosting Block Content 3','hostingBlockContent3','Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n\n','2020-04-13 11:33:10','2022-11-03 11:20:47'),(14,'Cover Section Title 1','coverSectionTitle1','Use our generator to get your own','2020-04-13 11:33:10','2022-11-03 11:20:47'),(15,'Cover Section Image 1','coverSectionImage1','52b45df1bfb0c06461aba5e4759f88a8.png','2020-04-13 11:33:10','2022-11-03 11:20:47'),(16,'Cover Section Content 1','coverSectionContent1','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.','2020-04-13 11:33:10','2022-11-03 11:20:47'),(18,'Cover Section Feature 1','coverSectionFeature1','Excepteur sint occaecat cupidatat non proident','2020-04-13 11:33:10','2022-11-03 11:20:47'),(19,'Cover Section Feature 2','coverSectionFeature2','quis nostrud exercitation ullamco laboris nisi','2020-04-13 11:33:10','2022-11-03 11:20:47'),(20,'Cover Section Feature 3','coverSectionFeature3','Sed ut perspiciatis unde omnis iste natus error sit','2020-04-13 11:33:10','2022-11-03 11:20:47'),(21,'Cover Section Feature 4','coverSectionFeature4','Nemo enim ipsam voluptatem quia voluptas sit aspernatur','2020-04-13 11:33:10','2022-11-03 11:20:47'),(22,'Cover Section Feature 5','coverSectionFeature5','Ut enim ad minima veniam, quis nostrum exercitationem','2020-04-13 11:33:10','2022-11-03 11:20:47'),(23,'Cover Section Feature 6','coverSectionFeature6','Excepteur sint occaecat cupidatat non proident','2020-04-13 11:33:10','2022-11-03 11:20:47'),(24,'Payment Title Heading','paymentTitleHeading','It to make a type specimen book','2020-04-13 11:33:10','2022-11-03 11:20:47'),(31,'Quote Section Title 1','quoteSectionTitle1','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore','2020-04-13 11:33:10','2022-11-03 11:20:47'),(32,'Quote Section Title 2','quoteSectionTitle2','It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages','2020-04-13 11:33:10','2022-11-03 11:20:47'),(33,'Quote Section Content 1','quoteSectionContent1','software like Aldus PageMaker including versions of Lorem Ipsum.\n','2020-04-13 11:33:10','2022-11-03 11:20:47'),(34,'Quote Section Content 2','quoteSectionContent2','software like Aldus PageMaker including versions of Lorem Ipsum.\n','2020-04-13 11:33:10','2022-11-03 11:20:47'),(35,'Quote Section Image 1','quoteSectionImage1','a15d6d42312a50dacc893d133b27f370.png','2020-04-13 11:33:10','2022-11-03 11:20:47'),(36,'Quote Section Image 2','quoteSectionImage2','2637fb0602c30d92f0b78f82b79bc7d9.png','2020-04-13 11:33:10','2022-11-03 11:20:47'),(37,'Quote Section Button 1','quoteSectionButton1','Lorem Ipsum Text','2020-04-13 11:33:10','2022-11-03 11:20:47'),(38,'Quote Section Button 2','quoteSectionButton2','Lorem Ipsum Text','2020-04-13 11:33:10','2022-11-03 11:20:47'),(39,'FAQ Title 1','faqTitle1','Lorem ipsum dolor sit amet, consecteturt','2020-04-13 11:33:10','2022-11-03 11:20:47'),(40,'FAQ Title 2','faqTitle2','Lorem ipsum dolor sit amet, consecteturt','2020-04-13 11:33:10','2022-11-03 11:20:47'),(41,'FAQ Title 3','faqTitle3','Lorem ipsum dolor sit amet, consecteturt','2020-04-13 11:33:10','2022-11-03 11:20:47'),(42,'FAQ Title 4','faqTitle4','Lorem ipsum dolor sit amet, consecteturt','2020-04-13 11:33:10','2022-11-03 11:20:47'),(43,'FAQ Title 5','faqTitle5','','2020-04-13 11:33:10','2022-11-03 11:20:47'),(44,'FAQ Title 6','faqTitle6','','2020-04-13 11:33:10','2022-11-03 11:20:47'),(45,'FAQ Title 7','faqTitle7','','2020-04-13 11:33:10','2022-11-03 11:20:47'),(46,'FAQ Title 8','faqTitle8','','2020-04-13 11:33:10','2022-11-03 11:20:47'),(47,'FAQ Content 1','faqContent1','Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat occaecat ut occaecat consequat est minim minim esse tempor laborum consequat esse adipisicing eu reprehenderit enim.\n\n','2020-04-13 11:33:10','2022-11-03 11:20:47'),(48,'FAQ Content 2','faqContent2','Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat occaecat ut occaecat consequat est minim minim esse tempor laborum consequat esse adipisicing eu reprehenderit enim.\n\n','2020-04-13 11:33:10','2022-11-03 11:20:47'),(49,'FAQ Content 3','faqContent3','Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat occaecat ut occaecat consequat est minim minim esse tempor laborum consequat esse adipisicing eu reprehenderit enim.\n\n','2020-04-13 11:33:10','2022-11-03 11:20:47'),(50,'FAQ Content 4','faqContent4','Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat occaecat ut occaecat consequat est minim minim esse tempor laborum consequat esse adipisicing eu reprehenderit enim.\n\n','2020-04-13 11:33:10','2022-11-03 11:20:47'),(51,'FAQ Content 5','faqContent5','','2020-04-13 11:33:10','2022-11-03 11:20:47'),(52,'FAQ Content 6','faqContent6','','2020-04-13 11:33:10','2022-11-03 11:20:47'),(53,'FAQ Content 7','faqContent7','','2020-04-13 11:33:10','2022-11-03 11:20:47'),(54,'FAQ Content 8','faqContent8','','2020-04-13 11:33:10','2022-11-03 11:20:47'),(55,'Hosting Block Image 1','hostingBlockImage1','74ec7bc248b5e4b76242b570f0c9cdbe.png','2022-11-03 09:57:34','2022-11-03 11:20:47'),(56,'Hosting Block Image 2','hostingBlockImage2','3fe605fd854ce13db4749e2976143c00.png','2022-11-03 09:57:34','2022-11-03 11:20:47'),(57,'Hosting Block Image 3','hostingBlockImage3','07d46d037a6fd7e872327efaeaca2feb.png','2022-11-03 09:57:34','2022-11-03 11:20:47'),(58,'Hosting Banner Image','whyhostBannerImage','ca752b3e20951768f441f6c3742b21c6.png','2022-11-03 09:57:34','2022-11-03 11:20:47'),(59,'Hosting Banner Heading','whyhostBannerHeading','Join us! Try hosting on Your-Site','2022-11-03 09:57:34','2022-11-03 11:20:47');
/*!40000 ALTER TABLE `WhyHostInfoBlock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WishList`
--

DROP TABLE IF EXISTS `WishList`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `WishList` (
  `id` int NOT NULL AUTO_INCREMENT,
  `wishListGroupId` int NOT NULL,
  `listId` int NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isListActive` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `wishListGroupId` (`wishListGroupId`),
  KEY `listId` (`listId`),
  CONSTRAINT `WishList_ibfk_1` FOREIGN KEY (`wishListGroupId`) REFERENCES `WishListGroup` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `WishList_ibfk_2` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WishList`
--

LOCK TABLES `WishList` WRITE;
/*!40000 ALTER TABLE `WishList` DISABLE KEYS */;
/*!40000 ALTER TABLE `WishList` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WishListGroup`
--

DROP TABLE IF EXISTS `WishListGroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `WishListGroup` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isPublic` int DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WishListGroup`
--

LOCK TABLES `WishListGroup` WRITE;
/*!40000 ALTER TABLE `WishListGroup` DISABLE KEYS */;
/*!40000 ALTER TABLE `WishListGroup` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-20 18:24:59
