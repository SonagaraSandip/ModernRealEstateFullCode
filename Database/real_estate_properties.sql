-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: real_estate
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

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
-- Table structure for table `properties`
--

DROP TABLE IF EXISTS `properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `properties` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `type` varchar(100) NOT NULL,
  `price` decimal(12,2) NOT NULL,
  `size_sqft` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `in_stock` tinyint(1) DEFAULT 1,
  `image` varchar(255) DEFAULT NULL,
  `images_by_size` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images_by_size`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `properties`
--

LOCK TABLES `properties` WRITE;
/*!40000 ALTER TABLE `properties` DISABLE KEYS */;
INSERT INTO `properties` VALUES (8,'Wheelwright Cottage House D-55','villa',873100.00,'1800,1700,1900','Tenement law refers to the feudal basis of permanent property such as land or rents. It may be found combined as in \"Messuage or Tenement\" to encompass all the land, buildings and other assets of a property. In the United States, some apartment-dwellers own their units, either as a housing cooperative, or in a condominium, whose residents',1,'1764752832150.webp','{\"1200\":\"1764752832169.webp\",\"1400\":\"1764752832169.webp\",\"1600\":\"1764752832169.webp\"}','2025-12-03 09:07:12'),(9,'Town Place Apartments E-62','villa',459700.00,'1200,1400','Tenement law refers to the feudal basis of permanent property such as land or rents. It may be found combined as in \"Messuage or Tenement\" to encompass all the land, buildings and other assets of a property. In the United States, some apartment-dwellers own their units, either as a',1,'1764753377778.webp','{\"1200\":\"1764753377784.webp\",\"1400\":null,\"1600\":null}','2025-12-03 09:16:17'),(10,'Meadow View D -205','villa',183900.00,'1200,1500','Tenement law refers to the feudal basis of permanent property such as land or rents. It may be found combined as in \"Messuage or Tenement\" to encompass all the land, buildings and other assets of a property. In the United States, some apartment-dwellers own their units, either as a',0,'1764753566092.webp','{\"1200\":\"1764753566092.webp\",\"1400\":null,\"1600\":null}','2025-12-03 09:19:26'),(11,'Luxury Landing E-87','villa',735200.00,'1300,1500','The term \"luxury apartment\" was used since the postwar era, although its definition was less grandiose than in recent times. In the 1980s, for example, having a doorman for the building was sufficient to mark an apartment as \"luxury\". Competition to make the most luxurious',1,'1764753688103.webp','{\"1200\":null,\"1400\":\"1764753688103.webp\",\"1600\":null}','2025-12-03 09:21:28'),(12,'Town Place Walkups A-404','bunglow',551600.00,'1200,1500,1800','This is a list of house types. Houses can be built in a large variety of configurations. A basic division is between free-standing or single-family detached homes and various types of attached or multi-family residential dwellings. Both may vary greatly in scale and the amount of',1,'1764753848008.webp','{\"1200\":\"1764753848010.webp\",\"1400\":\"1764753848016.webp\",\"1600\":\"1764753848046.webp\"}','2025-12-03 09:24:08'),(13,'Wheelwright Cottage House D-55','royalhouse',780050.00,'1800,1900,1700','Tenement law refers to the feudal basis of permanent property such as land or rents. It may be found combined as in \"Messuage or Tenement\" to encompass all the land, buildings and other assets of a property. In the United States, some apartment-dwellers own their units, either as a',1,'1764754067612.webp','{\"1200\":\"1764754067617.webp\",\"1400\":\"1764754067617.webp\",\"1600\":\"1764754067618.webp\"}','2025-12-03 09:27:47'),(14,'Town Place Walkups A-404','royalhouse',551600.00,'1600,1500,1700','This is a list of house types. Houses can be built in a large variety of configurations. A basic division is between free-standing or single-family detached homes and various types of attached or multi-family residential dwellings. Both may vary greatly in scale and the amount of',1,'1764754968680.webp','{\"1200\":\"1764754968681.webp\",\"1400\":\"1764754968681.webp\",\"1600\":\"1764754968688.webp\"}','2025-12-03 09:42:48'),(15,'The White House J-54','apartment',275800.00,'1800,1500,1100','Tenement law refers to the feudal basis of permanent property such as land or rents. It may be found combined as in \"Messuage or Tenement\" to encompass all the land, buildings and other assets of a property. In the United States, some apartment-dwellers own their units, either as a',1,'1764755067060.avif','{\"1200\":\"1764755067060.webp\",\"1400\":\"1764755067060.webp\",\"1600\":\"1764755067061.webp\"}','2025-12-03 09:44:27'),(16,'MiniPalais D-703','royalhouse',919800.00,'1200,1800,1400','This is a list of house types. Houses can be built in a large variety of configurations. A basic division is between free-standing or single-family detached homes and various types of attached or multi-family residential dwellings. Both may vary greatly in scale and the amount of',1,'1764755194801.webp','{\"1200\":\"1764755194801.webp\",\"1400\":\"1764755194802.webp\",\"1600\":\"1764755194806.webp\"}','2025-12-03 09:46:34'),(17,'Family Villas C-92','royalhouse',597800.00,'1100,1500,1800','The term \"luxury apartment\" was used since the postwar era, although its definition was less grandiose than in recent times. In the 1980s, for example, having a doorman for the building was sufficient to mark an apartment as \"luxury\".Competition to make the most luxurious',1,'1764755928695.webp','{\"1200\":\"1764755928696.webp\",\"1400\":\"1764755928696.webp\",\"1600\":\"1764755928702.webp\"}','2025-12-03 09:58:48'),(18,'Heart and Soul Apartments D-604','royalhouse',938400.00,'1400,1600','Tenement law refers to the feudal basis of permanent property such as land or rents. It may be found combined as in \"Messuage or Tenement\" to encompass all the land, buildings and other assets of a property. In the United States, some apartment-dwellers own their units, either as a',1,'1764756010871.webp','{\"1200\":\"1764756010871.webp\",\"1400\":\"1764756010872.webp\",\"1600\":\"1764756010872.webp\"}','2025-12-03 10:00:10');
/*!40000 ALTER TABLE `properties` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-04 13:08:19
