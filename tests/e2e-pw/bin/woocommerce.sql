-- MariaDB dump 10.19  Distrib 10.6.13-MariaDB, for Linux (aarch64)
--
-- Host: tests-mysql    Database: tests-wordpress
-- ------------------------------------------------------
-- Server version	11.0.2-MariaDB-1:11.0.2+maria~ubu2204

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
-- Table structure for table `wp_actionscheduler_actions`
--

DROP TABLE IF EXISTS `wp_actionscheduler_actions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_actionscheduler_actions` (
  `action_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `hook` varchar(191) NOT NULL,
  `status` varchar(20) NOT NULL,
  `scheduled_date_gmt` datetime DEFAULT '0000-00-00 00:00:00',
  `scheduled_date_local` datetime DEFAULT '0000-00-00 00:00:00',
  `args` varchar(191) DEFAULT NULL,
  `schedule` longtext DEFAULT NULL,
  `group_id` bigint(20) unsigned NOT NULL DEFAULT 0,
  `attempts` int(11) NOT NULL DEFAULT 0,
  `last_attempt_gmt` datetime DEFAULT '0000-00-00 00:00:00',
  `last_attempt_local` datetime DEFAULT '0000-00-00 00:00:00',
  `claim_id` bigint(20) unsigned NOT NULL DEFAULT 0,
  `extended_args` varchar(8000) DEFAULT NULL,
  PRIMARY KEY (`action_id`),
  KEY `hook` (`hook`),
  KEY `status` (`status`),
  KEY `scheduled_date_gmt` (`scheduled_date_gmt`),
  KEY `args` (`args`),
  KEY `group_id` (`group_id`),
  KEY `last_attempt_gmt` (`last_attempt_gmt`),
  KEY `claim_id_status_scheduled_date_gmt` (`claim_id`,`status`,`scheduled_date_gmt`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_actionscheduler_actions`
--

LOCK TABLES `wp_actionscheduler_actions` WRITE;
/*!40000 ALTER TABLE `wp_actionscheduler_actions` DISABLE KEYS */;
INSERT INTO `wp_actionscheduler_actions` VALUES (5,'action_scheduler/migration_hook','pending','2023-06-12 15:48:55','2023-06-12 15:48:55','[]','O:30:\"ActionScheduler_SimpleSchedule\":2:{s:22:\"\0*\0scheduled_timestamp\";i:1686584935;s:41:\"\0ActionScheduler_SimpleSchedule\0timestamp\";i:1686584935;}',1,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',0,NULL);
/*!40000 ALTER TABLE `wp_actionscheduler_actions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_actionscheduler_claims`
--

DROP TABLE IF EXISTS `wp_actionscheduler_claims`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_actionscheduler_claims` (
  `claim_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `date_created_gmt` datetime DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`claim_id`),
  KEY `date_created_gmt` (`date_created_gmt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_actionscheduler_claims`
--

LOCK TABLES `wp_actionscheduler_claims` WRITE;
/*!40000 ALTER TABLE `wp_actionscheduler_claims` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_actionscheduler_claims` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_actionscheduler_groups`
--

DROP TABLE IF EXISTS `wp_actionscheduler_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_actionscheduler_groups` (
  `group_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) NOT NULL,
  PRIMARY KEY (`group_id`),
  KEY `slug` (`slug`(191))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_actionscheduler_groups`
--

LOCK TABLES `wp_actionscheduler_groups` WRITE;
/*!40000 ALTER TABLE `wp_actionscheduler_groups` DISABLE KEYS */;
INSERT INTO `wp_actionscheduler_groups` VALUES (1,'action-scheduler-migration');
/*!40000 ALTER TABLE `wp_actionscheduler_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_actionscheduler_logs`
--

DROP TABLE IF EXISTS `wp_actionscheduler_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_actionscheduler_logs` (
  `log_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `action_id` bigint(20) unsigned NOT NULL,
  `message` text NOT NULL,
  `log_date_gmt` datetime DEFAULT '0000-00-00 00:00:00',
  `log_date_local` datetime DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`log_id`),
  KEY `action_id` (`action_id`),
  KEY `log_date_gmt` (`log_date_gmt`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_actionscheduler_logs`
--

LOCK TABLES `wp_actionscheduler_logs` WRITE;
/*!40000 ALTER TABLE `wp_actionscheduler_logs` DISABLE KEYS */;
INSERT INTO `wp_actionscheduler_logs` VALUES (1,5,'action created','2023-06-12 15:47:55','2023-06-12 15:47:55');
/*!40000 ALTER TABLE `wp_actionscheduler_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_commentmeta`
--

DROP TABLE IF EXISTS `wp_commentmeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_commentmeta` (
  `meta_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `comment_id` bigint(20) unsigned NOT NULL DEFAULT 0,
  `meta_key` varchar(255) DEFAULT NULL,
  `meta_value` longtext DEFAULT NULL,
  PRIMARY KEY (`meta_id`),
  KEY `comment_id` (`comment_id`),
  KEY `meta_key` (`meta_key`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_commentmeta`
--

LOCK TABLES `wp_commentmeta` WRITE;
/*!40000 ALTER TABLE `wp_commentmeta` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_commentmeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_comments`
--

DROP TABLE IF EXISTS `wp_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_comments` (
  `comment_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `comment_post_ID` bigint(20) unsigned NOT NULL DEFAULT 0,
  `comment_author` tinytext NOT NULL,
  `comment_author_email` varchar(100) NOT NULL DEFAULT '',
  `comment_author_url` varchar(200) NOT NULL DEFAULT '',
  `comment_author_IP` varchar(100) NOT NULL DEFAULT '',
  `comment_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `comment_date_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `comment_content` text NOT NULL,
  `comment_karma` int(11) NOT NULL DEFAULT 0,
  `comment_approved` varchar(20) NOT NULL DEFAULT '1',
  `comment_agent` varchar(255) NOT NULL DEFAULT '',
  `comment_type` varchar(20) NOT NULL DEFAULT 'comment',
  `comment_parent` bigint(20) unsigned NOT NULL DEFAULT 0,
  `user_id` bigint(20) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`comment_ID`),
  KEY `comment_post_ID` (`comment_post_ID`),
  KEY `comment_approved_date_gmt` (`comment_approved`,`comment_date_gmt`),
  KEY `comment_date_gmt` (`comment_date_gmt`),
  KEY `comment_parent` (`comment_parent`),
  KEY `comment_author_email` (`comment_author_email`(10)),
  KEY `woo_idx_comment_type` (`comment_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_comments`
--

LOCK TABLES `wp_comments` WRITE;
/*!40000 ALTER TABLE `wp_comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_links`
--

DROP TABLE IF EXISTS `wp_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_links` (
  `link_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `link_url` varchar(255) NOT NULL DEFAULT '',
  `link_name` varchar(255) NOT NULL DEFAULT '',
  `link_image` varchar(255) NOT NULL DEFAULT '',
  `link_target` varchar(25) NOT NULL DEFAULT '',
  `link_description` varchar(255) NOT NULL DEFAULT '',
  `link_visible` varchar(20) NOT NULL DEFAULT 'Y',
  `link_owner` bigint(20) unsigned NOT NULL DEFAULT 1,
  `link_rating` int(11) NOT NULL DEFAULT 0,
  `link_updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `link_rel` varchar(255) NOT NULL DEFAULT '',
  `link_notes` mediumtext NOT NULL,
  `link_rss` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`link_id`),
  KEY `link_visible` (`link_visible`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_links`
--

LOCK TABLES `wp_links` WRITE;
/*!40000 ALTER TABLE `wp_links` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_options`
--

DROP TABLE IF EXISTS `wp_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_options` (
  `option_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `option_name` varchar(191) NOT NULL DEFAULT '',
  `option_value` longtext NOT NULL,
  `autoload` varchar(20) NOT NULL DEFAULT 'yes',
  PRIMARY KEY (`option_id`),
  UNIQUE KEY `option_name` (`option_name`),
  KEY `autoload` (`autoload`)
) ENGINE=InnoDB AUTO_INCREMENT=317 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_options`
--

LOCK TABLES `wp_options` WRITE;
/*!40000 ALTER TABLE `wp_options` DISABLE KEYS */;
INSERT INTO `wp_options` VALUES (1,'siteurl','http://localhost:8889','yes'),(2,'home','http://localhost:8889','yes'),(3,'blogname','woocommerce-blocks-database','yes'),(4,'blogdescription','','yes'),(5,'users_can_register','0','yes'),(6,'admin_email','wordpress@example.com','yes'),(7,'start_of_week','1','yes'),(8,'use_balanceTags','0','yes'),(9,'use_smilies','1','yes'),(10,'require_name_email','1','yes'),(11,'comments_notify','1','yes'),(12,'posts_per_rss','10','yes'),(13,'rss_use_excerpt','0','yes'),(14,'mailserver_url','mail.example.com','yes'),(15,'mailserver_login','login@example.com','yes'),(16,'mailserver_pass','password','yes'),(17,'mailserver_port','110','yes'),(18,'default_category','1','yes'),(19,'default_comment_status','open','yes'),(20,'default_ping_status','open','yes'),(21,'default_pingback_flag','1','yes'),(22,'posts_per_page','10','yes'),(23,'date_format','F j, Y','yes'),(24,'time_format','g:i a','yes'),(25,'links_updated_date_format','F j, Y g:i a','yes'),(26,'comment_moderation','0','yes'),(27,'moderation_notify','1','yes'),(28,'permalink_structure','/%postname%/','yes'),(29,'rewrite_rules','a:160:{s:24:\"^wc-auth/v([1]{1})/(.*)?\";s:63:\"index.php?wc-auth-version=$matches[1]&wc-auth-route=$matches[2]\";s:22:\"^wc-api/v([1-3]{1})/?$\";s:51:\"index.php?wc-api-version=$matches[1]&wc-api-route=/\";s:24:\"^wc-api/v([1-3]{1})(.*)?\";s:61:\"index.php?wc-api-version=$matches[1]&wc-api-route=$matches[2]\";s:20:\"shop/classic-shop/?$\";s:27:\"index.php?post_type=product\";s:50:\"shop/classic-shop/feed/(feed|rdf|rss|rss2|atom)/?$\";s:44:\"index.php?post_type=product&feed=$matches[1]\";s:45:\"shop/classic-shop/(feed|rdf|rss|rss2|atom)/?$\";s:44:\"index.php?post_type=product&feed=$matches[1]\";s:37:\"shop/classic-shop/page/([0-9]{1,})/?$\";s:45:\"index.php?post_type=product&paged=$matches[1]\";s:11:\"^wp-json/?$\";s:22:\"index.php?rest_route=/\";s:14:\"^wp-json/(.*)?\";s:33:\"index.php?rest_route=/$matches[1]\";s:21:\"^index.php/wp-json/?$\";s:22:\"index.php?rest_route=/\";s:24:\"^index.php/wp-json/(.*)?\";s:33:\"index.php?rest_route=/$matches[1]\";s:17:\"^wp-sitemap\\.xml$\";s:23:\"index.php?sitemap=index\";s:17:\"^wp-sitemap\\.xsl$\";s:36:\"index.php?sitemap-stylesheet=sitemap\";s:23:\"^wp-sitemap-index\\.xsl$\";s:34:\"index.php?sitemap-stylesheet=index\";s:48:\"^wp-sitemap-([a-z]+?)-([a-z\\d_-]+?)-(\\d+?)\\.xml$\";s:75:\"index.php?sitemap=$matches[1]&sitemap-subtype=$matches[2]&paged=$matches[3]\";s:34:\"^wp-sitemap-([a-z]+?)-(\\d+?)\\.xml$\";s:47:\"index.php?sitemap=$matches[1]&paged=$matches[2]\";s:47:\"category/(.+?)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:52:\"index.php?category_name=$matches[1]&feed=$matches[2]\";s:42:\"category/(.+?)/(feed|rdf|rss|rss2|atom)/?$\";s:52:\"index.php?category_name=$matches[1]&feed=$matches[2]\";s:23:\"category/(.+?)/embed/?$\";s:46:\"index.php?category_name=$matches[1]&embed=true\";s:35:\"category/(.+?)/page/?([0-9]{1,})/?$\";s:53:\"index.php?category_name=$matches[1]&paged=$matches[2]\";s:32:\"category/(.+?)/wc-api(/(.*))?/?$\";s:54:\"index.php?category_name=$matches[1]&wc-api=$matches[3]\";s:17:\"category/(.+?)/?$\";s:35:\"index.php?category_name=$matches[1]\";s:44:\"tag/([^/]+)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:42:\"index.php?tag=$matches[1]&feed=$matches[2]\";s:39:\"tag/([^/]+)/(feed|rdf|rss|rss2|atom)/?$\";s:42:\"index.php?tag=$matches[1]&feed=$matches[2]\";s:20:\"tag/([^/]+)/embed/?$\";s:36:\"index.php?tag=$matches[1]&embed=true\";s:32:\"tag/([^/]+)/page/?([0-9]{1,})/?$\";s:43:\"index.php?tag=$matches[1]&paged=$matches[2]\";s:29:\"tag/([^/]+)/wc-api(/(.*))?/?$\";s:44:\"index.php?tag=$matches[1]&wc-api=$matches[3]\";s:14:\"tag/([^/]+)/?$\";s:25:\"index.php?tag=$matches[1]\";s:45:\"type/([^/]+)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:50:\"index.php?post_format=$matches[1]&feed=$matches[2]\";s:40:\"type/([^/]+)/(feed|rdf|rss|rss2|atom)/?$\";s:50:\"index.php?post_format=$matches[1]&feed=$matches[2]\";s:21:\"type/([^/]+)/embed/?$\";s:44:\"index.php?post_format=$matches[1]&embed=true\";s:33:\"type/([^/]+)/page/?([0-9]{1,})/?$\";s:51:\"index.php?post_format=$matches[1]&paged=$matches[2]\";s:15:\"type/([^/]+)/?$\";s:33:\"index.php?post_format=$matches[1]\";s:55:\"product-category/(.+?)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:50:\"index.php?product_cat=$matches[1]&feed=$matches[2]\";s:50:\"product-category/(.+?)/(feed|rdf|rss|rss2|atom)/?$\";s:50:\"index.php?product_cat=$matches[1]&feed=$matches[2]\";s:31:\"product-category/(.+?)/embed/?$\";s:44:\"index.php?product_cat=$matches[1]&embed=true\";s:43:\"product-category/(.+?)/page/?([0-9]{1,})/?$\";s:51:\"index.php?product_cat=$matches[1]&paged=$matches[2]\";s:25:\"product-category/(.+?)/?$\";s:33:\"index.php?product_cat=$matches[1]\";s:52:\"product-tag/([^/]+)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:50:\"index.php?product_tag=$matches[1]&feed=$matches[2]\";s:47:\"product-tag/([^/]+)/(feed|rdf|rss|rss2|atom)/?$\";s:50:\"index.php?product_tag=$matches[1]&feed=$matches[2]\";s:28:\"product-tag/([^/]+)/embed/?$\";s:44:\"index.php?product_tag=$matches[1]&embed=true\";s:40:\"product-tag/([^/]+)/page/?([0-9]{1,})/?$\";s:51:\"index.php?product_tag=$matches[1]&paged=$matches[2]\";s:22:\"product-tag/([^/]+)/?$\";s:33:\"index.php?product_tag=$matches[1]\";s:35:\"product/[^/]+/attachment/([^/]+)/?$\";s:32:\"index.php?attachment=$matches[1]\";s:45:\"product/[^/]+/attachment/([^/]+)/trackback/?$\";s:37:\"index.php?attachment=$matches[1]&tb=1\";s:65:\"product/[^/]+/attachment/([^/]+)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:49:\"index.php?attachment=$matches[1]&feed=$matches[2]\";s:60:\"product/[^/]+/attachment/([^/]+)/(feed|rdf|rss|rss2|atom)/?$\";s:49:\"index.php?attachment=$matches[1]&feed=$matches[2]\";s:60:\"product/[^/]+/attachment/([^/]+)/comment-page-([0-9]{1,})/?$\";s:50:\"index.php?attachment=$matches[1]&cpage=$matches[2]\";s:41:\"product/[^/]+/attachment/([^/]+)/embed/?$\";s:43:\"index.php?attachment=$matches[1]&embed=true\";s:24:\"product/([^/]+)/embed/?$\";s:40:\"index.php?product=$matches[1]&embed=true\";s:28:\"product/([^/]+)/trackback/?$\";s:34:\"index.php?product=$matches[1]&tb=1\";s:48:\"product/([^/]+)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:46:\"index.php?product=$matches[1]&feed=$matches[2]\";s:43:\"product/([^/]+)/(feed|rdf|rss|rss2|atom)/?$\";s:46:\"index.php?product=$matches[1]&feed=$matches[2]\";s:36:\"product/([^/]+)/page/?([0-9]{1,})/?$\";s:47:\"index.php?product=$matches[1]&paged=$matches[2]\";s:43:\"product/([^/]+)/comment-page-([0-9]{1,})/?$\";s:47:\"index.php?product=$matches[1]&cpage=$matches[2]\";s:33:\"product/([^/]+)/wc-api(/(.*))?/?$\";s:48:\"index.php?product=$matches[1]&wc-api=$matches[3]\";s:39:\"product/[^/]+/([^/]+)/wc-api(/(.*))?/?$\";s:51:\"index.php?attachment=$matches[1]&wc-api=$matches[3]\";s:50:\"product/[^/]+/attachment/([^/]+)/wc-api(/(.*))?/?$\";s:51:\"index.php?attachment=$matches[1]&wc-api=$matches[3]\";s:32:\"product/([^/]+)(?:/([0-9]+))?/?$\";s:46:\"index.php?product=$matches[1]&page=$matches[2]\";s:24:\"product/[^/]+/([^/]+)/?$\";s:32:\"index.php?attachment=$matches[1]\";s:34:\"product/[^/]+/([^/]+)/trackback/?$\";s:37:\"index.php?attachment=$matches[1]&tb=1\";s:54:\"product/[^/]+/([^/]+)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:49:\"index.php?attachment=$matches[1]&feed=$matches[2]\";s:49:\"product/[^/]+/([^/]+)/(feed|rdf|rss|rss2|atom)/?$\";s:49:\"index.php?attachment=$matches[1]&feed=$matches[2]\";s:49:\"product/[^/]+/([^/]+)/comment-page-([0-9]{1,})/?$\";s:50:\"index.php?attachment=$matches[1]&cpage=$matches[2]\";s:30:\"product/[^/]+/([^/]+)/embed/?$\";s:43:\"index.php?attachment=$matches[1]&embed=true\";s:12:\"robots\\.txt$\";s:18:\"index.php?robots=1\";s:13:\"favicon\\.ico$\";s:19:\"index.php?favicon=1\";s:48:\".*wp-(atom|rdf|rss|rss2|feed|commentsrss2)\\.php$\";s:18:\"index.php?feed=old\";s:20:\".*wp-app\\.php(/.*)?$\";s:19:\"index.php?error=403\";s:18:\".*wp-register.php$\";s:23:\"index.php?register=true\";s:32:\"feed/(feed|rdf|rss|rss2|atom)/?$\";s:27:\"index.php?&feed=$matches[1]\";s:27:\"(feed|rdf|rss|rss2|atom)/?$\";s:27:\"index.php?&feed=$matches[1]\";s:8:\"embed/?$\";s:21:\"index.php?&embed=true\";s:20:\"page/?([0-9]{1,})/?$\";s:28:\"index.php?&paged=$matches[1]\";s:17:\"wc-api(/(.*))?/?$\";s:29:\"index.php?&wc-api=$matches[2]\";s:41:\"comments/feed/(feed|rdf|rss|rss2|atom)/?$\";s:42:\"index.php?&feed=$matches[1]&withcomments=1\";s:36:\"comments/(feed|rdf|rss|rss2|atom)/?$\";s:42:\"index.php?&feed=$matches[1]&withcomments=1\";s:17:\"comments/embed/?$\";s:21:\"index.php?&embed=true\";s:26:\"comments/wc-api(/(.*))?/?$\";s:29:\"index.php?&wc-api=$matches[2]\";s:44:\"search/(.+)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:40:\"index.php?s=$matches[1]&feed=$matches[2]\";s:39:\"search/(.+)/(feed|rdf|rss|rss2|atom)/?$\";s:40:\"index.php?s=$matches[1]&feed=$matches[2]\";s:20:\"search/(.+)/embed/?$\";s:34:\"index.php?s=$matches[1]&embed=true\";s:32:\"search/(.+)/page/?([0-9]{1,})/?$\";s:41:\"index.php?s=$matches[1]&paged=$matches[2]\";s:29:\"search/(.+)/wc-api(/(.*))?/?$\";s:42:\"index.php?s=$matches[1]&wc-api=$matches[3]\";s:14:\"search/(.+)/?$\";s:23:\"index.php?s=$matches[1]\";s:47:\"author/([^/]+)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:50:\"index.php?author_name=$matches[1]&feed=$matches[2]\";s:42:\"author/([^/]+)/(feed|rdf|rss|rss2|atom)/?$\";s:50:\"index.php?author_name=$matches[1]&feed=$matches[2]\";s:23:\"author/([^/]+)/embed/?$\";s:44:\"index.php?author_name=$matches[1]&embed=true\";s:35:\"author/([^/]+)/page/?([0-9]{1,})/?$\";s:51:\"index.php?author_name=$matches[1]&paged=$matches[2]\";s:32:\"author/([^/]+)/wc-api(/(.*))?/?$\";s:52:\"index.php?author_name=$matches[1]&wc-api=$matches[3]\";s:17:\"author/([^/]+)/?$\";s:33:\"index.php?author_name=$matches[1]\";s:69:\"([0-9]{4})/([0-9]{1,2})/([0-9]{1,2})/feed/(feed|rdf|rss|rss2|atom)/?$\";s:80:\"index.php?year=$matches[1]&monthnum=$matches[2]&day=$matches[3]&feed=$matches[4]\";s:64:\"([0-9]{4})/([0-9]{1,2})/([0-9]{1,2})/(feed|rdf|rss|rss2|atom)/?$\";s:80:\"index.php?year=$matches[1]&monthnum=$matches[2]&day=$matches[3]&feed=$matches[4]\";s:45:\"([0-9]{4})/([0-9]{1,2})/([0-9]{1,2})/embed/?$\";s:74:\"index.php?year=$matches[1]&monthnum=$matches[2]&day=$matches[3]&embed=true\";s:57:\"([0-9]{4})/([0-9]{1,2})/([0-9]{1,2})/page/?([0-9]{1,})/?$\";s:81:\"index.php?year=$matches[1]&monthnum=$matches[2]&day=$matches[3]&paged=$matches[4]\";s:54:\"([0-9]{4})/([0-9]{1,2})/([0-9]{1,2})/wc-api(/(.*))?/?$\";s:82:\"index.php?year=$matches[1]&monthnum=$matches[2]&day=$matches[3]&wc-api=$matches[5]\";s:39:\"([0-9]{4})/([0-9]{1,2})/([0-9]{1,2})/?$\";s:63:\"index.php?year=$matches[1]&monthnum=$matches[2]&day=$matches[3]\";s:56:\"([0-9]{4})/([0-9]{1,2})/feed/(feed|rdf|rss|rss2|atom)/?$\";s:64:\"index.php?year=$matches[1]&monthnum=$matches[2]&feed=$matches[3]\";s:51:\"([0-9]{4})/([0-9]{1,2})/(feed|rdf|rss|rss2|atom)/?$\";s:64:\"index.php?year=$matches[1]&monthnum=$matches[2]&feed=$matches[3]\";s:32:\"([0-9]{4})/([0-9]{1,2})/embed/?$\";s:58:\"index.php?year=$matches[1]&monthnum=$matches[2]&embed=true\";s:44:\"([0-9]{4})/([0-9]{1,2})/page/?([0-9]{1,})/?$\";s:65:\"index.php?year=$matches[1]&monthnum=$matches[2]&paged=$matches[3]\";s:41:\"([0-9]{4})/([0-9]{1,2})/wc-api(/(.*))?/?$\";s:66:\"index.php?year=$matches[1]&monthnum=$matches[2]&wc-api=$matches[4]\";s:26:\"([0-9]{4})/([0-9]{1,2})/?$\";s:47:\"index.php?year=$matches[1]&monthnum=$matches[2]\";s:43:\"([0-9]{4})/feed/(feed|rdf|rss|rss2|atom)/?$\";s:43:\"index.php?year=$matches[1]&feed=$matches[2]\";s:38:\"([0-9]{4})/(feed|rdf|rss|rss2|atom)/?$\";s:43:\"index.php?year=$matches[1]&feed=$matches[2]\";s:19:\"([0-9]{4})/embed/?$\";s:37:\"index.php?year=$matches[1]&embed=true\";s:31:\"([0-9]{4})/page/?([0-9]{1,})/?$\";s:44:\"index.php?year=$matches[1]&paged=$matches[2]\";s:28:\"([0-9]{4})/wc-api(/(.*))?/?$\";s:45:\"index.php?year=$matches[1]&wc-api=$matches[3]\";s:13:\"([0-9]{4})/?$\";s:26:\"index.php?year=$matches[1]\";s:27:\".?.+?/attachment/([^/]+)/?$\";s:32:\"index.php?attachment=$matches[1]\";s:37:\".?.+?/attachment/([^/]+)/trackback/?$\";s:37:\"index.php?attachment=$matches[1]&tb=1\";s:57:\".?.+?/attachment/([^/]+)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:49:\"index.php?attachment=$matches[1]&feed=$matches[2]\";s:52:\".?.+?/attachment/([^/]+)/(feed|rdf|rss|rss2|atom)/?$\";s:49:\"index.php?attachment=$matches[1]&feed=$matches[2]\";s:52:\".?.+?/attachment/([^/]+)/comment-page-([0-9]{1,})/?$\";s:50:\"index.php?attachment=$matches[1]&cpage=$matches[2]\";s:33:\".?.+?/attachment/([^/]+)/embed/?$\";s:43:\"index.php?attachment=$matches[1]&embed=true\";s:16:\"(.?.+?)/embed/?$\";s:41:\"index.php?pagename=$matches[1]&embed=true\";s:20:\"(.?.+?)/trackback/?$\";s:35:\"index.php?pagename=$matches[1]&tb=1\";s:40:\"(.?.+?)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:47:\"index.php?pagename=$matches[1]&feed=$matches[2]\";s:35:\"(.?.+?)/(feed|rdf|rss|rss2|atom)/?$\";s:47:\"index.php?pagename=$matches[1]&feed=$matches[2]\";s:28:\"(.?.+?)/page/?([0-9]{1,})/?$\";s:48:\"index.php?pagename=$matches[1]&paged=$matches[2]\";s:35:\"(.?.+?)/comment-page-([0-9]{1,})/?$\";s:48:\"index.php?pagename=$matches[1]&cpage=$matches[2]\";s:25:\"(.?.+?)/wc-api(/(.*))?/?$\";s:49:\"index.php?pagename=$matches[1]&wc-api=$matches[3]\";s:28:\"(.?.+?)/order-pay(/(.*))?/?$\";s:52:\"index.php?pagename=$matches[1]&order-pay=$matches[3]\";s:33:\"(.?.+?)/order-received(/(.*))?/?$\";s:57:\"index.php?pagename=$matches[1]&order-received=$matches[3]\";s:25:\"(.?.+?)/orders(/(.*))?/?$\";s:49:\"index.php?pagename=$matches[1]&orders=$matches[3]\";s:29:\"(.?.+?)/view-order(/(.*))?/?$\";s:53:\"index.php?pagename=$matches[1]&view-order=$matches[3]\";s:28:\"(.?.+?)/downloads(/(.*))?/?$\";s:52:\"index.php?pagename=$matches[1]&downloads=$matches[3]\";s:31:\"(.?.+?)/edit-account(/(.*))?/?$\";s:55:\"index.php?pagename=$matches[1]&edit-account=$matches[3]\";s:31:\"(.?.+?)/edit-address(/(.*))?/?$\";s:55:\"index.php?pagename=$matches[1]&edit-address=$matches[3]\";s:34:\"(.?.+?)/payment-methods(/(.*))?/?$\";s:58:\"index.php?pagename=$matches[1]&payment-methods=$matches[3]\";s:32:\"(.?.+?)/lost-password(/(.*))?/?$\";s:56:\"index.php?pagename=$matches[1]&lost-password=$matches[3]\";s:34:\"(.?.+?)/customer-logout(/(.*))?/?$\";s:58:\"index.php?pagename=$matches[1]&customer-logout=$matches[3]\";s:37:\"(.?.+?)/add-payment-method(/(.*))?/?$\";s:61:\"index.php?pagename=$matches[1]&add-payment-method=$matches[3]\";s:40:\"(.?.+?)/delete-payment-method(/(.*))?/?$\";s:64:\"index.php?pagename=$matches[1]&delete-payment-method=$matches[3]\";s:45:\"(.?.+?)/set-default-payment-method(/(.*))?/?$\";s:69:\"index.php?pagename=$matches[1]&set-default-payment-method=$matches[3]\";s:31:\".?.+?/([^/]+)/wc-api(/(.*))?/?$\";s:51:\"index.php?attachment=$matches[1]&wc-api=$matches[3]\";s:42:\".?.+?/attachment/([^/]+)/wc-api(/(.*))?/?$\";s:51:\"index.php?attachment=$matches[1]&wc-api=$matches[3]\";s:24:\"(.?.+?)(?:/([0-9]+))?/?$\";s:47:\"index.php?pagename=$matches[1]&page=$matches[2]\";s:27:\"[^/]+/attachment/([^/]+)/?$\";s:32:\"index.php?attachment=$matches[1]\";s:37:\"[^/]+/attachment/([^/]+)/trackback/?$\";s:37:\"index.php?attachment=$matches[1]&tb=1\";s:57:\"[^/]+/attachment/([^/]+)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:49:\"index.php?attachment=$matches[1]&feed=$matches[2]\";s:52:\"[^/]+/attachment/([^/]+)/(feed|rdf|rss|rss2|atom)/?$\";s:49:\"index.php?attachment=$matches[1]&feed=$matches[2]\";s:52:\"[^/]+/attachment/([^/]+)/comment-page-([0-9]{1,})/?$\";s:50:\"index.php?attachment=$matches[1]&cpage=$matches[2]\";s:33:\"[^/]+/attachment/([^/]+)/embed/?$\";s:43:\"index.php?attachment=$matches[1]&embed=true\";s:16:\"([^/]+)/embed/?$\";s:37:\"index.php?name=$matches[1]&embed=true\";s:20:\"([^/]+)/trackback/?$\";s:31:\"index.php?name=$matches[1]&tb=1\";s:40:\"([^/]+)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:43:\"index.php?name=$matches[1]&feed=$matches[2]\";s:35:\"([^/]+)/(feed|rdf|rss|rss2|atom)/?$\";s:43:\"index.php?name=$matches[1]&feed=$matches[2]\";s:28:\"([^/]+)/page/?([0-9]{1,})/?$\";s:44:\"index.php?name=$matches[1]&paged=$matches[2]\";s:35:\"([^/]+)/comment-page-([0-9]{1,})/?$\";s:44:\"index.php?name=$matches[1]&cpage=$matches[2]\";s:25:\"([^/]+)/wc-api(/(.*))?/?$\";s:45:\"index.php?name=$matches[1]&wc-api=$matches[3]\";s:31:\"[^/]+/([^/]+)/wc-api(/(.*))?/?$\";s:51:\"index.php?attachment=$matches[1]&wc-api=$matches[3]\";s:42:\"[^/]+/attachment/([^/]+)/wc-api(/(.*))?/?$\";s:51:\"index.php?attachment=$matches[1]&wc-api=$matches[3]\";s:24:\"([^/]+)(?:/([0-9]+))?/?$\";s:43:\"index.php?name=$matches[1]&page=$matches[2]\";s:16:\"[^/]+/([^/]+)/?$\";s:32:\"index.php?attachment=$matches[1]\";s:26:\"[^/]+/([^/]+)/trackback/?$\";s:37:\"index.php?attachment=$matches[1]&tb=1\";s:46:\"[^/]+/([^/]+)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:49:\"index.php?attachment=$matches[1]&feed=$matches[2]\";s:41:\"[^/]+/([^/]+)/(feed|rdf|rss|rss2|atom)/?$\";s:49:\"index.php?attachment=$matches[1]&feed=$matches[2]\";s:41:\"[^/]+/([^/]+)/comment-page-([0-9]{1,})/?$\";s:50:\"index.php?attachment=$matches[1]&cpage=$matches[2]\";s:22:\"[^/]+/([^/]+)/embed/?$\";s:43:\"index.php?attachment=$matches[1]&embed=true\";}','yes'),(30,'hack_file','0','yes'),(31,'blog_charset','UTF-8','yes'),(32,'moderation_keys','','no'),(33,'active_plugins','a:2:{i:0;s:27:\"woocommerce/woocommerce.php\";i:1;s:41:\"wordpress-importer/wordpress-importer.php\";}','yes'),(34,'category_base','','yes'),(35,'ping_sites','http://rpc.pingomatic.com/','yes'),(36,'comment_max_links','2','yes'),(37,'gmt_offset','0','yes'),(38,'default_email_category','1','yes'),(39,'recently_edited','','no'),(40,'template','twentytwentythree','yes'),(41,'stylesheet','twentytwentythree','yes'),(42,'comment_registration','0','yes'),(43,'html_type','text/html','yes'),(44,'use_trackback','0','yes'),(45,'default_role','subscriber','yes'),(46,'db_version','53496','yes'),(47,'uploads_use_yearmonth_folders','1','yes'),(48,'upload_path','','yes'),(49,'blog_public','1','yes'),(50,'default_link_category','2','yes'),(51,'show_on_front','posts','yes'),(52,'tag_base','','yes'),(53,'show_avatars','1','yes'),(54,'avatar_rating','G','yes'),(55,'upload_url_path','','yes'),(56,'thumbnail_size_w','150','yes'),(57,'thumbnail_size_h','150','yes'),(58,'thumbnail_crop','1','yes'),(59,'medium_size_w','300','yes'),(60,'medium_size_h','300','yes'),(61,'avatar_default','mystery','yes'),(62,'large_size_w','1024','yes'),(63,'large_size_h','1024','yes'),(64,'image_default_link_type','none','yes'),(65,'image_default_size','','yes'),(66,'image_default_align','','yes'),(67,'close_comments_for_old_posts','0','yes'),(68,'close_comments_days_old','14','yes'),(69,'thread_comments','1','yes'),(70,'thread_comments_depth','5','yes'),(71,'page_comments','0','yes'),(72,'comments_per_page','50','yes'),(73,'default_comments_page','newest','yes'),(74,'comment_order','asc','yes'),(75,'sticky_posts','a:0:{}','yes'),(76,'widget_categories','a:0:{}','yes'),(77,'widget_text','a:0:{}','yes'),(78,'widget_rss','a:0:{}','yes'),(79,'uninstall_plugins','a:0:{}','no'),(80,'timezone_string','','yes'),(81,'page_for_posts','0','yes'),(82,'page_on_front','0','yes'),(83,'default_post_format','0','yes'),(84,'link_manager_enabled','0','yes'),(85,'finished_splitting_shared_terms','1','yes'),(86,'site_icon','0','yes'),(87,'medium_large_size_w','768','yes'),(88,'medium_large_size_h','0','yes'),(89,'wp_page_for_privacy_policy','61','yes'),(90,'show_comments_cookies_opt_in','1','yes'),(91,'admin_email_lifespan','1701775231','yes'),(92,'disallowed_keys','','no'),(93,'comment_previously_approved','1','yes'),(94,'auto_plugin_theme_update_emails','a:0:{}','no'),(95,'auto_update_core_dev','enabled','yes'),(96,'auto_update_core_minor','enabled','yes'),(97,'auto_update_core_major','enabled','yes'),(98,'wp_force_deactivated_plugins','a:0:{}','yes'),(99,'initial_db_version','53496','yes'),(100,'wp_user_roles','a:7:{s:13:\"administrator\";a:2:{s:4:\"name\";s:13:\"Administrator\";s:12:\"capabilities\";a:114:{s:13:\"switch_themes\";b:1;s:11:\"edit_themes\";b:1;s:16:\"activate_plugins\";b:1;s:12:\"edit_plugins\";b:1;s:10:\"edit_users\";b:1;s:10:\"edit_files\";b:1;s:14:\"manage_options\";b:1;s:17:\"moderate_comments\";b:1;s:17:\"manage_categories\";b:1;s:12:\"manage_links\";b:1;s:12:\"upload_files\";b:1;s:6:\"import\";b:1;s:15:\"unfiltered_html\";b:1;s:10:\"edit_posts\";b:1;s:17:\"edit_others_posts\";b:1;s:20:\"edit_published_posts\";b:1;s:13:\"publish_posts\";b:1;s:10:\"edit_pages\";b:1;s:4:\"read\";b:1;s:8:\"level_10\";b:1;s:7:\"level_9\";b:1;s:7:\"level_8\";b:1;s:7:\"level_7\";b:1;s:7:\"level_6\";b:1;s:7:\"level_5\";b:1;s:7:\"level_4\";b:1;s:7:\"level_3\";b:1;s:7:\"level_2\";b:1;s:7:\"level_1\";b:1;s:7:\"level_0\";b:1;s:17:\"edit_others_pages\";b:1;s:20:\"edit_published_pages\";b:1;s:13:\"publish_pages\";b:1;s:12:\"delete_pages\";b:1;s:19:\"delete_others_pages\";b:1;s:22:\"delete_published_pages\";b:1;s:12:\"delete_posts\";b:1;s:19:\"delete_others_posts\";b:1;s:22:\"delete_published_posts\";b:1;s:20:\"delete_private_posts\";b:1;s:18:\"edit_private_posts\";b:1;s:18:\"read_private_posts\";b:1;s:20:\"delete_private_pages\";b:1;s:18:\"edit_private_pages\";b:1;s:18:\"read_private_pages\";b:1;s:12:\"delete_users\";b:1;s:12:\"create_users\";b:1;s:17:\"unfiltered_upload\";b:1;s:14:\"edit_dashboard\";b:1;s:14:\"update_plugins\";b:1;s:14:\"delete_plugins\";b:1;s:15:\"install_plugins\";b:1;s:13:\"update_themes\";b:1;s:14:\"install_themes\";b:1;s:11:\"update_core\";b:1;s:10:\"list_users\";b:1;s:12:\"remove_users\";b:1;s:13:\"promote_users\";b:1;s:18:\"edit_theme_options\";b:1;s:13:\"delete_themes\";b:1;s:6:\"export\";b:1;s:18:\"manage_woocommerce\";b:1;s:24:\"view_woocommerce_reports\";b:1;s:12:\"edit_product\";b:1;s:12:\"read_product\";b:1;s:14:\"delete_product\";b:1;s:13:\"edit_products\";b:1;s:20:\"edit_others_products\";b:1;s:16:\"publish_products\";b:1;s:21:\"read_private_products\";b:1;s:15:\"delete_products\";b:1;s:23:\"delete_private_products\";b:1;s:25:\"delete_published_products\";b:1;s:22:\"delete_others_products\";b:1;s:21:\"edit_private_products\";b:1;s:23:\"edit_published_products\";b:1;s:20:\"manage_product_terms\";b:1;s:18:\"edit_product_terms\";b:1;s:20:\"delete_product_terms\";b:1;s:20:\"assign_product_terms\";b:1;s:15:\"edit_shop_order\";b:1;s:15:\"read_shop_order\";b:1;s:17:\"delete_shop_order\";b:1;s:16:\"edit_shop_orders\";b:1;s:23:\"edit_others_shop_orders\";b:1;s:19:\"publish_shop_orders\";b:1;s:24:\"read_private_shop_orders\";b:1;s:18:\"delete_shop_orders\";b:1;s:26:\"delete_private_shop_orders\";b:1;s:28:\"delete_published_shop_orders\";b:1;s:25:\"delete_others_shop_orders\";b:1;s:24:\"edit_private_shop_orders\";b:1;s:26:\"edit_published_shop_orders\";b:1;s:23:\"manage_shop_order_terms\";b:1;s:21:\"edit_shop_order_terms\";b:1;s:23:\"delete_shop_order_terms\";b:1;s:23:\"assign_shop_order_terms\";b:1;s:16:\"edit_shop_coupon\";b:1;s:16:\"read_shop_coupon\";b:1;s:18:\"delete_shop_coupon\";b:1;s:17:\"edit_shop_coupons\";b:1;s:24:\"edit_others_shop_coupons\";b:1;s:20:\"publish_shop_coupons\";b:1;s:25:\"read_private_shop_coupons\";b:1;s:19:\"delete_shop_coupons\";b:1;s:27:\"delete_private_shop_coupons\";b:1;s:29:\"delete_published_shop_coupons\";b:1;s:26:\"delete_others_shop_coupons\";b:1;s:25:\"edit_private_shop_coupons\";b:1;s:27:\"edit_published_shop_coupons\";b:1;s:24:\"manage_shop_coupon_terms\";b:1;s:22:\"edit_shop_coupon_terms\";b:1;s:24:\"delete_shop_coupon_terms\";b:1;s:24:\"assign_shop_coupon_terms\";b:1;}}s:6:\"editor\";a:2:{s:4:\"name\";s:6:\"Editor\";s:12:\"capabilities\";a:34:{s:17:\"moderate_comments\";b:1;s:17:\"manage_categories\";b:1;s:12:\"manage_links\";b:1;s:12:\"upload_files\";b:1;s:15:\"unfiltered_html\";b:1;s:10:\"edit_posts\";b:1;s:17:\"edit_others_posts\";b:1;s:20:\"edit_published_posts\";b:1;s:13:\"publish_posts\";b:1;s:10:\"edit_pages\";b:1;s:4:\"read\";b:1;s:7:\"level_7\";b:1;s:7:\"level_6\";b:1;s:7:\"level_5\";b:1;s:7:\"level_4\";b:1;s:7:\"level_3\";b:1;s:7:\"level_2\";b:1;s:7:\"level_1\";b:1;s:7:\"level_0\";b:1;s:17:\"edit_others_pages\";b:1;s:20:\"edit_published_pages\";b:1;s:13:\"publish_pages\";b:1;s:12:\"delete_pages\";b:1;s:19:\"delete_others_pages\";b:1;s:22:\"delete_published_pages\";b:1;s:12:\"delete_posts\";b:1;s:19:\"delete_others_posts\";b:1;s:22:\"delete_published_posts\";b:1;s:20:\"delete_private_posts\";b:1;s:18:\"edit_private_posts\";b:1;s:18:\"read_private_posts\";b:1;s:20:\"delete_private_pages\";b:1;s:18:\"edit_private_pages\";b:1;s:18:\"read_private_pages\";b:1;}}s:6:\"author\";a:2:{s:4:\"name\";s:6:\"Author\";s:12:\"capabilities\";a:10:{s:12:\"upload_files\";b:1;s:10:\"edit_posts\";b:1;s:20:\"edit_published_posts\";b:1;s:13:\"publish_posts\";b:1;s:4:\"read\";b:1;s:7:\"level_2\";b:1;s:7:\"level_1\";b:1;s:7:\"level_0\";b:1;s:12:\"delete_posts\";b:1;s:22:\"delete_published_posts\";b:1;}}s:11:\"contributor\";a:2:{s:4:\"name\";s:11:\"Contributor\";s:12:\"capabilities\";a:5:{s:10:\"edit_posts\";b:1;s:4:\"read\";b:1;s:7:\"level_1\";b:1;s:7:\"level_0\";b:1;s:12:\"delete_posts\";b:1;}}s:10:\"subscriber\";a:2:{s:4:\"name\";s:10:\"Subscriber\";s:12:\"capabilities\";a:2:{s:4:\"read\";b:1;s:7:\"level_0\";b:1;}}s:8:\"customer\";a:2:{s:4:\"name\";s:8:\"Customer\";s:12:\"capabilities\";a:1:{s:4:\"read\";b:1;}}s:12:\"shop_manager\";a:2:{s:4:\"name\";s:12:\"Shop manager\";s:12:\"capabilities\";a:92:{s:7:\"level_9\";b:1;s:7:\"level_8\";b:1;s:7:\"level_7\";b:1;s:7:\"level_6\";b:1;s:7:\"level_5\";b:1;s:7:\"level_4\";b:1;s:7:\"level_3\";b:1;s:7:\"level_2\";b:1;s:7:\"level_1\";b:1;s:7:\"level_0\";b:1;s:4:\"read\";b:1;s:18:\"read_private_pages\";b:1;s:18:\"read_private_posts\";b:1;s:10:\"edit_posts\";b:1;s:10:\"edit_pages\";b:1;s:20:\"edit_published_posts\";b:1;s:20:\"edit_published_pages\";b:1;s:18:\"edit_private_pages\";b:1;s:18:\"edit_private_posts\";b:1;s:17:\"edit_others_posts\";b:1;s:17:\"edit_others_pages\";b:1;s:13:\"publish_posts\";b:1;s:13:\"publish_pages\";b:1;s:12:\"delete_posts\";b:1;s:12:\"delete_pages\";b:1;s:20:\"delete_private_pages\";b:1;s:20:\"delete_private_posts\";b:1;s:22:\"delete_published_pages\";b:1;s:22:\"delete_published_posts\";b:1;s:19:\"delete_others_posts\";b:1;s:19:\"delete_others_pages\";b:1;s:17:\"manage_categories\";b:1;s:12:\"manage_links\";b:1;s:17:\"moderate_comments\";b:1;s:12:\"upload_files\";b:1;s:6:\"export\";b:1;s:6:\"import\";b:1;s:10:\"list_users\";b:1;s:18:\"edit_theme_options\";b:1;s:18:\"manage_woocommerce\";b:1;s:24:\"view_woocommerce_reports\";b:1;s:12:\"edit_product\";b:1;s:12:\"read_product\";b:1;s:14:\"delete_product\";b:1;s:13:\"edit_products\";b:1;s:20:\"edit_others_products\";b:1;s:16:\"publish_products\";b:1;s:21:\"read_private_products\";b:1;s:15:\"delete_products\";b:1;s:23:\"delete_private_products\";b:1;s:25:\"delete_published_products\";b:1;s:22:\"delete_others_products\";b:1;s:21:\"edit_private_products\";b:1;s:23:\"edit_published_products\";b:1;s:20:\"manage_product_terms\";b:1;s:18:\"edit_product_terms\";b:1;s:20:\"delete_product_terms\";b:1;s:20:\"assign_product_terms\";b:1;s:15:\"edit_shop_order\";b:1;s:15:\"read_shop_order\";b:1;s:17:\"delete_shop_order\";b:1;s:16:\"edit_shop_orders\";b:1;s:23:\"edit_others_shop_orders\";b:1;s:19:\"publish_shop_orders\";b:1;s:24:\"read_private_shop_orders\";b:1;s:18:\"delete_shop_orders\";b:1;s:26:\"delete_private_shop_orders\";b:1;s:28:\"delete_published_shop_orders\";b:1;s:25:\"delete_others_shop_orders\";b:1;s:24:\"edit_private_shop_orders\";b:1;s:26:\"edit_published_shop_orders\";b:1;s:23:\"manage_shop_order_terms\";b:1;s:21:\"edit_shop_order_terms\";b:1;s:23:\"delete_shop_order_terms\";b:1;s:23:\"assign_shop_order_terms\";b:1;s:16:\"edit_shop_coupon\";b:1;s:16:\"read_shop_coupon\";b:1;s:18:\"delete_shop_coupon\";b:1;s:17:\"edit_shop_coupons\";b:1;s:24:\"edit_others_shop_coupons\";b:1;s:20:\"publish_shop_coupons\";b:1;s:25:\"read_private_shop_coupons\";b:1;s:19:\"delete_shop_coupons\";b:1;s:27:\"delete_private_shop_coupons\";b:1;s:29:\"delete_published_shop_coupons\";b:1;s:26:\"delete_others_shop_coupons\";b:1;s:25:\"edit_private_shop_coupons\";b:1;s:27:\"edit_published_shop_coupons\";b:1;s:24:\"manage_shop_coupon_terms\";b:1;s:22:\"edit_shop_coupon_terms\";b:1;s:24:\"delete_shop_coupon_terms\";b:1;s:24:\"assign_shop_coupon_terms\";b:1;}}}','yes'),(101,'fresh_site','0','yes'),(102,'user_count','1','no'),(103,'widget_block','a:6:{i:2;a:1:{s:7:\"content\";s:19:\"<!-- wp:search /-->\";}i:3;a:1:{s:7:\"content\";s:154:\"<!-- wp:group --><div class=\"wp-block-group\"><!-- wp:heading --><h2>Recent Posts</h2><!-- /wp:heading --><!-- wp:latest-posts /--></div><!-- /wp:group -->\";}i:4;a:1:{s:7:\"content\";s:227:\"<!-- wp:group --><div class=\"wp-block-group\"><!-- wp:heading --><h2>Recent Comments</h2><!-- /wp:heading --><!-- wp:latest-comments {\"displayAvatar\":false,\"displayDate\":false,\"displayExcerpt\":false} /--></div><!-- /wp:group -->\";}i:5;a:1:{s:7:\"content\";s:146:\"<!-- wp:group --><div class=\"wp-block-group\"><!-- wp:heading --><h2>Archives</h2><!-- /wp:heading --><!-- wp:archives /--></div><!-- /wp:group -->\";}i:6;a:1:{s:7:\"content\";s:150:\"<!-- wp:group --><div class=\"wp-block-group\"><!-- wp:heading --><h2>Categories</h2><!-- /wp:heading --><!-- wp:categories /--></div><!-- /wp:group -->\";}s:12:\"_multiwidget\";i:1;}','yes'),(104,'sidebars_widgets','a:4:{s:19:\"wp_inactive_widgets\";a:0:{}s:9:\"sidebar-1\";a:3:{i:0;s:7:\"block-2\";i:1;s:7:\"block-3\";i:2;s:7:\"block-4\";}s:9:\"sidebar-2\";a:2:{i:0;s:7:\"block-5\";i:1;s:7:\"block-6\";}s:13:\"array_version\";i:3;}','yes'),(105,'cron','a:13:{i:1686223233;a:6:{s:32:\"recovery_mode_clean_expired_keys\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:5:\"daily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:86400;}}s:18:\"wp_https_detection\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:10:\"twicedaily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:43200;}}s:34:\"wp_privacy_delete_old_export_files\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:6:\"hourly\";s:4:\"args\";a:0:{}s:8:\"interval\";i:3600;}}s:16:\"wp_version_check\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:10:\"twicedaily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:43200;}}s:17:\"wp_update_plugins\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:10:\"twicedaily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:43200;}}s:16:\"wp_update_themes\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:10:\"twicedaily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:43200;}}}i:1686223234;a:2:{s:26:\"action_scheduler_run_queue\";a:1:{s:32:\"0d04ed39571b55704c122d726248bbac\";a:3:{s:8:\"schedule\";s:12:\"every_minute\";s:4:\"args\";a:1:{i:0;s:7:\"WP Cron\";}s:8:\"interval\";i:60;}}s:14:\"wc_admin_daily\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:5:\"daily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:86400;}}}i:1686223244;a:3:{s:33:\"woocommerce_cleanup_personal_data\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:5:\"daily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:86400;}}s:30:\"woocommerce_tracker_send_event\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:5:\"daily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:86400;}}s:30:\"generate_category_lookup_table\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:2:{s:8:\"schedule\";b:0;s:4:\"args\";a:0:{}}}}i:1686223294;a:1:{s:25:\"woocommerce_geoip_updater\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:11:\"fifteendays\";s:4:\"args\";a:0:{}s:8:\"interval\";i:1296000;}}}i:1686226834;a:1:{s:32:\"woocommerce_cancel_unpaid_orders\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:2:{s:8:\"schedule\";b:0;s:4:\"args\";a:0:{}}}}i:1686234034;a:2:{s:24:\"woocommerce_cleanup_logs\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:5:\"daily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:86400;}}s:31:\"woocommerce_cleanup_rate_limits\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:5:\"daily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:86400;}}}i:1686244834;a:1:{s:28:\"woocommerce_cleanup_sessions\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:10:\"twicedaily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:43200;}}}i:1686268800;a:1:{s:27:\"woocommerce_scheduled_sales\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:5:\"daily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:86400;}}}i:1686309633;a:1:{s:30:\"wp_site_health_scheduled_check\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:6:\"weekly\";s:4:\"args\";a:0:{}s:8:\"interval\";i:604800;}}}i:1686584874;a:1:{s:33:\"wc_admin_process_orders_milestone\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:6:\"hourly\";s:4:\"args\";a:0:{}s:8:\"interval\";i:3600;}}}i:1686585446;a:1:{s:31:\"woocommerce_flush_rewrite_rules\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:2:{s:8:\"schedule\";b:0;s:4:\"args\";a:0:{}}}}i:1686587471;a:1:{s:8:\"do_pings\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:2:{s:8:\"schedule\";b:0;s:4:\"args\";a:0:{}}}}s:7:\"version\";i:2;}','yes'),(106,'widget_pages','a:1:{s:12:\"_multiwidget\";i:1;}','yes'),(107,'widget_calendar','a:1:{s:12:\"_multiwidget\";i:1;}','yes'),(108,'widget_archives','a:1:{s:12:\"_multiwidget\";i:1;}','yes'),(109,'widget_media_audio','a:1:{s:12:\"_multiwidget\";i:1;}','yes'),(110,'widget_media_image','a:1:{s:12:\"_multiwidget\";i:1;}','yes'),(111,'widget_media_gallery','a:1:{s:12:\"_multiwidget\";i:1;}','yes'),(112,'widget_media_video','a:1:{s:12:\"_multiwidget\";i:1;}','yes'),(113,'widget_meta','a:1:{s:12:\"_multiwidget\";i:1;}','yes'),(114,'widget_search','a:1:{s:12:\"_multiwidget\";i:1;}','yes'),(115,'widget_recent-posts','a:1:{s:12:\"_multiwidget\";i:1;}','yes'),(116,'widget_recent-comments','a:1:{s:12:\"_multiwidget\";i:1;}','yes'),(117,'widget_tag_cloud','a:1:{s:12:\"_multiwidget\";i:1;}','yes'),(118,'widget_nav_menu','a:1:{s:12:\"_multiwidget\";i:1;}','yes'),(119,'widget_custom_html','a:1:{s:12:\"_multiwidget\";i:1;}','yes'),(120,'_transient_doing_cron','1686587477.2579588890075683593750','yes'),(121,'action_scheduler_hybrid_store_demarkation','4','yes'),(122,'schema-ActionScheduler_StoreSchema','6.0.1686223234','yes'),(123,'schema-ActionScheduler_LoggerSchema','3.0.1686223234','yes'),(128,'woocommerce_schema_version','430','yes'),(129,'woocommerce_store_address','','yes'),(130,'woocommerce_store_address_2','','yes'),(131,'woocommerce_store_city','','yes'),(132,'woocommerce_default_country','US:CA','yes'),(133,'woocommerce_store_postcode','','yes'),(134,'woocommerce_allowed_countries','all','yes'),(135,'woocommerce_all_except_countries','','yes'),(136,'woocommerce_specific_allowed_countries','','yes'),(137,'woocommerce_ship_to_countries','','yes'),(138,'woocommerce_specific_ship_to_countries','','yes'),(139,'woocommerce_default_customer_address','base','yes'),(140,'woocommerce_calc_taxes','yes','yes'),(141,'woocommerce_enable_coupons','yes','yes'),(142,'woocommerce_calc_discounts_sequentially','no','no'),(143,'woocommerce_currency','USD','yes'),(144,'woocommerce_currency_pos','left','yes'),(145,'woocommerce_price_thousand_sep',',','yes'),(146,'woocommerce_price_decimal_sep','.','yes'),(147,'woocommerce_price_num_decimals','2','yes'),(148,'woocommerce_shop_page_id','54','yes'),(149,'woocommerce_cart_redirect_after_add','no','yes'),(150,'woocommerce_enable_ajax_add_to_cart','yes','yes'),(151,'woocommerce_placeholder_image','4','yes'),(152,'woocommerce_weight_unit','kg','yes'),(153,'woocommerce_dimension_unit','cm','yes'),(154,'woocommerce_enable_reviews','yes','yes'),(155,'woocommerce_review_rating_verification_label','yes','no'),(156,'woocommerce_review_rating_verification_required','no','no'),(157,'woocommerce_enable_review_rating','yes','yes'),(158,'woocommerce_review_rating_required','yes','no'),(159,'woocommerce_manage_stock','yes','yes'),(160,'woocommerce_hold_stock_minutes','60','no'),(161,'woocommerce_notify_low_stock','yes','no'),(162,'woocommerce_notify_no_stock','yes','no'),(163,'woocommerce_stock_email_recipient','wordpress@example.com','no'),(164,'woocommerce_notify_low_stock_amount','2','no'),(165,'woocommerce_notify_no_stock_amount','0','yes'),(166,'woocommerce_hide_out_of_stock_items','no','yes'),(167,'woocommerce_stock_format','','yes'),(168,'woocommerce_file_download_method','force','no'),(169,'woocommerce_downloads_redirect_fallback_allowed','no','no'),(170,'woocommerce_downloads_require_login','no','no'),(171,'woocommerce_downloads_grant_access_after_payment','yes','no'),(172,'woocommerce_downloads_deliver_inline','','no'),(173,'woocommerce_downloads_add_hash_to_filename','yes','yes'),(174,'woocommerce_attribute_lookup_enabled','no','yes'),(175,'woocommerce_attribute_lookup_direct_updates','no','yes'),(176,'woocommerce_prices_include_tax','no','yes'),(177,'woocommerce_tax_based_on','shipping','yes'),(178,'woocommerce_shipping_tax_class','inherit','yes'),(179,'woocommerce_tax_round_at_subtotal','no','yes'),(180,'woocommerce_tax_classes','','yes'),(181,'woocommerce_tax_display_shop','excl','yes'),(182,'woocommerce_tax_display_cart','excl','yes'),(183,'woocommerce_price_display_suffix','','yes'),(184,'woocommerce_tax_total_display','itemized','no'),(185,'woocommerce_enable_shipping_calc','yes','no'),(186,'woocommerce_shipping_cost_requires_address','no','yes'),(187,'woocommerce_ship_to_destination','billing','no'),(188,'woocommerce_shipping_debug_mode','no','yes'),(189,'woocommerce_enable_guest_checkout','yes','no'),(190,'woocommerce_enable_checkout_login_reminder','no','no'),(191,'woocommerce_enable_signup_and_login_from_checkout','no','no'),(192,'woocommerce_enable_myaccount_registration','no','no'),(193,'woocommerce_registration_generate_username','yes','no'),(194,'woocommerce_registration_generate_password','yes','no'),(195,'woocommerce_erasure_request_removes_order_data','no','no'),(196,'woocommerce_erasure_request_removes_download_data','no','no'),(197,'woocommerce_allow_bulk_remove_personal_data','no','no'),(198,'woocommerce_registration_privacy_policy_text','Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our [privacy_policy].','yes'),(199,'woocommerce_checkout_privacy_policy_text','Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our [privacy_policy].','yes'),(200,'woocommerce_delete_inactive_accounts','a:2:{s:6:\"number\";s:0:\"\";s:4:\"unit\";s:6:\"months\";}','no'),(201,'woocommerce_trash_pending_orders','','no'),(202,'woocommerce_trash_failed_orders','','no'),(203,'woocommerce_trash_cancelled_orders','','no'),(204,'woocommerce_anonymize_completed_orders','a:2:{s:6:\"number\";s:0:\"\";s:4:\"unit\";s:6:\"months\";}','no'),(205,'woocommerce_email_from_name','woocommerce-blocks-database','no'),(206,'woocommerce_email_from_address','wordpress@example.com','no'),(207,'woocommerce_email_header_image','','no'),(208,'woocommerce_email_footer_text','{site_title} &mdash; Built with {WooCommerce}','no'),(209,'woocommerce_email_base_color','#7f54b3','no'),(210,'woocommerce_email_background_color','#f7f7f7','no'),(211,'woocommerce_email_body_background_color','#ffffff','no'),(212,'woocommerce_email_text_color','#3c3c3c','no'),(213,'woocommerce_merchant_email_notifications','no','no'),(214,'woocommerce_cart_page_id','55','no'),(215,'woocommerce_checkout_page_id','56','no'),(216,'woocommerce_myaccount_page_id','59','no'),(217,'woocommerce_terms_page_id','60','no'),(218,'woocommerce_force_ssl_checkout','no','yes'),(219,'woocommerce_unforce_ssl_checkout','no','yes'),(220,'woocommerce_checkout_pay_endpoint','order-pay','yes'),(221,'woocommerce_checkout_order_received_endpoint','order-received','yes'),(222,'woocommerce_myaccount_add_payment_method_endpoint','add-payment-method','yes'),(223,'woocommerce_myaccount_delete_payment_method_endpoint','delete-payment-method','yes'),(224,'woocommerce_myaccount_set_default_payment_method_endpoint','set-default-payment-method','yes'),(225,'woocommerce_myaccount_orders_endpoint','orders','yes'),(226,'woocommerce_myaccount_view_order_endpoint','view-order','yes'),(227,'woocommerce_myaccount_downloads_endpoint','downloads','yes'),(228,'woocommerce_myaccount_edit_account_endpoint','edit-account','yes'),(229,'woocommerce_myaccount_edit_address_endpoint','edit-address','yes'),(230,'woocommerce_myaccount_payment_methods_endpoint','payment-methods','yes'),(231,'woocommerce_myaccount_lost_password_endpoint','lost-password','yes'),(232,'woocommerce_logout_endpoint','customer-logout','yes'),(233,'woocommerce_api_enabled','no','yes'),(234,'woocommerce_allow_tracking','no','no'),(235,'woocommerce_show_marketplace_suggestions','yes','no'),(236,'woocommerce_analytics_enabled','yes','yes'),(237,'woocommerce_navigation_enabled','no','yes'),(238,'woocommerce_new_product_management_enabled','no','yes'),(239,'woocommerce_feature_custom_order_tables_enabled','no','yes'),(240,'woocommerce_single_image_width','600','yes'),(241,'woocommerce_thumbnail_image_width','300','yes'),(242,'woocommerce_checkout_highlight_required_fields','yes','yes'),(243,'woocommerce_demo_store','no','no'),(244,'wc_downloads_approved_directories_mode','enabled','yes'),(245,'woocommerce_permalinks','a:5:{s:12:\"product_base\";s:7:\"product\";s:13:\"category_base\";s:16:\"product-category\";s:8:\"tag_base\";s:11:\"product-tag\";s:14:\"attribute_base\";s:0:\"\";s:22:\"use_verbose_page_rules\";b:0;}','yes'),(246,'current_theme_supports_woocommerce','yes','yes'),(247,'woocommerce_queue_flush_rewrite_rules','no','yes'),(252,'default_product_cat','15','yes'),(253,'woocommerce_refund_returns_page_created','9','no'),(254,'woocommerce_refund_returns_page_id','9','yes'),(255,'_transient_timeout__wc_activation_redirect','1686223265','no'),(256,'_transient__wc_activation_redirect','1','no'),(257,'woocommerce_paypal_settings','a:23:{s:7:\"enabled\";s:2:\"no\";s:5:\"title\";s:6:\"PayPal\";s:11:\"description\";s:85:\"Pay via PayPal; you can pay with your credit card if you don\'t have a PayPal account.\";s:5:\"email\";s:21:\"wordpress@example.com\";s:8:\"advanced\";s:0:\"\";s:8:\"testmode\";s:2:\"no\";s:5:\"debug\";s:2:\"no\";s:16:\"ipn_notification\";s:3:\"yes\";s:14:\"receiver_email\";s:21:\"wordpress@example.com\";s:14:\"identity_token\";s:0:\"\";s:14:\"invoice_prefix\";s:3:\"WC-\";s:13:\"send_shipping\";s:3:\"yes\";s:16:\"address_override\";s:2:\"no\";s:13:\"paymentaction\";s:4:\"sale\";s:9:\"image_url\";s:0:\"\";s:11:\"api_details\";s:0:\"\";s:12:\"api_username\";s:0:\"\";s:12:\"api_password\";s:0:\"\";s:13:\"api_signature\";s:0:\"\";s:20:\"sandbox_api_username\";s:0:\"\";s:20:\"sandbox_api_password\";s:0:\"\";s:21:\"sandbox_api_signature\";s:0:\"\";s:12:\"_should_load\";s:2:\"no\";}','yes'),(258,'woocommerce_version','7.7.2','yes'),(259,'woocommerce_db_version','7.7.2','yes'),(260,'woocommerce_admin_install_timestamp','1686223235','yes'),(261,'woocommerce_inbox_variant_assignment','5','yes'),(262,'_transient_timeout__woocommerce_upload_directory_status','1686309635','no'),(263,'_transient__woocommerce_upload_directory_status','protected','no'),(264,'_transient_woocommerce_activated_plugin','woocommerce/woocommerce.php','yes'),(265,'_transient_jetpack_autoloader_plugin_paths','a:1:{i:0;s:29:\"{{WP_PLUGIN_DIR}}/woocommerce\";}','yes'),(266,'woocommerce_admin_notices','a:2:{i:0;s:20:\"no_secure_connection\";i:1;s:14:\"template_files\";}','yes'),(267,'woocommerce_maxmind_geolocation_settings','a:1:{s:15:\"database_prefix\";s:32:\"2u3JwQ2igji1dEOf0BJdSIVDyhPYlWk0\";}','yes'),(268,'_transient_woocommerce_webhook_ids_status_active','a:0:{}','yes'),(269,'widget_woocommerce_widget_cart','a:1:{s:12:\"_multiwidget\";i:1;}','yes'),(270,'widget_woocommerce_layered_nav_filters','a:1:{s:12:\"_multiwidget\";i:1;}','yes'),(271,'widget_woocommerce_layered_nav','a:1:{s:12:\"_multiwidget\";i:1;}','yes'),(272,'widget_woocommerce_price_filter','a:1:{s:12:\"_multiwidget\";i:1;}','yes'),(273,'widget_woocommerce_product_categories','a:1:{s:12:\"_multiwidget\";i:1;}','yes'),(274,'widget_woocommerce_product_search','a:1:{s:12:\"_multiwidget\";i:1;}','yes'),(275,'widget_woocommerce_product_tag_cloud','a:1:{s:12:\"_multiwidget\";i:1;}','yes'),(276,'widget_woocommerce_products','a:1:{s:12:\"_multiwidget\";i:1;}','yes'),(277,'widget_woocommerce_recently_viewed_products','a:1:{s:12:\"_multiwidget\";i:1;}','yes'),(278,'widget_woocommerce_top_rated_products','a:1:{s:12:\"_multiwidget\";i:1;}','yes'),(279,'widget_woocommerce_recent_reviews','a:1:{s:12:\"_multiwidget\";i:1;}','yes'),(280,'widget_woocommerce_rating_filter','a:1:{s:12:\"_multiwidget\";i:1;}','yes'),(281,'_transient_timeout_as-post-store-dependencies-met','1686671274','no'),(282,'_transient_as-post-store-dependencies-met','yes','no'),(283,'_transient_shipping-transient-version','1686587493','yes'),(284,'_transient_timeout_wc_shipping_method_count_legacy','1689179494','no'),(285,'_transient_wc_shipping_method_count_legacy','a:2:{s:7:\"version\";s:10:\"1686587493\";s:5:\"value\";i:2;}','no'),(286,'_transient_timeout__woocommerce_helper_subscriptions','1686586339','no'),(287,'_transient__woocommerce_helper_subscriptions','a:0:{}','no'),(288,'_site_transient_timeout_theme_roots','1686587239','no'),(289,'_site_transient_theme_roots','a:13:{s:12:\"twentyeleven\";s:7:\"/themes\";s:13:\"twentyfifteen\";s:7:\"/themes\";s:14:\"twentyfourteen\";s:7:\"/themes\";s:14:\"twentynineteen\";s:7:\"/themes\";s:15:\"twentyseventeen\";s:7:\"/themes\";s:13:\"twentysixteen\";s:7:\"/themes\";s:9:\"twentyten\";s:7:\"/themes\";s:14:\"twentythirteen\";s:7:\"/themes\";s:12:\"twentytwelve\";s:7:\"/themes\";s:12:\"twentytwenty\";s:7:\"/themes\";s:15:\"twentytwentyone\";s:7:\"/themes\";s:17:\"twentytwentythree\";s:7:\"/themes\";s:15:\"twentytwentytwo\";s:7:\"/themes\";}','no'),(290,'_transient_timeout__woocommerce_helper_updates','1686628639','no'),(291,'_transient__woocommerce_helper_updates','a:4:{s:4:\"hash\";s:32:\"d751713988987e9331980363e24189ce\";s:7:\"updated\";i:1686585439;s:8:\"products\";a:0:{}s:6:\"errors\";a:1:{i:0;s:10:\"http-error\";}}','no'),(293,'_site_transient_update_core','O:8:\"stdClass\":4:{s:7:\"updates\";a:1:{i:0;O:8:\"stdClass\":10:{s:8:\"response\";s:6:\"latest\";s:8:\"download\";s:59:\"https://downloads.wordpress.org/release/wordpress-6.2.2.zip\";s:6:\"locale\";s:5:\"en_US\";s:8:\"packages\";O:8:\"stdClass\":5:{s:4:\"full\";s:59:\"https://downloads.wordpress.org/release/wordpress-6.2.2.zip\";s:10:\"no_content\";s:70:\"https://downloads.wordpress.org/release/wordpress-6.2.2-no-content.zip\";s:11:\"new_bundled\";s:71:\"https://downloads.wordpress.org/release/wordpress-6.2.2-new-bundled.zip\";s:7:\"partial\";s:0:\"\";s:8:\"rollback\";s:0:\"\";}s:7:\"current\";s:5:\"6.2.2\";s:7:\"version\";s:5:\"6.2.2\";s:11:\"php_version\";s:6:\"5.6.20\";s:13:\"mysql_version\";s:3:\"5.0\";s:11:\"new_bundled\";s:3:\"6.1\";s:15:\"partial_version\";s:0:\"\";}}s:12:\"last_checked\";i:1686585442;s:15:\"version_checked\";s:5:\"6.2.2\";s:12:\"translations\";a:0:{}}','no'),(295,'_site_transient_update_themes','O:8:\"stdClass\":5:{s:12:\"last_checked\";i:1686585442;s:7:\"checked\";a:13:{s:12:\"twentyeleven\";s:3:\"4.3\";s:13:\"twentyfifteen\";s:3:\"3.4\";s:14:\"twentyfourteen\";s:3:\"3.6\";s:14:\"twentynineteen\";s:3:\"2.5\";s:15:\"twentyseventeen\";s:3:\"3.2\";s:13:\"twentysixteen\";s:3:\"2.9\";s:9:\"twentyten\";s:3:\"3.8\";s:14:\"twentythirteen\";s:3:\"3.8\";s:12:\"twentytwelve\";s:3:\"3.9\";s:12:\"twentytwenty\";s:3:\"2.2\";s:15:\"twentytwentyone\";s:3:\"1.8\";s:17:\"twentytwentythree\";s:3:\"1.1\";s:15:\"twentytwentytwo\";s:3:\"1.4\";}s:8:\"response\";a:0:{}s:9:\"no_update\";a:13:{s:12:\"twentyeleven\";a:6:{s:5:\"theme\";s:12:\"twentyeleven\";s:11:\"new_version\";s:3:\"4.3\";s:3:\"url\";s:42:\"https://wordpress.org/themes/twentyeleven/\";s:7:\"package\";s:58:\"https://downloads.wordpress.org/theme/twentyeleven.4.3.zip\";s:8:\"requires\";b:0;s:12:\"requires_php\";s:5:\"5.2.4\";}s:13:\"twentyfifteen\";a:6:{s:5:\"theme\";s:13:\"twentyfifteen\";s:11:\"new_version\";s:3:\"3.4\";s:3:\"url\";s:43:\"https://wordpress.org/themes/twentyfifteen/\";s:7:\"package\";s:59:\"https://downloads.wordpress.org/theme/twentyfifteen.3.4.zip\";s:8:\"requires\";b:0;s:12:\"requires_php\";s:5:\"5.2.4\";}s:14:\"twentyfourteen\";a:6:{s:5:\"theme\";s:14:\"twentyfourteen\";s:11:\"new_version\";s:3:\"3.6\";s:3:\"url\";s:44:\"https://wordpress.org/themes/twentyfourteen/\";s:7:\"package\";s:60:\"https://downloads.wordpress.org/theme/twentyfourteen.3.6.zip\";s:8:\"requires\";b:0;s:12:\"requires_php\";s:5:\"5.2.4\";}s:14:\"twentynineteen\";a:6:{s:5:\"theme\";s:14:\"twentynineteen\";s:11:\"new_version\";s:3:\"2.5\";s:3:\"url\";s:44:\"https://wordpress.org/themes/twentynineteen/\";s:7:\"package\";s:60:\"https://downloads.wordpress.org/theme/twentynineteen.2.5.zip\";s:8:\"requires\";s:5:\"4.9.6\";s:12:\"requires_php\";s:5:\"5.2.4\";}s:15:\"twentyseventeen\";a:6:{s:5:\"theme\";s:15:\"twentyseventeen\";s:11:\"new_version\";s:3:\"3.2\";s:3:\"url\";s:45:\"https://wordpress.org/themes/twentyseventeen/\";s:7:\"package\";s:61:\"https://downloads.wordpress.org/theme/twentyseventeen.3.2.zip\";s:8:\"requires\";s:3:\"4.7\";s:12:\"requires_php\";s:5:\"5.2.4\";}s:13:\"twentysixteen\";a:6:{s:5:\"theme\";s:13:\"twentysixteen\";s:11:\"new_version\";s:3:\"2.9\";s:3:\"url\";s:43:\"https://wordpress.org/themes/twentysixteen/\";s:7:\"package\";s:59:\"https://downloads.wordpress.org/theme/twentysixteen.2.9.zip\";s:8:\"requires\";s:3:\"4.4\";s:12:\"requires_php\";s:5:\"5.2.4\";}s:9:\"twentyten\";a:6:{s:5:\"theme\";s:9:\"twentyten\";s:11:\"new_version\";s:3:\"3.8\";s:3:\"url\";s:39:\"https://wordpress.org/themes/twentyten/\";s:7:\"package\";s:55:\"https://downloads.wordpress.org/theme/twentyten.3.8.zip\";s:8:\"requires\";s:3:\"3.0\";s:12:\"requires_php\";s:5:\"5.2.4\";}s:14:\"twentythirteen\";a:6:{s:5:\"theme\";s:14:\"twentythirteen\";s:11:\"new_version\";s:3:\"3.8\";s:3:\"url\";s:44:\"https://wordpress.org/themes/twentythirteen/\";s:7:\"package\";s:60:\"https://downloads.wordpress.org/theme/twentythirteen.3.8.zip\";s:8:\"requires\";s:3:\"3.6\";s:12:\"requires_php\";s:5:\"5.2.4\";}s:12:\"twentytwelve\";a:6:{s:5:\"theme\";s:12:\"twentytwelve\";s:11:\"new_version\";s:3:\"3.9\";s:3:\"url\";s:42:\"https://wordpress.org/themes/twentytwelve/\";s:7:\"package\";s:58:\"https://downloads.wordpress.org/theme/twentytwelve.3.9.zip\";s:8:\"requires\";s:3:\"3.5\";s:12:\"requires_php\";s:5:\"5.2.4\";}s:12:\"twentytwenty\";a:6:{s:5:\"theme\";s:12:\"twentytwenty\";s:11:\"new_version\";s:3:\"2.2\";s:3:\"url\";s:42:\"https://wordpress.org/themes/twentytwenty/\";s:7:\"package\";s:58:\"https://downloads.wordpress.org/theme/twentytwenty.2.2.zip\";s:8:\"requires\";s:3:\"4.7\";s:12:\"requires_php\";s:5:\"5.2.4\";}s:15:\"twentytwentyone\";a:6:{s:5:\"theme\";s:15:\"twentytwentyone\";s:11:\"new_version\";s:3:\"1.8\";s:3:\"url\";s:45:\"https://wordpress.org/themes/twentytwentyone/\";s:7:\"package\";s:61:\"https://downloads.wordpress.org/theme/twentytwentyone.1.8.zip\";s:8:\"requires\";s:3:\"5.3\";s:12:\"requires_php\";s:3:\"5.6\";}s:17:\"twentytwentythree\";a:6:{s:5:\"theme\";s:17:\"twentytwentythree\";s:11:\"new_version\";s:3:\"1.1\";s:3:\"url\";s:47:\"https://wordpress.org/themes/twentytwentythree/\";s:7:\"package\";s:63:\"https://downloads.wordpress.org/theme/twentytwentythree.1.1.zip\";s:8:\"requires\";s:3:\"6.1\";s:12:\"requires_php\";s:3:\"5.6\";}s:15:\"twentytwentytwo\";a:6:{s:5:\"theme\";s:15:\"twentytwentytwo\";s:11:\"new_version\";s:3:\"1.4\";s:3:\"url\";s:45:\"https://wordpress.org/themes/twentytwentytwo/\";s:7:\"package\";s:61:\"https://downloads.wordpress.org/theme/twentytwentytwo.1.4.zip\";s:8:\"requires\";s:3:\"5.9\";s:12:\"requires_php\";s:3:\"5.6\";}}s:12:\"translations\";a:0:{}}','no'),(297,'_transient_wc_attribute_taxonomies','a:2:{i:0;O:8:\"stdClass\":6:{s:12:\"attribute_id\";s:1:\"1\";s:14:\"attribute_name\";s:5:\"color\";s:15:\"attribute_label\";s:5:\"Color\";s:14:\"attribute_type\";s:6:\"select\";s:17:\"attribute_orderby\";s:10:\"menu_order\";s:16:\"attribute_public\";s:1:\"0\";}i:1;O:8:\"stdClass\":6:{s:12:\"attribute_id\";s:1:\"2\";s:14:\"attribute_name\";s:4:\"size\";s:15:\"attribute_label\";s:4:\"Size\";s:14:\"attribute_type\";s:6:\"select\";s:17:\"attribute_orderby\";s:10:\"menu_order\";s:16:\"attribute_public\";s:1:\"0\";}}','yes'),(298,'_transient_product_query-transient-version','1686587489','yes'),(306,'category_children','a:0:{}','yes'),(307,'product_cat_children','a:0:{}','yes'),(309,'wp_calendar_block_has_published_posts','1','yes'),(310,'woocommerce_flat_rate_1_settings','a:3:{s:5:\"title\";s:18:\"Flat rate shipping\";s:10:\"tax_status\";s:7:\"taxable\";s:4:\"cost\";s:2:\"10\";}','yes'),(311,'woocommerce_free_shipping_2_settings','a:4:{s:5:\"title\";s:13:\"Free shipping\";s:8:\"requires\";s:0:\"\";s:10:\"min_amount\";s:1:\"0\";s:16:\"ignore_discounts\";s:2:\"no\";}','yes'),(312,'woocommerce_pickup_location_settings','a:4:{s:7:\"enabled\";s:3:\"yes\";s:5:\"title\";s:12:\"Local Pickup\";s:10:\"tax_status\";s:7:\"taxable\";s:4:\"cost\";s:0:\"\";}','yes'),(313,'pickup_location_pickup_locations','a:2:{i:0;a:4:{s:4:\"name\";s:15:\"Automattic Inc.\";s:7:\"address\";a:5:{s:9:\"address_1\";s:24:\"60 29th Street Suite 343\";s:4:\"city\";s:13:\"San Francisco\";s:5:\"state\";s:2:\"CA\";s:8:\"postcode\";s:5:\"94110\";s:7:\"country\";s:2:\"US\";}s:7:\"details\";s:0:\"\";s:7:\"enabled\";b:1;}i:1;a:4:{s:4:\"name\";s:30:\"Aut O’Mattic A8C Ireland Ltd\";s:7:\"address\";a:5:{s:9:\"address_1\";s:13:\"25 Herbert Pl\";s:4:\"city\";s:6:\"Dublin\";s:5:\"state\";s:1:\"D\";s:8:\"postcode\";s:8:\"D02 AY86\";s:7:\"country\";s:2:\"IE\";}s:7:\"details\";s:0:\"\";s:7:\"enabled\";b:1;}}','yes'),(314,'woocommerce_cod_settings','a:4:{s:7:\"enabled\";s:3:\"yes\";s:5:\"title\";s:16:\"Cash on delivery\";s:11:\"description\";s:28:\"Cash on delivery description\";s:12:\"instructions\";s:29:\"Cash on delivery instructions\";}','yes'),(315,'woocommerce_bacs_settings','a:4:{s:7:\"enabled\";s:3:\"yes\";s:5:\"title\";s:20:\"Direct bank transfer\";s:11:\"description\";s:32:\"Direct bank transfer description\";s:12:\"instructions\";s:33:\"Direct bank transfer instructions\";}','yes'),(316,'woocommerce_cheque_settings','a:4:{s:7:\"enabled\";s:3:\"yes\";s:5:\"title\";s:14:\"Check payments\";s:11:\"description\";s:26:\"Check payments description\";s:12:\"instructions\";s:27:\"Check payments instructions\";}','yes');
/*!40000 ALTER TABLE `wp_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_postmeta`
--

DROP TABLE IF EXISTS `wp_postmeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_postmeta` (
  `meta_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `post_id` bigint(20) unsigned NOT NULL DEFAULT 0,
  `meta_key` varchar(255) DEFAULT NULL,
  `meta_value` longtext DEFAULT NULL,
  PRIMARY KEY (`meta_id`),
  KEY `post_id` (`post_id`),
  KEY `meta_key` (`meta_key`(191))
) ENGINE=InnoDB AUTO_INCREMENT=1009 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_postmeta`
--

LOCK TABLES `wp_postmeta` WRITE;
/*!40000 ALTER TABLE `wp_postmeta` DISABLE KEYS */;
INSERT INTO `wp_postmeta` VALUES (1,6,'_sku','woo-vneck-tee'),(2,6,'_sale_price_dates_from',''),(3,6,'_sale_price_dates_to',''),(4,6,'total_sales','0'),(5,6,'_tax_status','taxable'),(6,6,'_tax_class',''),(7,6,'_manage_stock','no'),(8,6,'_backorders','no'),(9,6,'_low_stock_amount',''),(10,6,'_sold_individually','no'),(11,6,'_weight','0.5'),(12,6,'_length','24'),(13,6,'_width','1'),(14,6,'_height','2'),(15,6,'_upsell_ids','a:0:{}'),(16,6,'_crosssell_ids','a:0:{}'),(17,6,'_purchase_note',''),(18,6,'_default_attributes','a:0:{}'),(19,6,'_virtual','no'),(20,6,'_downloadable','no'),(21,6,'_product_image_gallery','32,33'),(22,6,'_download_limit','0'),(23,6,'_download_expiry','0'),(24,6,'_stock',''),(25,6,'_stock_status','instock'),(26,6,'_wc_average_rating','0'),(27,6,'_wc_rating_count','a:0:{}'),(28,6,'_wc_review_count','0'),(29,6,'_downloadable_files','a:0:{}'),(30,6,'_product_attributes','a:2:{s:8:\"pa_color\";a:6:{s:4:\"name\";s:8:\"pa_color\";s:5:\"value\";s:0:\"\";s:8:\"position\";i:0;s:10:\"is_visible\";i:1;s:12:\"is_variation\";i:1;s:11:\"is_taxonomy\";i:1;}s:7:\"pa_size\";a:6:{s:4:\"name\";s:7:\"pa_size\";s:5:\"value\";s:0:\"\";s:8:\"position\";i:1;s:10:\"is_visible\";i:1;s:12:\"is_variation\";i:1;s:11:\"is_taxonomy\";i:1;}}'),(31,6,'_product_version','3.5.3'),(32,6,'_thumbnail_id','31'),(33,6,'_price','15'),(34,6,'_price','20'),(35,6,'_regular_price',''),(36,6,'_sale_price',''),(37,7,'_sku','woo-hoodie'),(38,7,'_sale_price_dates_from',''),(39,7,'_sale_price_dates_to',''),(40,7,'total_sales','0'),(41,7,'_tax_status','taxable'),(42,7,'_tax_class',''),(43,7,'_manage_stock','no'),(44,7,'_backorders','no'),(45,7,'_low_stock_amount',''),(46,7,'_sold_individually','no'),(47,7,'_weight','1.5'),(48,7,'_length','10'),(49,7,'_width','8'),(50,7,'_height','3'),(51,7,'_upsell_ids','a:0:{}'),(52,7,'_crosssell_ids','a:0:{}'),(53,7,'_purchase_note',''),(54,7,'_default_attributes','a:0:{}'),(55,7,'_virtual','no'),(56,7,'_downloadable','no'),(57,7,'_product_image_gallery','35,36,37'),(58,7,'_download_limit','0'),(59,7,'_download_expiry','0'),(60,7,'_stock',''),(61,7,'_stock_status','instock'),(62,7,'_wc_average_rating','0'),(63,7,'_wc_rating_count','a:0:{}'),(64,7,'_wc_review_count','0'),(65,7,'_downloadable_files','a:0:{}'),(66,7,'_product_attributes','a:2:{s:8:\"pa_color\";a:6:{s:4:\"name\";s:8:\"pa_color\";s:5:\"value\";s:0:\"\";s:8:\"position\";i:0;s:10:\"is_visible\";i:1;s:12:\"is_variation\";i:1;s:11:\"is_taxonomy\";i:1;}s:4:\"logo\";a:6:{s:4:\"name\";s:4:\"Logo\";s:5:\"value\";s:8:\"Yes | No\";s:8:\"position\";i:1;s:10:\"is_visible\";i:1;s:12:\"is_variation\";i:1;s:11:\"is_taxonomy\";i:0;}}'),(67,7,'_product_version','3.5.3'),(68,7,'_thumbnail_id','34'),(69,7,'_price','42'),(70,7,'_price','45'),(71,7,'_regular_price',''),(72,7,'_sale_price',''),(73,8,'_sku','woo-hoodie-with-logo'),(74,8,'_regular_price','45'),(75,8,'_sale_price',''),(76,8,'_sale_price_dates_from',''),(77,8,'_sale_price_dates_to',''),(78,8,'total_sales','0'),(79,8,'_tax_status','taxable'),(80,8,'_tax_class',''),(81,8,'_manage_stock','no'),(82,8,'_backorders','no'),(83,8,'_low_stock_amount',''),(84,8,'_sold_individually','no'),(85,8,'_weight','2'),(86,8,'_length','10'),(87,8,'_width','6'),(88,8,'_height','3'),(89,8,'_upsell_ids','a:0:{}'),(90,8,'_crosssell_ids','a:0:{}'),(91,8,'_purchase_note',''),(92,8,'_default_attributes','a:0:{}'),(93,8,'_virtual','no'),(94,8,'_downloadable','no'),(95,8,'_product_image_gallery',''),(96,8,'_download_limit','0'),(97,8,'_download_expiry','0'),(98,8,'_stock',''),(99,8,'_stock_status','instock'),(100,8,'_wc_average_rating','0'),(101,8,'_wc_rating_count','a:0:{}'),(102,8,'_wc_review_count','0'),(103,8,'_downloadable_files','a:0:{}'),(104,8,'_product_attributes','a:1:{s:8:\"pa_color\";a:6:{s:4:\"name\";s:8:\"pa_color\";s:5:\"value\";s:0:\"\";s:8:\"position\";i:0;s:10:\"is_visible\";i:1;s:12:\"is_variation\";i:0;s:11:\"is_taxonomy\";i:1;}}'),(105,8,'_product_version','3.5.3'),(106,8,'_price','45'),(107,8,'_thumbnail_id','37'),(108,9,'_sku','woo-tshirt'),(109,9,'_regular_price','18'),(110,9,'_sale_price',''),(111,9,'_sale_price_dates_from',''),(112,9,'_sale_price_dates_to',''),(113,9,'total_sales','0'),(114,9,'_tax_status','taxable'),(115,9,'_tax_class',''),(116,9,'_manage_stock','no'),(117,9,'_backorders','no'),(118,9,'_low_stock_amount',''),(119,9,'_sold_individually','no'),(120,9,'_weight','0.8'),(121,9,'_length','8'),(122,9,'_width','6'),(123,9,'_height','1'),(124,9,'_upsell_ids','a:0:{}'),(125,9,'_crosssell_ids','a:0:{}'),(126,9,'_purchase_note',''),(127,9,'_default_attributes','a:0:{}'),(128,9,'_virtual','no'),(129,9,'_downloadable','no'),(130,9,'_product_image_gallery',''),(131,9,'_download_limit','0'),(132,9,'_download_expiry','0'),(133,9,'_stock',''),(134,9,'_stock_status','instock'),(135,9,'_wc_average_rating','0'),(136,9,'_wc_rating_count','a:0:{}'),(137,9,'_wc_review_count','0'),(138,9,'_downloadable_files','a:0:{}'),(139,9,'_product_attributes','a:1:{s:8:\"pa_color\";a:6:{s:4:\"name\";s:8:\"pa_color\";s:5:\"value\";s:0:\"\";s:8:\"position\";i:0;s:10:\"is_visible\";i:1;s:12:\"is_variation\";i:0;s:11:\"is_taxonomy\";i:1;}}'),(140,9,'_product_version','3.5.3'),(141,9,'_price','18'),(142,9,'_thumbnail_id','38'),(143,10,'_sku','woo-beanie'),(144,10,'_regular_price','20'),(145,10,'_sale_price','18'),(146,10,'_sale_price_dates_from',''),(147,10,'_sale_price_dates_to',''),(148,10,'total_sales','0'),(149,10,'_tax_status','taxable'),(150,10,'_tax_class',''),(151,10,'_manage_stock','no'),(152,10,'_backorders','no'),(153,10,'_low_stock_amount',''),(154,10,'_sold_individually','no'),(155,10,'_weight','0.2'),(156,10,'_length','4'),(157,10,'_width','5'),(158,10,'_height','0.5'),(159,10,'_upsell_ids','a:0:{}'),(160,10,'_crosssell_ids','a:0:{}'),(161,10,'_purchase_note',''),(162,10,'_default_attributes','a:0:{}'),(163,10,'_virtual','no'),(164,10,'_downloadable','no'),(165,10,'_product_image_gallery',''),(166,10,'_download_limit','0'),(167,10,'_download_expiry','0'),(168,10,'_stock',''),(169,10,'_stock_status','instock'),(170,10,'_wc_average_rating','0'),(171,10,'_wc_rating_count','a:0:{}'),(172,10,'_wc_review_count','0'),(173,10,'_downloadable_files','a:0:{}'),(174,10,'_product_attributes','a:1:{s:8:\"pa_color\";a:6:{s:4:\"name\";s:8:\"pa_color\";s:5:\"value\";s:0:\"\";s:8:\"position\";i:0;s:10:\"is_visible\";i:1;s:12:\"is_variation\";i:0;s:11:\"is_taxonomy\";i:1;}}'),(175,10,'_product_version','3.5.3'),(176,10,'_price','18'),(177,10,'_thumbnail_id','39'),(178,11,'_sku','woo-belt'),(179,11,'_regular_price','65'),(180,11,'_sale_price','55'),(181,11,'_sale_price_dates_from',''),(182,11,'_sale_price_dates_to',''),(183,11,'total_sales','0'),(184,11,'_tax_status','taxable'),(185,11,'_tax_class',''),(186,11,'_manage_stock','no'),(187,11,'_backorders','no'),(188,11,'_low_stock_amount',''),(189,11,'_sold_individually','no'),(190,11,'_weight','1.2'),(191,11,'_length','12'),(192,11,'_width','2'),(193,11,'_height','1.5'),(194,11,'_upsell_ids','a:0:{}'),(195,11,'_crosssell_ids','a:0:{}'),(196,11,'_purchase_note',''),(197,11,'_default_attributes','a:0:{}'),(198,11,'_virtual','no'),(199,11,'_downloadable','no'),(200,11,'_product_image_gallery',''),(201,11,'_download_limit','0'),(202,11,'_download_expiry','0'),(203,11,'_stock',''),(204,11,'_stock_status','instock'),(205,11,'_wc_average_rating','0'),(206,11,'_wc_rating_count','a:0:{}'),(207,11,'_wc_review_count','0'),(208,11,'_downloadable_files','a:0:{}'),(209,11,'_product_attributes','a:0:{}'),(210,11,'_product_version','3.5.3'),(211,11,'_price','55'),(212,11,'_thumbnail_id','40'),(213,12,'_sku','woo-cap'),(214,12,'_regular_price','18'),(215,12,'_sale_price','16'),(216,12,'_sale_price_dates_from',''),(217,12,'_sale_price_dates_to',''),(218,12,'total_sales','0'),(219,12,'_tax_status','taxable'),(220,12,'_tax_class',''),(221,12,'_manage_stock','no'),(222,12,'_backorders','no'),(223,12,'_low_stock_amount',''),(224,12,'_sold_individually','no'),(225,12,'_weight','0.6'),(226,12,'_length','8'),(227,12,'_width','6.5'),(228,12,'_height','4'),(229,12,'_upsell_ids','a:0:{}'),(230,12,'_crosssell_ids','a:0:{}'),(231,12,'_purchase_note',''),(232,12,'_default_attributes','a:0:{}'),(233,12,'_virtual','no'),(234,12,'_downloadable','no'),(235,12,'_product_image_gallery',''),(236,12,'_download_limit','0'),(237,12,'_download_expiry','0'),(238,12,'_stock',''),(239,12,'_stock_status','instock'),(240,12,'_wc_average_rating','0'),(241,12,'_wc_rating_count','a:0:{}'),(242,12,'_wc_review_count','0'),(243,12,'_downloadable_files','a:0:{}'),(244,12,'_product_attributes','a:1:{s:8:\"pa_color\";a:6:{s:4:\"name\";s:8:\"pa_color\";s:5:\"value\";s:0:\"\";s:8:\"position\";i:0;s:10:\"is_visible\";i:1;s:12:\"is_variation\";i:0;s:11:\"is_taxonomy\";i:1;}}'),(245,12,'_product_version','3.5.3'),(246,12,'_price','16'),(247,12,'_thumbnail_id','41'),(248,13,'_sku','woo-sunglasses'),(249,13,'_regular_price','90'),(250,13,'_sale_price',''),(251,13,'_sale_price_dates_from',''),(252,13,'_sale_price_dates_to',''),(253,13,'total_sales','0'),(254,13,'_tax_status','taxable'),(255,13,'_tax_class',''),(256,13,'_manage_stock','no'),(257,13,'_backorders','no'),(258,13,'_low_stock_amount',''),(259,13,'_sold_individually','no'),(260,13,'_weight','0.2'),(261,13,'_length','4'),(262,13,'_width','1.4'),(263,13,'_height','1'),(264,13,'_upsell_ids','a:0:{}'),(265,13,'_crosssell_ids','a:0:{}'),(266,13,'_purchase_note',''),(267,13,'_default_attributes','a:0:{}'),(268,13,'_virtual','no'),(269,13,'_downloadable','no'),(270,13,'_product_image_gallery',''),(271,13,'_download_limit','0'),(272,13,'_download_expiry','0'),(273,13,'_stock',''),(274,13,'_stock_status','instock'),(275,13,'_wc_average_rating','0'),(276,13,'_wc_rating_count','a:0:{}'),(277,13,'_wc_review_count','0'),(278,13,'_downloadable_files','a:0:{}'),(279,13,'_product_attributes','a:0:{}'),(280,13,'_product_version','3.5.3'),(281,13,'_price','90'),(282,13,'_thumbnail_id','42'),(283,14,'_sku','woo-hoodie-with-pocket'),(284,14,'_regular_price','45'),(285,14,'_sale_price','35'),(286,14,'_sale_price_dates_from',''),(287,14,'_sale_price_dates_to',''),(288,14,'total_sales','0'),(289,14,'_tax_status','taxable'),(290,14,'_tax_class',''),(291,14,'_manage_stock','no'),(292,14,'_backorders','no'),(293,14,'_low_stock_amount',''),(294,14,'_sold_individually','no'),(295,14,'_weight','3'),(296,14,'_length','10'),(297,14,'_width','8'),(298,14,'_height','2'),(299,14,'_upsell_ids','a:0:{}'),(300,14,'_crosssell_ids','a:0:{}'),(301,14,'_purchase_note',''),(302,14,'_default_attributes','a:0:{}'),(303,14,'_virtual','no'),(304,14,'_downloadable','no'),(305,14,'_product_image_gallery',''),(306,14,'_download_limit','0'),(307,14,'_download_expiry','0'),(308,14,'_stock',''),(309,14,'_stock_status','instock'),(310,14,'_wc_average_rating','0'),(311,14,'_wc_rating_count','a:0:{}'),(312,14,'_wc_review_count','0'),(313,14,'_downloadable_files','a:0:{}'),(314,14,'_product_attributes','a:1:{s:8:\"pa_color\";a:6:{s:4:\"name\";s:8:\"pa_color\";s:5:\"value\";s:0:\"\";s:8:\"position\";i:0;s:10:\"is_visible\";i:1;s:12:\"is_variation\";i:0;s:11:\"is_taxonomy\";i:1;}}'),(315,14,'_product_version','3.5.3'),(316,14,'_price','35'),(317,14,'_thumbnail_id','43'),(318,15,'_sku','woo-hoodie-with-zipper'),(319,15,'_regular_price','45'),(320,15,'_sale_price',''),(321,15,'_sale_price_dates_from',''),(322,15,'_sale_price_dates_to',''),(323,15,'total_sales','0'),(324,15,'_tax_status','taxable'),(325,15,'_tax_class',''),(326,15,'_manage_stock','no'),(327,15,'_backorders','no'),(328,15,'_low_stock_amount',''),(329,15,'_sold_individually','no'),(330,15,'_weight','2'),(331,15,'_length','8'),(332,15,'_width','6'),(333,15,'_height','2'),(334,15,'_upsell_ids','a:0:{}'),(335,15,'_crosssell_ids','a:0:{}'),(336,15,'_purchase_note',''),(337,15,'_default_attributes','a:0:{}'),(338,15,'_virtual','no'),(339,15,'_downloadable','no'),(340,15,'_product_image_gallery',''),(341,15,'_download_limit','0'),(342,15,'_download_expiry','0'),(343,15,'_stock',''),(344,15,'_stock_status','instock'),(345,15,'_wc_average_rating','0'),(346,15,'_wc_rating_count','a:0:{}'),(347,15,'_wc_review_count','0'),(348,15,'_downloadable_files','a:0:{}'),(349,15,'_product_attributes','a:0:{}'),(350,15,'_product_version','3.5.3'),(351,15,'_price','45'),(352,15,'_thumbnail_id','44'),(353,16,'_sku','woo-long-sleeve-tee'),(354,16,'_regular_price','25'),(355,16,'_sale_price',''),(356,16,'_sale_price_dates_from',''),(357,16,'_sale_price_dates_to',''),(358,16,'total_sales','0'),(359,16,'_tax_status','taxable'),(360,16,'_tax_class',''),(361,16,'_manage_stock','no'),(362,16,'_backorders','no'),(363,16,'_low_stock_amount',''),(364,16,'_sold_individually','no'),(365,16,'_weight','1'),(366,16,'_length','7'),(367,16,'_width','5'),(368,16,'_height','1'),(369,16,'_upsell_ids','a:0:{}'),(370,16,'_crosssell_ids','a:0:{}'),(371,16,'_purchase_note',''),(372,16,'_default_attributes','a:0:{}'),(373,16,'_virtual','no'),(374,16,'_downloadable','no'),(375,16,'_product_image_gallery',''),(376,16,'_download_limit','0'),(377,16,'_download_expiry','0'),(378,16,'_stock',''),(379,16,'_stock_status','instock'),(380,16,'_wc_average_rating','0'),(381,16,'_wc_rating_count','a:0:{}'),(382,16,'_wc_review_count','0'),(383,16,'_downloadable_files','a:0:{}'),(384,16,'_product_attributes','a:1:{s:8:\"pa_color\";a:6:{s:4:\"name\";s:8:\"pa_color\";s:5:\"value\";s:0:\"\";s:8:\"position\";i:0;s:10:\"is_visible\";i:1;s:12:\"is_variation\";i:0;s:11:\"is_taxonomy\";i:1;}}'),(385,16,'_product_version','3.5.3'),(386,16,'_price','25'),(387,16,'_thumbnail_id','45'),(388,17,'_sku','woo-polo'),(389,17,'_regular_price','20'),(390,17,'_sale_price',''),(391,17,'_sale_price_dates_from',''),(392,17,'_sale_price_dates_to',''),(393,17,'total_sales','0'),(394,17,'_tax_status','taxable'),(395,17,'_tax_class',''),(396,17,'_manage_stock','no'),(397,17,'_backorders','no'),(398,17,'_low_stock_amount',''),(399,17,'_sold_individually','no'),(400,17,'_weight','0.8'),(401,17,'_length','6'),(402,17,'_width','5'),(403,17,'_height','1'),(404,17,'_upsell_ids','a:0:{}'),(405,17,'_crosssell_ids','a:0:{}'),(406,17,'_purchase_note',''),(407,17,'_default_attributes','a:0:{}'),(408,17,'_virtual','no'),(409,17,'_downloadable','no'),(410,17,'_product_image_gallery',''),(411,17,'_download_limit','0'),(412,17,'_download_expiry','0'),(413,17,'_stock',''),(414,17,'_stock_status','instock'),(415,17,'_wc_average_rating','0'),(416,17,'_wc_rating_count','a:0:{}'),(417,17,'_wc_review_count','0'),(418,17,'_downloadable_files','a:0:{}'),(419,17,'_product_attributes','a:1:{s:8:\"pa_color\";a:6:{s:4:\"name\";s:8:\"pa_color\";s:5:\"value\";s:0:\"\";s:8:\"position\";i:0;s:10:\"is_visible\";i:1;s:12:\"is_variation\";i:0;s:11:\"is_taxonomy\";i:1;}}'),(420,17,'_product_version','3.5.3'),(421,17,'_price','20'),(422,17,'_thumbnail_id','46'),(423,18,'_sku','woo-album'),(424,18,'_regular_price','15'),(425,18,'_sale_price',''),(426,18,'_sale_price_dates_from',''),(427,18,'_sale_price_dates_to',''),(428,18,'total_sales','0'),(429,18,'_tax_status','taxable'),(430,18,'_tax_class',''),(431,18,'_manage_stock','no'),(432,18,'_backorders','no'),(433,18,'_low_stock_amount',''),(434,18,'_sold_individually','no'),(435,18,'_weight',''),(436,18,'_length',''),(437,18,'_width',''),(438,18,'_height',''),(439,18,'_upsell_ids','a:0:{}'),(440,18,'_crosssell_ids','a:0:{}'),(441,18,'_purchase_note',''),(442,18,'_default_attributes','a:0:{}'),(443,18,'_virtual','yes'),(444,18,'_downloadable','yes'),(445,18,'_product_image_gallery',''),(446,18,'_download_limit','1'),(447,18,'_download_expiry','1'),(448,18,'_stock',''),(449,18,'_stock_status','instock'),(450,18,'_wc_average_rating','0'),(451,18,'_wc_rating_count','a:0:{}'),(452,18,'_wc_review_count','0'),(453,18,'_downloadable_files','a:2:{s:36:\"356506a5-cc15-41b9-801b-9104dda1702c\";a:3:{s:2:\"id\";s:36:\"356506a5-cc15-41b9-801b-9104dda1702c\";s:4:\"name\";s:8:\"Single 1\";s:4:\"file\";s:85:\"https://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2017/08/single.jpg\";}s:36:\"18e70c59-59f3-43a3-8525-ce1ea0c12943\";a:3:{s:2:\"id\";s:36:\"18e70c59-59f3-43a3-8525-ce1ea0c12943\";s:4:\"name\";s:8:\"Single 2\";s:4:\"file\";s:84:\"https://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2017/08/album.jpg\";}}'),(454,18,'_product_attributes','a:0:{}'),(455,18,'_product_version','3.5.3'),(456,18,'_price','15'),(457,18,'_thumbnail_id','47'),(458,19,'_sku','woo-single'),(459,19,'_regular_price','3'),(460,19,'_sale_price','2'),(461,19,'_sale_price_dates_from',''),(462,19,'_sale_price_dates_to',''),(463,19,'total_sales','0'),(464,19,'_tax_status','taxable'),(465,19,'_tax_class',''),(466,19,'_manage_stock','no'),(467,19,'_backorders','no'),(468,19,'_low_stock_amount',''),(469,19,'_sold_individually','no'),(470,19,'_weight',''),(471,19,'_length',''),(472,19,'_width',''),(473,19,'_height',''),(474,19,'_upsell_ids','a:0:{}'),(475,19,'_crosssell_ids','a:0:{}'),(476,19,'_purchase_note',''),(477,19,'_default_attributes','a:0:{}'),(478,19,'_virtual','yes'),(479,19,'_downloadable','yes'),(480,19,'_product_image_gallery',''),(481,19,'_download_limit','1'),(482,19,'_download_expiry','1'),(483,19,'_stock',''),(484,19,'_stock_status','instock'),(485,19,'_wc_average_rating','0'),(486,19,'_wc_rating_count','a:0:{}'),(487,19,'_wc_review_count','0'),(488,19,'_downloadable_files','a:1:{s:36:\"a0fdda89-5f0e-440d-93f5-188e12c910d1\";a:3:{s:2:\"id\";s:36:\"a0fdda89-5f0e-440d-93f5-188e12c910d1\";s:4:\"name\";s:6:\"Single\";s:4:\"file\";s:85:\"https://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2017/08/single.jpg\";}}'),(489,19,'_product_attributes','a:0:{}'),(490,19,'_product_version','3.5.3'),(491,19,'_price','2'),(492,19,'_thumbnail_id','48'),(493,20,'_sku','woo-vneck-tee-red'),(494,20,'_regular_price','20'),(495,20,'_sale_price',''),(496,20,'_sale_price_dates_from',''),(497,20,'_sale_price_dates_to',''),(498,20,'total_sales','0'),(499,20,'_tax_status','taxable'),(500,20,'_tax_class',''),(501,20,'_manage_stock','no'),(502,20,'_backorders','no'),(503,20,'_low_stock_amount',''),(504,20,'_sold_individually','no'),(505,20,'_weight',''),(506,20,'_length',''),(507,20,'_width',''),(508,20,'_height',''),(509,20,'_upsell_ids','a:0:{}'),(510,20,'_crosssell_ids','a:0:{}'),(511,20,'_purchase_note',''),(512,20,'_default_attributes','a:0:{}'),(513,20,'_virtual','no'),(514,20,'_downloadable','no'),(515,20,'_product_image_gallery',''),(516,20,'_download_limit','0'),(517,20,'_download_expiry','0'),(518,20,'_stock',''),(519,20,'_stock_status','instock'),(520,20,'_wc_average_rating','0'),(521,20,'_wc_rating_count','a:0:{}'),(522,20,'_wc_review_count','0'),(523,20,'_downloadable_files','a:0:{}'),(524,20,'_product_attributes','a:0:{}'),(525,20,'_product_version','3.5.3'),(526,20,'_price','20'),(527,20,'_variation_description','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sagittis orci ac odio dictum tincidunt. Donec ut metus leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed luctus, dui eu sagittis sodales, nulla nibh sagittis augue, vel porttitor diam enim non metus. Vestibulum aliquam augue neque. Phasellus tincidunt odio eget ullamcorper efficitur. Cras placerat ut turpis pellentesque vulputate. Nam sed consequat tortor. Curabitur finibus sapien dolor. Ut eleifend tellus nec erat pulvinar dignissim. Nam non arcu purus. Vivamus et massa massa.'),(528,20,'_thumbnail_id','31'),(529,20,'attribute_pa_color','red'),(530,20,'attribute_pa_size',''),(531,21,'_sku','woo-vneck-tee-green'),(532,21,'_regular_price','20'),(533,21,'_sale_price',''),(534,21,'_sale_price_dates_from',''),(535,21,'_sale_price_dates_to',''),(536,21,'total_sales','0'),(537,21,'_tax_status','taxable'),(538,21,'_tax_class',''),(539,21,'_manage_stock','no'),(540,21,'_backorders','no'),(541,21,'_low_stock_amount',''),(542,21,'_sold_individually','no'),(543,21,'_weight',''),(544,21,'_length',''),(545,21,'_width',''),(546,21,'_height',''),(547,21,'_upsell_ids','a:0:{}'),(548,21,'_crosssell_ids','a:0:{}'),(549,21,'_purchase_note',''),(550,21,'_default_attributes','a:0:{}'),(551,21,'_virtual','no'),(552,21,'_downloadable','no'),(553,21,'_product_image_gallery',''),(554,21,'_download_limit','0'),(555,21,'_download_expiry','0'),(556,21,'_stock',''),(557,21,'_stock_status','instock'),(558,21,'_wc_average_rating','0'),(559,21,'_wc_rating_count','a:0:{}'),(560,21,'_wc_review_count','0'),(561,21,'_downloadable_files','a:0:{}'),(562,21,'_product_attributes','a:0:{}'),(563,21,'_product_version','3.5.3'),(564,21,'_price','20'),(565,21,'_variation_description','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sagittis orci ac odio dictum tincidunt. Donec ut metus leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed luctus, dui eu sagittis sodales, nulla nibh sagittis augue, vel porttitor diam enim non metus. Vestibulum aliquam augue neque. Phasellus tincidunt odio eget ullamcorper efficitur. Cras placerat ut turpis pellentesque vulputate. Nam sed consequat tortor. Curabitur finibus sapien dolor. Ut eleifend tellus nec erat pulvinar dignissim. Nam non arcu purus. Vivamus et massa massa.'),(566,21,'_thumbnail_id','32'),(567,21,'attribute_pa_color','green'),(568,21,'attribute_pa_size',''),(569,22,'_sku','woo-vneck-tee-blue'),(570,22,'_regular_price','15'),(571,22,'_sale_price',''),(572,22,'_sale_price_dates_from',''),(573,22,'_sale_price_dates_to',''),(574,22,'total_sales','0'),(575,22,'_tax_status','taxable'),(576,22,'_tax_class',''),(577,22,'_manage_stock','no'),(578,22,'_backorders','no'),(579,22,'_low_stock_amount',''),(580,22,'_sold_individually','no'),(581,22,'_weight',''),(582,22,'_length',''),(583,22,'_width',''),(584,22,'_height',''),(585,22,'_upsell_ids','a:0:{}'),(586,22,'_crosssell_ids','a:0:{}'),(587,22,'_purchase_note',''),(588,22,'_default_attributes','a:0:{}'),(589,22,'_virtual','no'),(590,22,'_downloadable','no'),(591,22,'_product_image_gallery',''),(592,22,'_download_limit','0'),(593,22,'_download_expiry','0'),(594,22,'_stock',''),(595,22,'_stock_status','instock'),(596,22,'_wc_average_rating','0'),(597,22,'_wc_rating_count','a:0:{}'),(598,22,'_wc_review_count','0'),(599,22,'_downloadable_files','a:0:{}'),(600,22,'_product_attributes','a:0:{}'),(601,22,'_product_version','3.5.3'),(602,22,'_price','15'),(603,22,'_wpcom_is_markdown',''),(604,22,'_wp_old_slug','import-placeholder-for-78'),(605,22,'_variation_description','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sagittis orci ac odio dictum tincidunt. Donec ut metus leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed luctus, dui eu sagittis sodales, nulla nibh sagittis augue, vel porttitor diam enim non metus. Vestibulum aliquam augue neque. Phasellus tincidunt odio eget ullamcorper efficitur. Cras placerat ut turpis pellentesque vulputate. Nam sed consequat tortor. Curabitur finibus sapien dolor. Ut eleifend tellus nec erat pulvinar dignissim. Nam non arcu purus. Vivamus et massa massa.'),(606,22,'_thumbnail_id','33'),(607,22,'attribute_pa_color','blue'),(608,22,'attribute_pa_size',''),(609,23,'_sku','woo-hoodie-red'),(610,23,'_regular_price','45'),(611,23,'_sale_price','42'),(612,23,'_sale_price_dates_from',''),(613,23,'_sale_price_dates_to',''),(614,23,'total_sales','0'),(615,23,'_tax_status','taxable'),(616,23,'_tax_class',''),(617,23,'_manage_stock','no'),(618,23,'_backorders','no'),(619,23,'_low_stock_amount',''),(620,23,'_sold_individually','no'),(621,23,'_weight',''),(622,23,'_length',''),(623,23,'_width',''),(624,23,'_height',''),(625,23,'_upsell_ids','a:0:{}'),(626,23,'_crosssell_ids','a:0:{}'),(627,23,'_purchase_note',''),(628,23,'_default_attributes','a:0:{}'),(629,23,'_virtual','no'),(630,23,'_downloadable','no'),(631,23,'_product_image_gallery',''),(632,23,'_download_limit','0'),(633,23,'_download_expiry','0'),(634,23,'_stock',''),(635,23,'_stock_status','instock'),(636,23,'_wc_average_rating','0'),(637,23,'_wc_rating_count','a:0:{}'),(638,23,'_wc_review_count','0'),(639,23,'_downloadable_files','a:0:{}'),(640,23,'_product_attributes','a:0:{}'),(641,23,'_product_version','3.5.3'),(642,23,'_price','42'),(643,23,'_variation_description','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sagittis orci ac odio dictum tincidunt. Donec ut metus leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed luctus, dui eu sagittis sodales, nulla nibh sagittis augue, vel porttitor diam enim non metus. Vestibulum aliquam augue neque. Phasellus tincidunt odio eget ullamcorper efficitur. Cras placerat ut turpis pellentesque vulputate. Nam sed consequat tortor. Curabitur finibus sapien dolor. Ut eleifend tellus nec erat pulvinar dignissim. Nam non arcu purus. Vivamus et massa massa.'),(644,23,'_thumbnail_id','34'),(645,23,'attribute_pa_color','red'),(646,23,'attribute_logo','No'),(647,24,'_sku','woo-hoodie-green'),(648,24,'_regular_price','45'),(649,24,'_sale_price',''),(650,24,'_sale_price_dates_from',''),(651,24,'_sale_price_dates_to',''),(652,24,'total_sales','0'),(653,24,'_tax_status','taxable'),(654,24,'_tax_class',''),(655,24,'_manage_stock','no'),(656,24,'_backorders','no'),(657,24,'_low_stock_amount',''),(658,24,'_sold_individually','no'),(659,24,'_weight',''),(660,24,'_length',''),(661,24,'_width',''),(662,24,'_height',''),(663,24,'_upsell_ids','a:0:{}'),(664,24,'_crosssell_ids','a:0:{}'),(665,24,'_purchase_note',''),(666,24,'_default_attributes','a:0:{}'),(667,24,'_virtual','no'),(668,24,'_downloadable','no'),(669,24,'_product_image_gallery',''),(670,24,'_download_limit','0'),(671,24,'_download_expiry','0'),(672,24,'_stock',''),(673,24,'_stock_status','instock'),(674,24,'_wc_average_rating','0'),(675,24,'_wc_rating_count','a:0:{}'),(676,24,'_wc_review_count','0'),(677,24,'_downloadable_files','a:0:{}'),(678,24,'_product_attributes','a:0:{}'),(679,24,'_product_version','3.5.3'),(680,24,'_price','45'),(681,24,'_variation_description','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sagittis orci ac odio dictum tincidunt. Donec ut metus leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed luctus, dui eu sagittis sodales, nulla nibh sagittis augue, vel porttitor diam enim non metus. Vestibulum aliquam augue neque. Phasellus tincidunt odio eget ullamcorper efficitur. Cras placerat ut turpis pellentesque vulputate. Nam sed consequat tortor. Curabitur finibus sapien dolor. Ut eleifend tellus nec erat pulvinar dignissim. Nam non arcu purus. Vivamus et massa massa.'),(682,24,'_thumbnail_id','36'),(683,24,'attribute_pa_color','green'),(684,24,'attribute_logo','No'),(685,25,'_sku','woo-hoodie-blue'),(686,25,'_regular_price','45'),(687,25,'_sale_price',''),(688,25,'_sale_price_dates_from',''),(689,25,'_sale_price_dates_to',''),(690,25,'total_sales','0'),(691,25,'_tax_status','taxable'),(692,25,'_tax_class',''),(693,25,'_manage_stock','no'),(694,25,'_backorders','no'),(695,25,'_low_stock_amount',''),(696,25,'_sold_individually','no'),(697,25,'_weight',''),(698,25,'_length',''),(699,25,'_width',''),(700,25,'_height',''),(701,25,'_upsell_ids','a:0:{}'),(702,25,'_crosssell_ids','a:0:{}'),(703,25,'_purchase_note',''),(704,25,'_default_attributes','a:0:{}'),(705,25,'_virtual','no'),(706,25,'_downloadable','no'),(707,25,'_product_image_gallery',''),(708,25,'_download_limit','0'),(709,25,'_download_expiry','0'),(710,25,'_stock',''),(711,25,'_stock_status','instock'),(712,25,'_wc_average_rating','0'),(713,25,'_wc_rating_count','a:0:{}'),(714,25,'_wc_review_count','0'),(715,25,'_downloadable_files','a:0:{}'),(716,25,'_product_attributes','a:0:{}'),(717,25,'_product_version','3.5.3'),(718,25,'_price','45'),(719,25,'_variation_description','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sagittis orci ac odio dictum tincidunt. Donec ut metus leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed luctus, dui eu sagittis sodales, nulla nibh sagittis augue, vel porttitor diam enim non metus. Vestibulum aliquam augue neque. Phasellus tincidunt odio eget ullamcorper efficitur. Cras placerat ut turpis pellentesque vulputate. Nam sed consequat tortor. Curabitur finibus sapien dolor. Ut eleifend tellus nec erat pulvinar dignissim. Nam non arcu purus. Vivamus et massa massa.'),(720,25,'_thumbnail_id','35'),(721,25,'attribute_pa_color','blue'),(722,25,'attribute_logo','No'),(723,26,'_sku','Woo-tshirt-logo'),(724,26,'_regular_price','18'),(725,26,'_sale_price',''),(726,26,'_sale_price_dates_from',''),(727,26,'_sale_price_dates_to',''),(728,26,'total_sales','0'),(729,26,'_tax_status','taxable'),(730,26,'_tax_class',''),(731,26,'_manage_stock','no'),(732,26,'_backorders','no'),(733,26,'_low_stock_amount',''),(734,26,'_sold_individually','no'),(735,26,'_weight','0.5'),(736,26,'_length','10'),(737,26,'_width','12'),(738,26,'_height','0.5'),(739,26,'_upsell_ids','a:0:{}'),(740,26,'_crosssell_ids','a:0:{}'),(741,26,'_purchase_note',''),(742,26,'_default_attributes','a:0:{}'),(743,26,'_virtual','no'),(744,26,'_downloadable','no'),(745,26,'_product_image_gallery',''),(746,26,'_download_limit','0'),(747,26,'_download_expiry','0'),(748,26,'_stock',''),(749,26,'_stock_status','instock'),(750,26,'_wc_average_rating','0'),(751,26,'_wc_rating_count','a:0:{}'),(752,26,'_wc_review_count','0'),(753,26,'_downloadable_files','a:0:{}'),(754,26,'_product_attributes','a:1:{s:8:\"pa_color\";a:6:{s:4:\"name\";s:8:\"pa_color\";s:5:\"value\";s:0:\"\";s:8:\"position\";i:0;s:10:\"is_visible\";i:1;s:12:\"is_variation\";i:0;s:11:\"is_taxonomy\";i:1;}}'),(755,26,'_product_version','3.5.3'),(756,26,'_price','18'),(757,26,'_thumbnail_id','49'),(758,27,'_sku','Woo-beanie-logo'),(759,27,'_regular_price','20'),(760,27,'_sale_price','18'),(761,27,'_sale_price_dates_from',''),(762,27,'_sale_price_dates_to',''),(763,27,'total_sales','0'),(764,27,'_tax_status','taxable'),(765,27,'_tax_class',''),(766,27,'_manage_stock','no'),(767,27,'_backorders','no'),(768,27,'_low_stock_amount',''),(769,27,'_sold_individually','no'),(770,27,'_weight','0.2'),(771,27,'_length','6'),(772,27,'_width','4'),(773,27,'_height','1'),(774,27,'_upsell_ids','a:0:{}'),(775,27,'_crosssell_ids','a:0:{}'),(776,27,'_purchase_note',''),(777,27,'_default_attributes','a:0:{}'),(778,27,'_virtual','no'),(779,27,'_downloadable','no'),(780,27,'_product_image_gallery',''),(781,27,'_download_limit','0'),(782,27,'_download_expiry','0'),(783,27,'_stock',''),(784,27,'_stock_status','instock'),(785,27,'_wc_average_rating','0'),(786,27,'_wc_rating_count','a:0:{}'),(787,27,'_wc_review_count','0'),(788,27,'_downloadable_files','a:0:{}'),(789,27,'_product_attributes','a:1:{s:8:\"pa_color\";a:6:{s:4:\"name\";s:8:\"pa_color\";s:5:\"value\";s:0:\"\";s:8:\"position\";i:0;s:10:\"is_visible\";i:1;s:12:\"is_variation\";i:0;s:11:\"is_taxonomy\";i:1;}}'),(790,27,'_product_version','3.5.3'),(791,27,'_price','18'),(792,27,'_thumbnail_id','50'),(793,28,'_sku','logo-collection'),(794,28,'_sale_price_dates_from',''),(795,28,'_sale_price_dates_to',''),(796,28,'total_sales','0'),(797,28,'_tax_status','taxable'),(798,28,'_tax_class',''),(799,28,'_manage_stock','no'),(800,28,'_backorders','no'),(801,28,'_low_stock_amount',''),(802,28,'_sold_individually','no'),(803,28,'_weight',''),(804,28,'_length',''),(805,28,'_width',''),(806,28,'_height',''),(807,28,'_upsell_ids','a:0:{}'),(808,28,'_crosssell_ids','a:0:{}'),(809,28,'_purchase_note',''),(810,28,'_default_attributes','a:0:{}'),(811,28,'_virtual','no'),(812,28,'_downloadable','no'),(813,28,'_product_image_gallery','50,49,37'),(814,28,'_download_limit','0'),(815,28,'_download_expiry','0'),(816,28,'_stock',''),(817,28,'_stock_status','instock'),(818,28,'_wc_average_rating','0'),(819,28,'_wc_rating_count','a:0:{}'),(820,28,'_wc_review_count','0'),(821,28,'_downloadable_files','a:0:{}'),(822,28,'_product_attributes','a:0:{}'),(823,28,'_product_version','3.5.3'),(824,28,'_children','a:3:{i:0;i:8;i:1;i:9;i:2;i:10;}'),(825,28,'_thumbnail_id','51'),(826,28,'_price','18'),(827,28,'_price','45'),(828,29,'_sku','wp-pennant'),(829,29,'_regular_price','11.05'),(830,29,'_sale_price',''),(831,29,'_sale_price_dates_from',''),(832,29,'_sale_price_dates_to',''),(833,29,'total_sales','0'),(834,29,'_tax_status','taxable'),(835,29,'_tax_class',''),(836,29,'_manage_stock','no'),(837,29,'_backorders','no'),(838,29,'_low_stock_amount',''),(839,29,'_sold_individually','no'),(840,29,'_weight',''),(841,29,'_length',''),(842,29,'_width',''),(843,29,'_height',''),(844,29,'_upsell_ids','a:0:{}'),(845,29,'_crosssell_ids','a:0:{}'),(846,29,'_purchase_note',''),(847,29,'_default_attributes','a:0:{}'),(848,29,'_virtual','no'),(849,29,'_downloadable','no'),(850,29,'_product_image_gallery',''),(851,29,'_download_limit','0'),(852,29,'_download_expiry','0'),(853,29,'_stock',''),(854,29,'_stock_status','instock'),(855,29,'_wc_average_rating','0'),(856,29,'_wc_rating_count','a:0:{}'),(857,29,'_wc_review_count','0'),(858,29,'_downloadable_files','a:0:{}'),(859,29,'_product_attributes','a:0:{}'),(860,29,'_product_version','3.5.3'),(861,29,'_price','11.05'),(862,29,'_thumbnail_id','52'),(863,29,'_product_url','https://mercantile.wordpress.org/product/wordpress-pennant/'),(864,29,'_button_text','Buy on the WordPress swag store!'),(865,30,'_sku','woo-hoodie-blue-logo'),(866,30,'_regular_price','45'),(867,30,'_sale_price',''),(868,30,'_sale_price_dates_from',''),(869,30,'_sale_price_dates_to',''),(870,30,'total_sales','0'),(871,30,'_tax_status','taxable'),(872,30,'_tax_class',''),(873,30,'_manage_stock','no'),(874,30,'_backorders','no'),(875,30,'_low_stock_amount',''),(876,30,'_sold_individually','no'),(877,30,'_weight',''),(878,30,'_length',''),(879,30,'_width',''),(880,30,'_height',''),(881,30,'_upsell_ids','a:0:{}'),(882,30,'_crosssell_ids','a:0:{}'),(883,30,'_purchase_note',''),(884,30,'_default_attributes','a:0:{}'),(885,30,'_virtual','no'),(886,30,'_downloadable','no'),(887,30,'_product_image_gallery',''),(888,30,'_download_limit','0'),(889,30,'_download_expiry','0'),(890,30,'_stock',''),(891,30,'_stock_status','instock'),(892,30,'_wc_average_rating','0'),(893,30,'_wc_rating_count','a:0:{}'),(894,30,'_wc_review_count','0'),(895,30,'_downloadable_files','a:0:{}'),(896,30,'_product_attributes','a:0:{}'),(897,30,'_product_version','3.5.3'),(898,30,'_price','45'),(899,30,'_variation_description','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sagittis orci ac odio dictum tincidunt. Donec ut metus leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed luctus, dui eu sagittis sodales, nulla nibh sagittis augue, vel porttitor diam enim non metus. Vestibulum aliquam augue neque. Phasellus tincidunt odio eget ullamcorper efficitur. Cras placerat ut turpis pellentesque vulputate. Nam sed consequat tortor. Curabitur finibus sapien dolor. Ut eleifend tellus nec erat pulvinar dignissim. Nam non arcu purus. Vivamus et massa massa.'),(900,30,'_thumbnail_id','37'),(901,30,'attribute_pa_color','blue'),(902,30,'attribute_logo','Yes'),(903,31,'_wp_attached_file','2019/01/vneck-tee-2-1.jpg'),(904,31,'_wp_attachment_metadata','a:6:{s:5:\"width\";i:801;s:6:\"height\";i:800;s:4:\"file\";s:25:\"2019/01/vneck-tee-2-1.jpg\";s:8:\"filesize\";i:49497;s:5:\"sizes\";a:6:{s:6:\"medium\";a:5:{s:4:\"file\";s:25:\"vneck-tee-2-1-300x300.jpg\";s:5:\"width\";i:300;s:6:\"height\";i:300;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:7860;}s:9:\"thumbnail\";a:5:{s:4:\"file\";s:25:\"vneck-tee-2-1-150x150.jpg\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:3139;}s:12:\"medium_large\";a:5:{s:4:\"file\";s:25:\"vneck-tee-2-1-768x767.jpg\";s:5:\"width\";i:768;s:6:\"height\";i:767;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:29326;}s:21:\"woocommerce_thumbnail\";a:6:{s:4:\"file\";s:25:\"vneck-tee-2-1-450x450.jpg\";s:5:\"width\";i:450;s:6:\"height\";i:450;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:14026;s:9:\"uncropped\";b:0;}s:18:\"woocommerce_single\";a:5:{s:4:\"file\";s:25:\"vneck-tee-2-1-600x599.jpg\";s:5:\"width\";i:600;s:6:\"height\";i:599;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:20713;}s:29:\"woocommerce_gallery_thumbnail\";a:5:{s:4:\"file\";s:25:\"vneck-tee-2-1-100x100.jpg\";s:5:\"width\";i:100;s:6:\"height\";i:100;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:1982;}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}'),(905,31,'_wc_attachment_source','https://woocommercecore.mystagingwebsite.com/wp-content/uploads/2017/12/vneck-tee-2.jpg'),(906,32,'_wp_attached_file','2019/01/vnech-tee-green-1-1.jpg'),(907,32,'_wp_attachment_metadata','a:6:{s:5:\"width\";i:800;s:6:\"height\";i:800;s:4:\"file\";s:31:\"2019/01/vnech-tee-green-1-1.jpg\";s:8:\"filesize\";i:102362;s:5:\"sizes\";a:6:{s:6:\"medium\";a:5:{s:4:\"file\";s:31:\"vnech-tee-green-1-1-300x300.jpg\";s:5:\"width\";i:300;s:6:\"height\";i:300;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:7280;}s:9:\"thumbnail\";a:5:{s:4:\"file\";s:31:\"vnech-tee-green-1-1-150x150.jpg\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:2833;}s:12:\"medium_large\";a:5:{s:4:\"file\";s:31:\"vnech-tee-green-1-1-768x768.jpg\";s:5:\"width\";i:768;s:6:\"height\";i:768;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:28489;}s:21:\"woocommerce_thumbnail\";a:6:{s:4:\"file\";s:31:\"vnech-tee-green-1-1-450x450.jpg\";s:5:\"width\";i:450;s:6:\"height\";i:450;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:13406;s:9:\"uncropped\";b:0;}s:18:\"woocommerce_single\";a:5:{s:4:\"file\";s:31:\"vnech-tee-green-1-1-600x600.jpg\";s:5:\"width\";i:600;s:6:\"height\";i:600;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:20267;}s:29:\"woocommerce_gallery_thumbnail\";a:5:{s:4:\"file\";s:31:\"vnech-tee-green-1-1-100x100.jpg\";s:5:\"width\";i:100;s:6:\"height\";i:100;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:1814;}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}'),(908,32,'_wc_attachment_source','https://woocommercecore.mystagingwebsite.com/wp-content/uploads/2017/12/vnech-tee-green-1.jpg'),(909,33,'_wp_attached_file','2019/01/vnech-tee-blue-1-1.jpg'),(910,33,'_wp_attachment_metadata','a:6:{s:5:\"width\";i:800;s:6:\"height\";i:800;s:4:\"file\";s:30:\"2019/01/vnech-tee-blue-1-1.jpg\";s:8:\"filesize\";i:120226;s:5:\"sizes\";a:6:{s:6:\"medium\";a:5:{s:4:\"file\";s:30:\"vnech-tee-blue-1-1-300x300.jpg\";s:5:\"width\";i:300;s:6:\"height\";i:300;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:7672;}s:9:\"thumbnail\";a:5:{s:4:\"file\";s:30:\"vnech-tee-blue-1-1-150x150.jpg\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:2987;}s:12:\"medium_large\";a:5:{s:4:\"file\";s:30:\"vnech-tee-blue-1-1-768x768.jpg\";s:5:\"width\";i:768;s:6:\"height\";i:768;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:30141;}s:21:\"woocommerce_thumbnail\";a:6:{s:4:\"file\";s:30:\"vnech-tee-blue-1-1-450x450.jpg\";s:5:\"width\";i:450;s:6:\"height\";i:450;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:14214;s:9:\"uncropped\";b:0;}s:18:\"woocommerce_single\";a:5:{s:4:\"file\";s:30:\"vnech-tee-blue-1-1-600x600.jpg\";s:5:\"width\";i:600;s:6:\"height\";i:600;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:21436;}s:29:\"woocommerce_gallery_thumbnail\";a:5:{s:4:\"file\";s:30:\"vnech-tee-blue-1-1-100x100.jpg\";s:5:\"width\";i:100;s:6:\"height\";i:100;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:1879;}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}'),(911,33,'_wc_attachment_source','https://woocommercecore.mystagingwebsite.com/wp-content/uploads/2017/12/vnech-tee-blue-1.jpg'),(912,34,'_wp_attached_file','2019/01/hoodie-2-1.jpg'),(913,34,'_wp_attachment_metadata','a:6:{s:5:\"width\";i:801;s:6:\"height\";i:801;s:4:\"file\";s:22:\"2019/01/hoodie-2-1.jpg\";s:8:\"filesize\";i:46079;s:5:\"sizes\";a:6:{s:6:\"medium\";a:5:{s:4:\"file\";s:22:\"hoodie-2-1-300x300.jpg\";s:5:\"width\";i:300;s:6:\"height\";i:300;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:7951;}s:9:\"thumbnail\";a:5:{s:4:\"file\";s:22:\"hoodie-2-1-150x150.jpg\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:3121;}s:12:\"medium_large\";a:5:{s:4:\"file\";s:22:\"hoodie-2-1-768x768.jpg\";s:5:\"width\";i:768;s:6:\"height\";i:768;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:29085;}s:21:\"woocommerce_thumbnail\";a:6:{s:4:\"file\";s:22:\"hoodie-2-1-450x450.jpg\";s:5:\"width\";i:450;s:6:\"height\";i:450;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:14062;s:9:\"uncropped\";b:0;}s:18:\"woocommerce_single\";a:5:{s:4:\"file\";s:22:\"hoodie-2-1-600x600.jpg\";s:5:\"width\";i:600;s:6:\"height\";i:600;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:20490;}s:29:\"woocommerce_gallery_thumbnail\";a:5:{s:4:\"file\";s:22:\"hoodie-2-1-100x100.jpg\";s:5:\"width\";i:100;s:6:\"height\";i:100;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:1974;}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}'),(914,34,'_wc_attachment_source','https://woocommercecore.mystagingwebsite.com/wp-content/uploads/2017/12/hoodie-2.jpg'),(915,35,'_wp_attached_file','2019/01/hoodie-blue-1-1.jpg'),(916,35,'_wp_attachment_metadata','a:6:{s:5:\"width\";i:800;s:6:\"height\";i:800;s:4:\"file\";s:27:\"2019/01/hoodie-blue-1-1.jpg\";s:8:\"filesize\";i:101298;s:5:\"sizes\";a:6:{s:6:\"medium\";a:5:{s:4:\"file\";s:27:\"hoodie-blue-1-1-300x300.jpg\";s:5:\"width\";i:300;s:6:\"height\";i:300;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:7678;}s:9:\"thumbnail\";a:5:{s:4:\"file\";s:27:\"hoodie-blue-1-1-150x150.jpg\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:2916;}s:12:\"medium_large\";a:5:{s:4:\"file\";s:27:\"hoodie-blue-1-1-768x768.jpg\";s:5:\"width\";i:768;s:6:\"height\";i:768;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:29067;}s:21:\"woocommerce_thumbnail\";a:6:{s:4:\"file\";s:27:\"hoodie-blue-1-1-450x450.jpg\";s:5:\"width\";i:450;s:6:\"height\";i:450;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:13859;s:9:\"uncropped\";b:0;}s:18:\"woocommerce_single\";a:5:{s:4:\"file\";s:27:\"hoodie-blue-1-1-600x600.jpg\";s:5:\"width\";i:600;s:6:\"height\";i:600;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:20750;}s:29:\"woocommerce_gallery_thumbnail\";a:5:{s:4:\"file\";s:27:\"hoodie-blue-1-1-100x100.jpg\";s:5:\"width\";i:100;s:6:\"height\";i:100;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:1805;}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}'),(917,35,'_wc_attachment_source','https://woocommercecore.mystagingwebsite.com/wp-content/uploads/2017/12/hoodie-blue-1.jpg'),(918,36,'_wp_attached_file','2019/01/hoodie-green-1-1.jpg'),(919,36,'_wp_attachment_metadata','a:6:{s:5:\"width\";i:800;s:6:\"height\";i:800;s:4:\"file\";s:28:\"2019/01/hoodie-green-1-1.jpg\";s:8:\"filesize\";i:98498;s:5:\"sizes\";a:6:{s:6:\"medium\";a:5:{s:4:\"file\";s:28:\"hoodie-green-1-1-300x300.jpg\";s:5:\"width\";i:300;s:6:\"height\";i:300;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:7570;}s:9:\"thumbnail\";a:5:{s:4:\"file\";s:28:\"hoodie-green-1-1-150x150.jpg\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:2902;}s:12:\"medium_large\";a:5:{s:4:\"file\";s:28:\"hoodie-green-1-1-768x768.jpg\";s:5:\"width\";i:768;s:6:\"height\";i:768;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:28529;}s:21:\"woocommerce_thumbnail\";a:6:{s:4:\"file\";s:28:\"hoodie-green-1-1-450x450.jpg\";s:5:\"width\";i:450;s:6:\"height\";i:450;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:13552;s:9:\"uncropped\";b:0;}s:18:\"woocommerce_single\";a:5:{s:4:\"file\";s:28:\"hoodie-green-1-1-600x600.jpg\";s:5:\"width\";i:600;s:6:\"height\";i:600;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:20387;}s:29:\"woocommerce_gallery_thumbnail\";a:5:{s:4:\"file\";s:28:\"hoodie-green-1-1-100x100.jpg\";s:5:\"width\";i:100;s:6:\"height\";i:100;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:1823;}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}'),(920,36,'_wc_attachment_source','https://woocommercecore.mystagingwebsite.com/wp-content/uploads/2017/12/hoodie-green-1.jpg'),(921,37,'_wp_attached_file','2019/01/hoodie-with-logo-2-1.jpg'),(922,37,'_wp_attachment_metadata','a:6:{s:5:\"width\";i:801;s:6:\"height\";i:801;s:4:\"file\";s:32:\"2019/01/hoodie-with-logo-2-1.jpg\";s:8:\"filesize\";i:46969;s:5:\"sizes\";a:6:{s:6:\"medium\";a:5:{s:4:\"file\";s:32:\"hoodie-with-logo-2-1-300x300.jpg\";s:5:\"width\";i:300;s:6:\"height\";i:300;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:8250;}s:9:\"thumbnail\";a:5:{s:4:\"file\";s:32:\"hoodie-with-logo-2-1-150x150.jpg\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:3091;}s:12:\"medium_large\";a:5:{s:4:\"file\";s:32:\"hoodie-with-logo-2-1-768x768.jpg\";s:5:\"width\";i:768;s:6:\"height\";i:768;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:30122;}s:21:\"woocommerce_thumbnail\";a:6:{s:4:\"file\";s:32:\"hoodie-with-logo-2-1-450x450.jpg\";s:5:\"width\";i:450;s:6:\"height\";i:450;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:14733;s:9:\"uncropped\";b:0;}s:18:\"woocommerce_single\";a:5:{s:4:\"file\";s:32:\"hoodie-with-logo-2-1-600x600.jpg\";s:5:\"width\";i:600;s:6:\"height\";i:600;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:21581;}s:29:\"woocommerce_gallery_thumbnail\";a:5:{s:4:\"file\";s:32:\"hoodie-with-logo-2-1-100x100.jpg\";s:5:\"width\";i:100;s:6:\"height\";i:100;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:1913;}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}'),(923,37,'_wc_attachment_source','https://woocommercecore.mystagingwebsite.com/wp-content/uploads/2017/12/hoodie-with-logo-2.jpg'),(924,38,'_wp_attached_file','2019/01/tshirt-2-1.jpg'),(925,38,'_wp_attachment_metadata','a:6:{s:5:\"width\";i:801;s:6:\"height\";i:801;s:4:\"file\";s:22:\"2019/01/tshirt-2-1.jpg\";s:8:\"filesize\";i:41155;s:5:\"sizes\";a:6:{s:6:\"medium\";a:5:{s:4:\"file\";s:22:\"tshirt-2-1-300x300.jpg\";s:5:\"width\";i:300;s:6:\"height\";i:300;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:7134;}s:9:\"thumbnail\";a:5:{s:4:\"file\";s:22:\"tshirt-2-1-150x150.jpg\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:2793;}s:12:\"medium_large\";a:5:{s:4:\"file\";s:22:\"tshirt-2-1-768x768.jpg\";s:5:\"width\";i:768;s:6:\"height\";i:768;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:26448;}s:21:\"woocommerce_thumbnail\";a:6:{s:4:\"file\";s:22:\"tshirt-2-1-450x450.jpg\";s:5:\"width\";i:450;s:6:\"height\";i:450;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:12589;s:9:\"uncropped\";b:0;}s:18:\"woocommerce_single\";a:5:{s:4:\"file\";s:22:\"tshirt-2-1-600x600.jpg\";s:5:\"width\";i:600;s:6:\"height\";i:600;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:18798;}s:29:\"woocommerce_gallery_thumbnail\";a:5:{s:4:\"file\";s:22:\"tshirt-2-1-100x100.jpg\";s:5:\"width\";i:100;s:6:\"height\";i:100;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:1766;}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}'),(926,38,'_wc_attachment_source','https://woocommercecore.mystagingwebsite.com/wp-content/uploads/2017/12/tshirt-2.jpg'),(927,39,'_wp_attached_file','2019/01/beanie-2-1.jpg'),(928,39,'_wp_attachment_metadata','a:6:{s:5:\"width\";i:801;s:6:\"height\";i:801;s:4:\"file\";s:22:\"2019/01/beanie-2-1.jpg\";s:8:\"filesize\";i:31568;s:5:\"sizes\";a:6:{s:6:\"medium\";a:5:{s:4:\"file\";s:22:\"beanie-2-1-300x300.jpg\";s:5:\"width\";i:300;s:6:\"height\";i:300;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:5698;}s:9:\"thumbnail\";a:5:{s:4:\"file\";s:22:\"beanie-2-1-150x150.jpg\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:2447;}s:12:\"medium_large\";a:5:{s:4:\"file\";s:22:\"beanie-2-1-768x768.jpg\";s:5:\"width\";i:768;s:6:\"height\";i:768;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:21231;}s:21:\"woocommerce_thumbnail\";a:6:{s:4:\"file\";s:22:\"beanie-2-1-450x450.jpg\";s:5:\"width\";i:450;s:6:\"height\";i:450;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:9923;s:9:\"uncropped\";b:0;}s:18:\"woocommerce_single\";a:5:{s:4:\"file\";s:22:\"beanie-2-1-600x600.jpg\";s:5:\"width\";i:600;s:6:\"height\";i:600;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:15022;}s:29:\"woocommerce_gallery_thumbnail\";a:5:{s:4:\"file\";s:22:\"beanie-2-1-100x100.jpg\";s:5:\"width\";i:100;s:6:\"height\";i:100;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:1703;}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}'),(929,39,'_wc_attachment_source','https://woocommercecore.mystagingwebsite.com/wp-content/uploads/2017/12/beanie-2.jpg'),(930,40,'_wp_attached_file','2019/01/belt-2-1.jpg'),(931,40,'_wp_attachment_metadata','a:6:{s:5:\"width\";i:801;s:6:\"height\";i:801;s:4:\"file\";s:20:\"2019/01/belt-2-1.jpg\";s:8:\"filesize\";i:37339;s:5:\"sizes\";a:6:{s:6:\"medium\";a:5:{s:4:\"file\";s:20:\"belt-2-1-300x300.jpg\";s:5:\"width\";i:300;s:6:\"height\";i:300;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:6738;}s:9:\"thumbnail\";a:5:{s:4:\"file\";s:20:\"belt-2-1-150x150.jpg\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:2681;}s:12:\"medium_large\";a:5:{s:4:\"file\";s:20:\"belt-2-1-768x768.jpg\";s:5:\"width\";i:768;s:6:\"height\";i:768;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:25625;}s:21:\"woocommerce_thumbnail\";a:6:{s:4:\"file\";s:20:\"belt-2-1-450x450.jpg\";s:5:\"width\";i:450;s:6:\"height\";i:450;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:12104;s:9:\"uncropped\";b:0;}s:18:\"woocommerce_single\";a:5:{s:4:\"file\";s:20:\"belt-2-1-600x600.jpg\";s:5:\"width\";i:600;s:6:\"height\";i:600;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:17802;}s:29:\"woocommerce_gallery_thumbnail\";a:5:{s:4:\"file\";s:20:\"belt-2-1-100x100.jpg\";s:5:\"width\";i:100;s:6:\"height\";i:100;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:1713;}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}'),(932,40,'_wc_attachment_source','https://woocommercecore.mystagingwebsite.com/wp-content/uploads/2017/12/belt-2.jpg'),(933,41,'_wp_attached_file','2019/01/cap-2-1.jpg'),(934,41,'_wp_attachment_metadata','a:6:{s:5:\"width\";i:801;s:6:\"height\";i:801;s:4:\"file\";s:19:\"2019/01/cap-2-1.jpg\";s:8:\"filesize\";i:37675;s:5:\"sizes\";a:6:{s:6:\"medium\";a:5:{s:4:\"file\";s:19:\"cap-2-1-300x300.jpg\";s:5:\"width\";i:300;s:6:\"height\";i:300;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:6656;}s:9:\"thumbnail\";a:5:{s:4:\"file\";s:19:\"cap-2-1-150x150.jpg\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:2559;}s:12:\"medium_large\";a:5:{s:4:\"file\";s:19:\"cap-2-1-768x768.jpg\";s:5:\"width\";i:768;s:6:\"height\";i:768;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:25713;}s:21:\"woocommerce_thumbnail\";a:6:{s:4:\"file\";s:19:\"cap-2-1-450x450.jpg\";s:5:\"width\";i:450;s:6:\"height\";i:450;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:12271;s:9:\"uncropped\";b:0;}s:18:\"woocommerce_single\";a:5:{s:4:\"file\";s:19:\"cap-2-1-600x600.jpg\";s:5:\"width\";i:600;s:6:\"height\";i:600;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:17984;}s:29:\"woocommerce_gallery_thumbnail\";a:5:{s:4:\"file\";s:19:\"cap-2-1-100x100.jpg\";s:5:\"width\";i:100;s:6:\"height\";i:100;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:1654;}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}'),(935,41,'_wc_attachment_source','https://woocommercecore.mystagingwebsite.com/wp-content/uploads/2017/12/cap-2.jpg'),(936,42,'_wp_attached_file','2019/01/sunglasses-2-1.jpg'),(937,42,'_wp_attachment_metadata','a:6:{s:5:\"width\";i:801;s:6:\"height\";i:801;s:4:\"file\";s:26:\"2019/01/sunglasses-2-1.jpg\";s:8:\"filesize\";i:24691;s:5:\"sizes\";a:6:{s:6:\"medium\";a:5:{s:4:\"file\";s:26:\"sunglasses-2-1-300x300.jpg\";s:5:\"width\";i:300;s:6:\"height\";i:300;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:5341;}s:9:\"thumbnail\";a:5:{s:4:\"file\";s:26:\"sunglasses-2-1-150x150.jpg\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:2242;}s:12:\"medium_large\";a:5:{s:4:\"file\";s:26:\"sunglasses-2-1-768x768.jpg\";s:5:\"width\";i:768;s:6:\"height\";i:768;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:20643;}s:21:\"woocommerce_thumbnail\";a:6:{s:4:\"file\";s:26:\"sunglasses-2-1-450x450.jpg\";s:5:\"width\";i:450;s:6:\"height\";i:450;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:9630;s:9:\"uncropped\";b:0;}s:18:\"woocommerce_single\";a:5:{s:4:\"file\";s:26:\"sunglasses-2-1-600x600.jpg\";s:5:\"width\";i:600;s:6:\"height\";i:600;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:14479;}s:29:\"woocommerce_gallery_thumbnail\";a:5:{s:4:\"file\";s:26:\"sunglasses-2-1-100x100.jpg\";s:5:\"width\";i:100;s:6:\"height\";i:100;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:1509;}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}'),(938,42,'_wc_attachment_source','https://woocommercecore.mystagingwebsite.com/wp-content/uploads/2017/12/sunglasses-2.jpg'),(939,43,'_wp_attached_file','2019/01/hoodie-with-pocket-2-1.jpg'),(940,43,'_wp_attachment_metadata','a:6:{s:5:\"width\";i:801;s:6:\"height\";i:801;s:4:\"file\";s:34:\"2019/01/hoodie-with-pocket-2-1.jpg\";s:8:\"filesize\";i:43268;s:5:\"sizes\";a:6:{s:6:\"medium\";a:5:{s:4:\"file\";s:34:\"hoodie-with-pocket-2-1-300x300.jpg\";s:5:\"width\";i:300;s:6:\"height\";i:300;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:7984;}s:9:\"thumbnail\";a:5:{s:4:\"file\";s:34:\"hoodie-with-pocket-2-1-150x150.jpg\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:3018;}s:12:\"medium_large\";a:5:{s:4:\"file\";s:34:\"hoodie-with-pocket-2-1-768x768.jpg\";s:5:\"width\";i:768;s:6:\"height\";i:768;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:28839;}s:21:\"woocommerce_thumbnail\";a:6:{s:4:\"file\";s:34:\"hoodie-with-pocket-2-1-450x450.jpg\";s:5:\"width\";i:450;s:6:\"height\";i:450;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:13835;s:9:\"uncropped\";b:0;}s:18:\"woocommerce_single\";a:5:{s:4:\"file\";s:34:\"hoodie-with-pocket-2-1-600x600.jpg\";s:5:\"width\";i:600;s:6:\"height\";i:600;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:20468;}s:29:\"woocommerce_gallery_thumbnail\";a:5:{s:4:\"file\";s:34:\"hoodie-with-pocket-2-1-100x100.jpg\";s:5:\"width\";i:100;s:6:\"height\";i:100;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:1890;}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}'),(941,43,'_wc_attachment_source','https://woocommercecore.mystagingwebsite.com/wp-content/uploads/2017/12/hoodie-with-pocket-2.jpg'),(942,44,'_wp_attached_file','2019/01/hoodie-with-zipper-2-1.jpg'),(943,44,'_wp_attachment_metadata','a:6:{s:5:\"width\";i:800;s:6:\"height\";i:800;s:4:\"file\";s:34:\"2019/01/hoodie-with-zipper-2-1.jpg\";s:8:\"filesize\";i:56609;s:5:\"sizes\";a:6:{s:6:\"medium\";a:5:{s:4:\"file\";s:34:\"hoodie-with-zipper-2-1-300x300.jpg\";s:5:\"width\";i:300;s:6:\"height\";i:300;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:9277;}s:9:\"thumbnail\";a:5:{s:4:\"file\";s:34:\"hoodie-with-zipper-2-1-150x150.jpg\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:3607;}s:12:\"medium_large\";a:5:{s:4:\"file\";s:34:\"hoodie-with-zipper-2-1-768x768.jpg\";s:5:\"width\";i:768;s:6:\"height\";i:768;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:33934;}s:21:\"woocommerce_thumbnail\";a:6:{s:4:\"file\";s:34:\"hoodie-with-zipper-2-1-450x450.jpg\";s:5:\"width\";i:450;s:6:\"height\";i:450;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:16463;s:9:\"uncropped\";b:0;}s:18:\"woocommerce_single\";a:5:{s:4:\"file\";s:34:\"hoodie-with-zipper-2-1-600x600.jpg\";s:5:\"width\";i:600;s:6:\"height\";i:600;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:24415;}s:29:\"woocommerce_gallery_thumbnail\";a:5:{s:4:\"file\";s:34:\"hoodie-with-zipper-2-1-100x100.jpg\";s:5:\"width\";i:100;s:6:\"height\";i:100;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:2148;}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}'),(944,44,'_wc_attachment_source','https://woocommercecore.mystagingwebsite.com/wp-content/uploads/2017/12/hoodie-with-zipper-2.jpg'),(945,45,'_wp_attached_file','2019/01/long-sleeve-tee-2-1.jpg'),(946,45,'_wp_attachment_metadata','a:6:{s:5:\"width\";i:801;s:6:\"height\";i:801;s:4:\"file\";s:31:\"2019/01/long-sleeve-tee-2-1.jpg\";s:8:\"filesize\";i:51118;s:5:\"sizes\";a:6:{s:6:\"medium\";a:5:{s:4:\"file\";s:31:\"long-sleeve-tee-2-1-300x300.jpg\";s:5:\"width\";i:300;s:6:\"height\";i:300;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:8080;}s:9:\"thumbnail\";a:5:{s:4:\"file\";s:31:\"long-sleeve-tee-2-1-150x150.jpg\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:3300;}s:12:\"medium_large\";a:5:{s:4:\"file\";s:31:\"long-sleeve-tee-2-1-768x768.jpg\";s:5:\"width\";i:768;s:6:\"height\";i:768;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:29718;}s:21:\"woocommerce_thumbnail\";a:6:{s:4:\"file\";s:31:\"long-sleeve-tee-2-1-450x450.jpg\";s:5:\"width\";i:450;s:6:\"height\";i:450;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:14090;s:9:\"uncropped\";b:0;}s:18:\"woocommerce_single\";a:5:{s:4:\"file\";s:31:\"long-sleeve-tee-2-1-600x600.jpg\";s:5:\"width\";i:600;s:6:\"height\";i:600;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:20965;}s:29:\"woocommerce_gallery_thumbnail\";a:5:{s:4:\"file\";s:31:\"long-sleeve-tee-2-1-100x100.jpg\";s:5:\"width\";i:100;s:6:\"height\";i:100;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:1988;}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}'),(947,45,'_wc_attachment_source','https://woocommercecore.mystagingwebsite.com/wp-content/uploads/2017/12/long-sleeve-tee-2.jpg'),(948,46,'_wp_attached_file','2019/01/polo-2-1.jpg'),(949,46,'_wp_attachment_metadata','a:6:{s:5:\"width\";i:801;s:6:\"height\";i:800;s:4:\"file\";s:20:\"2019/01/polo-2-1.jpg\";s:8:\"filesize\";i:44409;s:5:\"sizes\";a:6:{s:6:\"medium\";a:5:{s:4:\"file\";s:20:\"polo-2-1-300x300.jpg\";s:5:\"width\";i:300;s:6:\"height\";i:300;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:7285;}s:9:\"thumbnail\";a:5:{s:4:\"file\";s:20:\"polo-2-1-150x150.jpg\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:2871;}s:12:\"medium_large\";a:5:{s:4:\"file\";s:20:\"polo-2-1-768x767.jpg\";s:5:\"width\";i:768;s:6:\"height\";i:767;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:27584;}s:21:\"woocommerce_thumbnail\";a:6:{s:4:\"file\";s:20:\"polo-2-1-450x450.jpg\";s:5:\"width\";i:450;s:6:\"height\";i:450;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:13207;s:9:\"uncropped\";b:0;}s:18:\"woocommerce_single\";a:5:{s:4:\"file\";s:20:\"polo-2-1-600x599.jpg\";s:5:\"width\";i:600;s:6:\"height\";i:599;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:19448;}s:29:\"woocommerce_gallery_thumbnail\";a:5:{s:4:\"file\";s:20:\"polo-2-1-100x100.jpg\";s:5:\"width\";i:100;s:6:\"height\";i:100;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:1814;}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}'),(950,46,'_wc_attachment_source','https://woocommercecore.mystagingwebsite.com/wp-content/uploads/2017/12/polo-2.jpg'),(951,47,'_wp_attached_file','2019/01/album-1-1.jpg'),(952,47,'_wp_attachment_metadata','a:6:{s:5:\"width\";i:800;s:6:\"height\";i:800;s:4:\"file\";s:21:\"2019/01/album-1-1.jpg\";s:8:\"filesize\";i:120010;s:5:\"sizes\";a:6:{s:6:\"medium\";a:5:{s:4:\"file\";s:21:\"album-1-1-300x300.jpg\";s:5:\"width\";i:300;s:6:\"height\";i:300;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:9470;}s:9:\"thumbnail\";a:5:{s:4:\"file\";s:21:\"album-1-1-150x150.jpg\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:3671;}s:12:\"medium_large\";a:5:{s:4:\"file\";s:21:\"album-1-1-768x768.jpg\";s:5:\"width\";i:768;s:6:\"height\";i:768;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:33648;}s:21:\"woocommerce_thumbnail\";a:6:{s:4:\"file\";s:21:\"album-1-1-450x450.jpg\";s:5:\"width\";i:450;s:6:\"height\";i:450;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:16338;s:9:\"uncropped\";b:0;}s:18:\"woocommerce_single\";a:5:{s:4:\"file\";s:21:\"album-1-1-600x600.jpg\";s:5:\"width\";i:600;s:6:\"height\";i:600;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:24377;}s:29:\"woocommerce_gallery_thumbnail\";a:5:{s:4:\"file\";s:21:\"album-1-1-100x100.jpg\";s:5:\"width\";i:100;s:6:\"height\";i:100;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:2219;}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}'),(953,47,'_wc_attachment_source','https://woocommercecore.mystagingwebsite.com/wp-content/uploads/2022/05/album-1.jpg'),(954,48,'_wp_attached_file','2019/01/single-1-1.jpg'),(955,48,'_wp_attachment_metadata','a:6:{s:5:\"width\";i:800;s:6:\"height\";i:800;s:4:\"file\";s:22:\"2019/01/single-1-1.jpg\";s:8:\"filesize\";i:124720;s:5:\"sizes\";a:6:{s:6:\"medium\";a:5:{s:4:\"file\";s:22:\"single-1-1-300x300.jpg\";s:5:\"width\";i:300;s:6:\"height\";i:300;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:9592;}s:9:\"thumbnail\";a:5:{s:4:\"file\";s:22:\"single-1-1-150x150.jpg\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:3734;}s:12:\"medium_large\";a:5:{s:4:\"file\";s:22:\"single-1-1-768x768.jpg\";s:5:\"width\";i:768;s:6:\"height\";i:768;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:34135;}s:21:\"woocommerce_thumbnail\";a:6:{s:4:\"file\";s:22:\"single-1-1-450x450.jpg\";s:5:\"width\";i:450;s:6:\"height\";i:450;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:16508;s:9:\"uncropped\";b:0;}s:18:\"woocommerce_single\";a:5:{s:4:\"file\";s:22:\"single-1-1-600x600.jpg\";s:5:\"width\";i:600;s:6:\"height\";i:600;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:24445;}s:29:\"woocommerce_gallery_thumbnail\";a:5:{s:4:\"file\";s:22:\"single-1-1-100x100.jpg\";s:5:\"width\";i:100;s:6:\"height\";i:100;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:2274;}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}'),(956,48,'_wc_attachment_source','https://woocommercecore.mystagingwebsite.com/wp-content/uploads/2017/12/single-1.jpg'),(957,49,'_wp_attached_file','2019/01/t-shirt-with-logo-1-1.jpg'),(958,49,'_wp_attachment_metadata','a:6:{s:5:\"width\";i:800;s:6:\"height\";i:800;s:4:\"file\";s:33:\"2019/01/t-shirt-with-logo-1-1.jpg\";s:8:\"filesize\";i:67833;s:5:\"sizes\";a:6:{s:6:\"medium\";a:5:{s:4:\"file\";s:33:\"t-shirt-with-logo-1-1-300x300.jpg\";s:5:\"width\";i:300;s:6:\"height\";i:300;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:8142;}s:9:\"thumbnail\";a:5:{s:4:\"file\";s:33:\"t-shirt-with-logo-1-1-150x150.jpg\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:3150;}s:12:\"medium_large\";a:5:{s:4:\"file\";s:33:\"t-shirt-with-logo-1-1-768x768.jpg\";s:5:\"width\";i:768;s:6:\"height\";i:768;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:30504;}s:21:\"woocommerce_thumbnail\";a:6:{s:4:\"file\";s:33:\"t-shirt-with-logo-1-1-450x450.jpg\";s:5:\"width\";i:450;s:6:\"height\";i:450;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:14696;s:9:\"uncropped\";b:0;}s:18:\"woocommerce_single\";a:5:{s:4:\"file\";s:33:\"t-shirt-with-logo-1-1-600x600.jpg\";s:5:\"width\";i:600;s:6:\"height\";i:600;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:21865;}s:29:\"woocommerce_gallery_thumbnail\";a:5:{s:4:\"file\";s:33:\"t-shirt-with-logo-1-1-100x100.jpg\";s:5:\"width\";i:100;s:6:\"height\";i:100;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:1963;}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}'),(959,49,'_wc_attachment_source','https://woocommercecore.mystagingwebsite.com/wp-content/uploads/2017/12/t-shirt-with-logo-1.jpg'),(960,50,'_wp_attached_file','2019/01/beanie-with-logo-1-1.jpg'),(961,50,'_wp_attachment_metadata','a:6:{s:5:\"width\";i:800;s:6:\"height\";i:800;s:4:\"file\";s:32:\"2019/01/beanie-with-logo-1-1.jpg\";s:8:\"filesize\";i:45371;s:5:\"sizes\";a:6:{s:6:\"medium\";a:5:{s:4:\"file\";s:32:\"beanie-with-logo-1-1-300x300.jpg\";s:5:\"width\";i:300;s:6:\"height\";i:300;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:5810;}s:9:\"thumbnail\";a:5:{s:4:\"file\";s:32:\"beanie-with-logo-1-1-150x150.jpg\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:2429;}s:12:\"medium_large\";a:5:{s:4:\"file\";s:32:\"beanie-with-logo-1-1-768x768.jpg\";s:5:\"width\";i:768;s:6:\"height\";i:768;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:21612;}s:21:\"woocommerce_thumbnail\";a:6:{s:4:\"file\";s:32:\"beanie-with-logo-1-1-450x450.jpg\";s:5:\"width\";i:450;s:6:\"height\";i:450;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:10309;s:9:\"uncropped\";b:0;}s:18:\"woocommerce_single\";a:5:{s:4:\"file\";s:32:\"beanie-with-logo-1-1-600x600.jpg\";s:5:\"width\";i:600;s:6:\"height\";i:600;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:15335;}s:29:\"woocommerce_gallery_thumbnail\";a:5:{s:4:\"file\";s:32:\"beanie-with-logo-1-1-100x100.jpg\";s:5:\"width\";i:100;s:6:\"height\";i:100;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:1672;}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}'),(962,50,'_wc_attachment_source','https://woocommercecore.mystagingwebsite.com/wp-content/uploads/2017/12/beanie-with-logo-1.jpg'),(963,51,'_wp_attached_file','2019/01/logo-1-1.jpg'),(964,51,'_wp_attachment_metadata','a:6:{s:5:\"width\";i:800;s:6:\"height\";i:799;s:4:\"file\";s:20:\"2019/01/logo-1-1.jpg\";s:8:\"filesize\";i:139907;s:5:\"sizes\";a:6:{s:6:\"medium\";a:5:{s:4:\"file\";s:20:\"logo-1-1-300x300.jpg\";s:5:\"width\";i:300;s:6:\"height\";i:300;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:16167;}s:9:\"thumbnail\";a:5:{s:4:\"file\";s:20:\"logo-1-1-150x150.jpg\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:5876;}s:12:\"medium_large\";a:5:{s:4:\"file\";s:20:\"logo-1-1-768x767.jpg\";s:5:\"width\";i:768;s:6:\"height\";i:767;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:56876;}s:21:\"woocommerce_thumbnail\";a:6:{s:4:\"file\";s:20:\"logo-1-1-450x450.jpg\";s:5:\"width\";i:450;s:6:\"height\";i:450;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:28390;s:9:\"uncropped\";b:0;}s:18:\"woocommerce_single\";a:5:{s:4:\"file\";s:20:\"logo-1-1-600x599.jpg\";s:5:\"width\";i:600;s:6:\"height\";i:599;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:41239;}s:29:\"woocommerce_gallery_thumbnail\";a:5:{s:4:\"file\";s:20:\"logo-1-1-100x100.jpg\";s:5:\"width\";i:100;s:6:\"height\";i:100;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:3353;}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}'),(965,51,'_wc_attachment_source','https://woocommercecore.mystagingwebsite.com/wp-content/uploads/2017/12/logo-1.jpg'),(966,52,'_wp_attached_file','2019/01/pennant-1-1.jpg'),(967,52,'_wp_attachment_metadata','a:6:{s:5:\"width\";i:800;s:6:\"height\";i:800;s:4:\"file\";s:23:\"2019/01/pennant-1-1.jpg\";s:8:\"filesize\";i:56755;s:5:\"sizes\";a:6:{s:6:\"medium\";a:5:{s:4:\"file\";s:23:\"pennant-1-1-300x300.jpg\";s:5:\"width\";i:300;s:6:\"height\";i:300;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:6926;}s:9:\"thumbnail\";a:5:{s:4:\"file\";s:23:\"pennant-1-1-150x150.jpg\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:2582;}s:12:\"medium_large\";a:5:{s:4:\"file\";s:23:\"pennant-1-1-768x768.jpg\";s:5:\"width\";i:768;s:6:\"height\";i:768;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:28247;}s:21:\"woocommerce_thumbnail\";a:6:{s:4:\"file\";s:23:\"pennant-1-1-450x450.jpg\";s:5:\"width\";i:450;s:6:\"height\";i:450;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:12994;s:9:\"uncropped\";b:0;}s:18:\"woocommerce_single\";a:5:{s:4:\"file\";s:23:\"pennant-1-1-600x600.jpg\";s:5:\"width\";i:600;s:6:\"height\";i:600;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:19849;}s:29:\"woocommerce_gallery_thumbnail\";a:5:{s:4:\"file\";s:23:\"pennant-1-1-100x100.jpg\";s:5:\"width\";i:100;s:6:\"height\";i:100;s:9:\"mime-type\";s:10:\"image/jpeg\";s:8:\"filesize\";i:1608;}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}'),(968,52,'_wc_attachment_source','https://woocommercecore.mystagingwebsite.com/wp-content/uploads/2017/12/pennant-1.jpg'),(969,62,'_pingme','1'),(970,62,'_encloseme','1'),(971,63,'_pingme','1'),(972,63,'_encloseme','1'),(973,64,'_pingme','1'),(974,64,'_encloseme','1'),(975,65,'_pingme','1'),(976,65,'_encloseme','1'),(977,66,'_pingme','1'),(978,66,'_encloseme','1'),(979,67,'_pingme','1'),(980,67,'_encloseme','1'),(981,68,'_pingme','1'),(982,68,'_encloseme','1'),(983,69,'_pingme','1'),(984,69,'_encloseme','1'),(985,70,'_pingme','1'),(986,70,'_encloseme','1'),(987,71,'_pingme','1'),(988,71,'_encloseme','1'),(989,72,'_pingme','1'),(990,72,'_encloseme','1'),(991,73,'_pingme','1'),(992,73,'_encloseme','1'),(993,74,'_pingme','1'),(994,74,'_encloseme','1'),(995,75,'_pingme','1'),(996,75,'_encloseme','1'),(997,76,'_pingme','1'),(998,76,'_encloseme','1'),(999,77,'discount_type','percent'),(1000,77,'coupon_amount','10'),(1001,77,'individual_use','no'),(1002,77,'usage_limit','0'),(1003,77,'usage_limit_per_user','0'),(1004,77,'limit_usage_to_x_items',NULL),(1005,77,'usage_count','0'),(1006,77,'date_expires',NULL),(1007,77,'free_shipping','no'),(1008,77,'exclude_sale_items','no');
/*!40000 ALTER TABLE `wp_postmeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_posts`
--

DROP TABLE IF EXISTS `wp_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_posts` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `post_author` bigint(20) unsigned NOT NULL DEFAULT 0,
  `post_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_date_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_content` longtext NOT NULL,
  `post_title` text NOT NULL,
  `post_excerpt` text NOT NULL,
  `post_status` varchar(20) NOT NULL DEFAULT 'publish',
  `comment_status` varchar(20) NOT NULL DEFAULT 'open',
  `ping_status` varchar(20) NOT NULL DEFAULT 'open',
  `post_password` varchar(255) NOT NULL DEFAULT '',
  `post_name` varchar(200) NOT NULL DEFAULT '',
  `to_ping` text NOT NULL,
  `pinged` text NOT NULL,
  `post_modified` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_modified_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_content_filtered` longtext NOT NULL,
  `post_parent` bigint(20) unsigned NOT NULL DEFAULT 0,
  `guid` varchar(255) NOT NULL DEFAULT '',
  `menu_order` int(11) NOT NULL DEFAULT 0,
  `post_type` varchar(20) NOT NULL DEFAULT 'post',
  `post_mime_type` varchar(100) NOT NULL DEFAULT '',
  `comment_count` bigint(20) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ID`),
  KEY `post_name` (`post_name`(191)),
  KEY `type_status_date` (`post_type`,`post_status`,`post_date`,`ID`),
  KEY `post_parent` (`post_parent`),
  KEY `post_author` (`post_author`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_posts`
--

LOCK TABLES `wp_posts` WRITE;
/*!40000 ALTER TABLE `wp_posts` DISABLE KEYS */;
INSERT INTO `wp_posts` VALUES (6,0,'2019-01-16 13:01:52','2019-01-16 13:01:52','Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.','V-Neck T-Shirt','This is a variable product.','publish','open','closed','','v-neck-t-shirt','','','2019-01-16 13:01:52','2019-01-16 13:01:52','',0,'https://woocommercecore.mystagingwebsite.com/product/v-neck-t-shirt/',0,'product','',0),(7,0,'2019-01-16 13:01:52','2019-01-16 13:01:52','Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.','Hoodie','This is a variable product.','publish','open','closed','','hoodie','','','2019-01-16 13:01:52','2019-01-16 13:01:52','',0,'https://woocommercecore.mystagingwebsite.com/product/hoodie/',0,'product','',0),(8,0,'2019-01-16 13:01:52','2019-01-16 13:01:52','Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.','Hoodie with Logo','This is a simple product.','publish','open','closed','','hoodie-with-logo','','','2019-01-16 13:01:52','2019-01-16 13:01:52','',0,'https://woocommercecore.mystagingwebsite.com/product/hoodie-with-logo/',0,'product','',0),(9,0,'2019-01-16 13:01:52','2019-01-16 13:01:52','Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.','T-Shirt','This is a simple product.','publish','open','closed','','t-shirt','','','2019-01-16 13:01:52','2019-01-16 13:01:52','',0,'https://woocommercecore.mystagingwebsite.com/product/t-shirt/',0,'product','',0),(10,0,'2019-01-16 13:01:52','2019-01-16 13:01:52','Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.','Beanie','This is a simple product.','publish','open','closed','','beanie','','','2019-01-16 13:01:52','2019-01-16 13:01:52','',0,'https://woocommercecore.mystagingwebsite.com/product/beanie/',0,'product','',0),(11,0,'2019-01-16 13:01:52','2019-01-16 13:01:52','Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.','Belt','This is a simple product.','publish','open','closed','','belt','','','2019-01-16 13:01:52','2019-01-16 13:01:52','',0,'https://woocommercecore.mystagingwebsite.com/product/belt/',0,'product','',0),(12,0,'2019-01-16 13:01:53','2019-01-16 13:01:53','Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.','Cap','This is a simple product.','publish','open','closed','','cap','','','2019-01-16 13:01:53','2019-01-16 13:01:53','',0,'https://woocommercecore.mystagingwebsite.com/product/cap/',0,'product','',0),(13,0,'2019-01-16 13:01:53','2019-01-16 13:01:53','Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.','Sunglasses','This is a simple product.','publish','open','closed','','sunglasses','','','2019-01-16 13:01:53','2019-01-16 13:01:53','',0,'https://woocommercecore.mystagingwebsite.com/product/sunglasses/',0,'product','',0),(14,0,'2019-01-16 13:01:53','2019-01-16 13:01:53','Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.','Hoodie with Pocket','This is a simple product.','publish','open','closed','','hoodie-with-pocket','','','2019-01-16 13:01:53','2019-01-16 13:01:53','',0,'https://woocommercecore.mystagingwebsite.com/product/hoodie-with-pocket/',0,'product','',0),(15,0,'2019-01-16 13:01:53','2019-01-16 13:01:53','Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.','Hoodie with Zipper','This is a simple product.','publish','open','closed','','hoodie-with-zipper','','','2019-01-16 13:01:53','2019-01-16 13:01:53','',0,'https://woocommercecore.mystagingwebsite.com/product/hoodie-with-zipper/',0,'product','',0),(16,0,'2019-01-16 13:01:53','2019-01-16 13:01:53','Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.','Long Sleeve Tee','This is a simple product.','publish','open','closed','','long-sleeve-tee','','','2019-01-16 13:01:53','2019-01-16 13:01:53','',0,'https://woocommercecore.mystagingwebsite.com/product/long-sleeve-tee/',0,'product','',0),(17,0,'2019-01-16 13:01:53','2019-01-16 13:01:53','Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.','Polo','This is a simple product.','publish','open','closed','','polo','','','2019-01-16 13:01:53','2019-01-16 13:01:53','',0,'https://woocommercecore.mystagingwebsite.com/product/polo/',0,'product','',0),(18,0,'2019-01-16 13:01:54','2019-01-16 13:01:54','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sagittis orci ac odio dictum tincidunt. Donec ut metus leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed luctus, dui eu sagittis sodales, nulla nibh sagittis augue, vel porttitor diam enim non metus. Vestibulum aliquam augue neque. Phasellus tincidunt odio eget ullamcorper efficitur. Cras placerat ut turpis pellentesque vulputate. Nam sed consequat tortor. Curabitur finibus sapien dolor. Ut eleifend tellus nec erat pulvinar dignissim. Nam non arcu purus. Vivamus et massa massa.','Album','This is a simple, virtual product.','publish','open','closed','','album','','','2019-01-16 13:01:54','2019-01-16 13:01:54','',0,'https://woocommercecore.mystagingwebsite.com/product/album/',0,'product','',0),(19,0,'2019-01-16 13:01:54','2019-01-16 13:01:54','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sagittis orci ac odio dictum tincidunt. Donec ut metus leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed luctus, dui eu sagittis sodales, nulla nibh sagittis augue, vel porttitor diam enim non metus. Vestibulum aliquam augue neque. Phasellus tincidunt odio eget ullamcorper efficitur. Cras placerat ut turpis pellentesque vulputate. Nam sed consequat tortor. Curabitur finibus sapien dolor. Ut eleifend tellus nec erat pulvinar dignissim. Nam non arcu purus. Vivamus et massa massa.','Single','This is a simple, virtual product.','publish','open','closed','','single','','','2019-01-16 13:01:54','2019-01-16 13:01:54','',0,'https://woocommercecore.mystagingwebsite.com/product/single/',0,'product','',0),(20,0,'2019-01-16 13:01:54','2019-01-16 13:01:54','','V-Neck T-Shirt - Red','','publish','closed','closed','','v-neck-t-shirt-red','','','2019-01-16 13:01:54','2019-01-16 13:01:54','',6,'https://woocommercecore.mystagingwebsite.com/product/v-neck-t-shirt-red/',0,'product_variation','',0),(21,0,'2019-01-16 13:01:54','2019-01-16 13:01:54','','V-Neck T-Shirt - Green','','publish','closed','closed','','v-neck-t-shirt-green','','','2019-01-16 13:01:54','2019-01-16 13:01:54','',6,'https://woocommercecore.mystagingwebsite.com/product/v-neck-t-shirt-green/',0,'product_variation','',0),(22,0,'2019-01-16 13:01:54','2019-01-16 13:01:54','','V-Neck T-Shirt - Blue','','publish','closed','closed','','v-neck-t-shirt-blue','','','2019-01-16 13:01:54','2019-01-16 13:01:54','',6,'https://woocommercecore.mystagingwebsite.com/product/v-neck-t-shirt-blue/',0,'product_variation','',0),(23,0,'2019-01-16 13:01:54','2019-01-16 13:01:54','','Hoodie - Red, No','','publish','closed','closed','','hoodie-red-no','','','2019-01-16 13:01:54','2019-01-16 13:01:54','',7,'https://woocommercecore.mystagingwebsite.com/product/hoodie-red-no',1,'product_variation','',0),(24,0,'2019-01-16 13:01:54','2019-01-16 13:01:54','','Hoodie - Green, No','','publish','closed','closed','','hoodie-green-no','','','2019-01-16 13:01:54','2019-01-16 13:01:54','',7,'https://woocommercecore.mystagingwebsite.com/product/hoodie-green-no/',2,'product_variation','',0),(25,0,'2019-01-16 13:01:55','2019-01-16 13:01:55','','Hoodie - Blue, No','','publish','closed','closed','','hoodie-blue-no','','','2019-01-16 13:01:55','2019-01-16 13:01:55','',7,'https://woocommercecore.mystagingwebsite.com/product/hoodie-blue-no',3,'product_variation','',0),(26,0,'2019-01-16 13:01:55','2019-01-16 13:01:55','Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.','T-Shirt with Logo','This is a simple product.','publish','open','closed','','t-shirt-with-logo','','','2019-01-16 13:01:55','2019-01-16 13:01:55','',0,'https://woocommercecore.mystagingwebsite.com/product/t-shirt-with-logo/',0,'product','',0),(27,0,'2019-01-16 13:01:55','2019-01-16 13:01:55','Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.','Beanie with Logo','This is a simple product.','publish','open','closed','','beanie-with-logo','','','2019-01-16 13:01:55','2019-01-16 13:01:55','',0,'https://woocommercecore.mystagingwebsite.com/product/beanie-with-logo/',0,'product','',0),(28,0,'2019-01-16 13:01:55','2019-01-16 13:01:55','Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.','Logo Collection','This is a grouped product.','publish','open','closed','','logo-collection','','','2019-01-16 13:01:55','2019-01-16 13:01:55','',0,'https://woocommercecore.mystagingwebsite.com/product/logo-collection/',0,'product','',0),(29,0,'2019-01-16 13:01:55','2019-01-16 13:01:55','Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.','WordPress Pennant','This is an external product.','publish','open','closed','','wordpress-pennant','','','2019-01-16 13:01:55','2019-01-16 13:01:55','',0,'https://woocommercecore.mystagingwebsite.com/product/wordpress-pennant/',0,'product','',0),(30,0,'2019-01-16 13:01:55','2019-01-16 13:01:55','','Hoodie - Blue, Yes','','publish','closed','closed','','hoodie-blue-yes','','','2019-01-16 13:01:55','2019-01-16 13:01:55','',7,'https://woocommercecore.mystagingwebsite.com/product/hoodie-blue-yes/',0,'product_variation','',0),(31,0,'2019-01-16 13:01:56','2019-01-16 13:01:56','','vneck-tee-2.jpg','','inherit','open','closed','','vneck-tee-2-jpg','','','2019-01-16 13:01:56','2019-01-16 13:01:56','',6,'http://localhost:8889/wp-content/uploads/2019/01/vneck-tee-2-1.jpg',0,'attachment','image/jpeg',0),(32,0,'2019-01-16 13:01:57','2019-01-16 13:01:57','','vnech-tee-green-1.jpg','','inherit','open','closed','','vnech-tee-green-1-jpg','','','2019-01-16 13:01:57','2019-01-16 13:01:57','',6,'http://localhost:8889/wp-content/uploads/2019/01/vnech-tee-green-1-1.jpg',0,'attachment','image/jpeg',0),(33,0,'2019-01-16 13:01:58','2019-01-16 13:01:58','','vnech-tee-blue-1.jpg','','inherit','open','closed','','vnech-tee-blue-1-jpg','','','2019-01-16 13:01:58','2019-01-16 13:01:58','',6,'http://localhost:8889/wp-content/uploads/2019/01/vnech-tee-blue-1-1.jpg',0,'attachment','image/jpeg',0),(34,0,'2019-01-16 13:01:58','2019-01-16 13:01:58','','hoodie-2.jpg','','inherit','open','closed','','hoodie-2-jpg','','','2019-01-16 13:01:58','2019-01-16 13:01:58','',7,'http://localhost:8889/wp-content/uploads/2019/01/hoodie-2-1.jpg',0,'attachment','image/jpeg',0),(35,0,'2019-01-16 13:01:59','2019-01-16 13:01:59','','hoodie-blue-1.jpg','','inherit','open','closed','','hoodie-blue-1-jpg','','','2019-01-16 13:01:59','2019-01-16 13:01:59','',7,'http://localhost:8889/wp-content/uploads/2019/01/hoodie-blue-1-1.jpg',0,'attachment','image/jpeg',0),(36,0,'2019-01-16 13:02:00','2019-01-16 13:02:00','','hoodie-green-1.jpg','','inherit','open','closed','','hoodie-green-1-jpg','','','2019-01-16 13:02:00','2019-01-16 13:02:00','',7,'http://localhost:8889/wp-content/uploads/2019/01/hoodie-green-1-1.jpg',0,'attachment','image/jpeg',0),(37,0,'2019-01-16 13:02:01','2019-01-16 13:02:01','','hoodie-with-logo-2.jpg','','inherit','open','closed','','hoodie-with-logo-2-jpg','','','2019-01-16 13:02:01','2019-01-16 13:02:01','',7,'http://localhost:8889/wp-content/uploads/2019/01/hoodie-with-logo-2-1.jpg',0,'attachment','image/jpeg',0),(38,0,'2019-01-16 13:02:02','2019-01-16 13:02:02','','tshirt-2.jpg','','inherit','open','closed','','tshirt-2-jpg','','','2019-01-16 13:02:02','2019-01-16 13:02:02','',9,'http://localhost:8889/wp-content/uploads/2019/01/tshirt-2-1.jpg',0,'attachment','image/jpeg',0),(39,0,'2019-01-16 13:02:02','2019-01-16 13:02:02','','beanie-2.jpg','','inherit','open','closed','','beanie-2-jpg','','','2019-01-16 13:02:02','2019-01-16 13:02:02','',10,'http://localhost:8889/wp-content/uploads/2019/01/beanie-2-1.jpg',0,'attachment','image/jpeg',0),(40,0,'2019-01-16 13:02:03','2019-01-16 13:02:03','','belt-2.jpg','','inherit','open','closed','','belt-2-jpg','','','2019-01-16 13:02:03','2019-01-16 13:02:03','',11,'http://localhost:8889/wp-content/uploads/2019/01/belt-2-1.jpg',0,'attachment','image/jpeg',0),(41,0,'2019-01-16 13:02:04','2019-01-16 13:02:04','','cap-2.jpg','','inherit','open','closed','','cap-2-jpg','','','2019-01-16 13:02:04','2019-01-16 13:02:04','',12,'http://localhost:8889/wp-content/uploads/2019/01/cap-2-1.jpg',0,'attachment','image/jpeg',0),(42,0,'2019-01-16 13:02:05','2019-01-16 13:02:05','','sunglasses-2.jpg','','inherit','open','closed','','sunglasses-2-jpg','','','2019-01-16 13:02:05','2019-01-16 13:02:05','',13,'http://localhost:8889/wp-content/uploads/2019/01/sunglasses-2-1.jpg',0,'attachment','image/jpeg',0),(43,0,'2019-01-16 13:02:06','2019-01-16 13:02:06','','hoodie-with-pocket-2.jpg','','inherit','open','closed','','hoodie-with-pocket-2-jpg','','','2019-01-16 13:02:06','2019-01-16 13:02:06','',14,'http://localhost:8889/wp-content/uploads/2019/01/hoodie-with-pocket-2-1.jpg',0,'attachment','image/jpeg',0),(44,0,'2019-01-16 13:02:06','2019-01-16 13:02:06','','hoodie-with-zipper-2.jpg','','inherit','open','closed','','hoodie-with-zipper-2-jpg','','','2019-01-16 13:02:06','2019-01-16 13:02:06','',15,'http://localhost:8889/wp-content/uploads/2019/01/hoodie-with-zipper-2-1.jpg',0,'attachment','image/jpeg',0),(45,0,'2019-01-16 13:02:07','2019-01-16 13:02:07','','long-sleeve-tee-2.jpg','','inherit','open','closed','','long-sleeve-tee-2-jpg','','','2019-01-16 13:02:07','2019-01-16 13:02:07','',16,'http://localhost:8889/wp-content/uploads/2019/01/long-sleeve-tee-2-1.jpg',0,'attachment','image/jpeg',0),(46,0,'2019-01-16 13:02:08','2019-01-16 13:02:08','','polo-2.jpg','','inherit','open','closed','','polo-2-jpg','','','2019-01-16 13:02:08','2019-01-16 13:02:08','',17,'http://localhost:8889/wp-content/uploads/2019/01/polo-2-1.jpg',0,'attachment','image/jpeg',0),(47,0,'2019-01-16 13:02:09','2019-01-16 13:02:09','','album-1.jpg','','inherit','open','closed','','album-1-jpg','','','2019-01-16 13:02:09','2019-01-16 13:02:09','',18,'http://localhost:8889/wp-content/uploads/2019/01/album-1-1.jpg',0,'attachment','image/jpeg',0),(48,0,'2019-01-16 13:02:10','2019-01-16 13:02:10','','single-1.jpg','','inherit','open','closed','','single-1-jpg','','','2019-01-16 13:02:10','2019-01-16 13:02:10','',19,'http://localhost:8889/wp-content/uploads/2019/01/single-1-1.jpg',0,'attachment','image/jpeg',0),(49,0,'2019-01-16 13:02:11','2019-01-16 13:02:11','','t-shirt-with-logo-1.jpg','','inherit','open','closed','','t-shirt-with-logo-1-jpg','','','2019-01-16 13:02:11','2019-01-16 13:02:11','',26,'http://localhost:8889/wp-content/uploads/2019/01/t-shirt-with-logo-1-1.jpg',0,'attachment','image/jpeg',0),(50,0,'2019-01-16 13:02:12','2019-01-16 13:02:12','','beanie-with-logo-1.jpg','','inherit','open','closed','','beanie-with-logo-1-jpg','','','2019-01-16 13:02:12','2019-01-16 13:02:12','',27,'http://localhost:8889/wp-content/uploads/2019/01/beanie-with-logo-1-1.jpg',0,'attachment','image/jpeg',0),(51,0,'2019-01-16 13:02:13','2019-01-16 13:02:13','','logo-1.jpg','','inherit','open','closed','','logo-1-jpg','','','2019-01-16 13:02:13','2019-01-16 13:02:13','',28,'http://localhost:8889/wp-content/uploads/2019/01/logo-1-1.jpg',0,'attachment','image/jpeg',0),(52,0,'2019-01-16 13:02:13','2019-01-16 13:02:13','','pennant-1.jpg','','inherit','open','closed','','pennant-1-jpg','','','2019-01-16 13:02:13','2019-01-16 13:02:13','',29,'http://localhost:8889/wp-content/uploads/2019/01/pennant-1-1.jpg',0,'attachment','image/jpeg',0),(53,0,'2023-06-12 16:30:41','2023-06-12 16:30:41','<!-- wp:woocommerce/all-products {\"columns\":3,\"rows\":3,\"alignButtons\":false,\"contentVisibility\":{\"orderBy\":true},\"orderby\":\"date\",\"layoutConfig\":[[\"woocommerce/product-image\",{\"imageSizing\":\"cropped\"}],[\"woocommerce/product-title\"],[\"woocommerce/product-price\"],[\"woocommerce/product-rating\"],[\"woocommerce/product-button\"]]} --><div class=\"wp-block-woocommerce-all-products wc-block-all-products\" data-attributes=\"{&quot;alignButtons&quot;:false,&quot;columns&quot;:3,&quot;contentVisibility&quot;:{&quot;orderBy&quot;:true},&quot;isPreview&quot;:false,&quot;layoutConfig&quot;:[[&quot;woocommerce/product-image&quot;,{&quot;imageSizing&quot;:&quot;cropped&quot;}],[&quot;woocommerce/product-title&quot;],[&quot;woocommerce/product-price&quot;],[&quot;woocommerce/product-rating&quot;],[&quot;woocommerce/product-button&quot;]],&quot;orderby&quot;:&quot;date&quot;,&quot;rows&quot;:3}\"></div><!-- /wp:woocommerce/all-products -->','Shop','','publish','closed','closed','','shop','','','2023-06-12 16:30:41','2023-06-12 16:30:41','',0,'http://localhost:8889/?page_id=53',0,'page','',0),(54,0,'2023-06-12 16:30:43','2023-06-12 16:30:43','','Classic Shop','','publish','closed','closed','','classic-shop','','','2023-06-12 16:30:43','2023-06-12 16:30:43','',53,'http://localhost:8889/?page_id=54',0,'page','',0),(55,0,'2023-06-12 16:30:46','2023-06-12 16:30:46','<!-- wp:woocommerce/cart --><div class=\"wp-block-woocommerce-cart is-loading\"><!-- wp:woocommerce/filled-cart-block --><div class=\"wp-block-woocommerce-filled-cart-block\"><!-- wp:woocommerce/cart-items-block --><div class=\"wp-block-woocommerce-cart-items-block\"><!-- wp:woocommerce/cart-line-items-block --><div class=\"wp-block-woocommerce-cart-line-items-block\"></div><!-- /wp:woocommerce/cart-line-items-block --></div><!-- /wp:woocommerce/cart-items-block --><!-- wp:woocommerce/cart-totals-block --><div class=\"wp-block-woocommerce-cart-totals-block\"><!-- wp:woocommerce/cart-order-summary-block --><div class=\"wp-block-woocommerce-cart-order-summary-block\"></div><!-- /wp:woocommerce/cart-order-summary-block --><!-- wp:woocommerce/cart-express-payment-block --><div class=\"wp-block-woocommerce-cart-express-payment-block\"></div><!-- /wp:woocommerce/cart-express-payment-block --><!-- wp:woocommerce/proceed-to-checkout-block --><div class=\"wp-block-woocommerce-proceed-to-checkout-block\"></div><!-- /wp:woocommerce/proceed-to-checkout-block --><!-- wp:woocommerce/cart-accepted-payment-methods-block --><div class=\"wp-block-woocommerce-cart-accepted-payment-methods-block\"></div><!-- /wp:woocommerce/cart-accepted-payment-methods-block --></div><!-- /wp:woocommerce/cart-totals-block --></div><!-- /wp:woocommerce/filled-cart-block --><!-- wp:woocommerce/empty-cart-block --><div class=\"wp-block-woocommerce-empty-cart-block\"><!-- wp:image {\"align\":\"center\",\"sizeSlug\":\"small\"} --><div class=\"wp-block-image\"><figure class=\"aligncenter size-small\"><img src=\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzgiIGhlaWdodD0iMzgiIHZpZXdCb3g9IjAgMCAzOCAzOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE5IDBDOC41MDQwMyAwIDAgOC41MDQwMyAwIDE5QzAgMjkuNDk2IDguNTA0MDMgMzggMTkgMzhDMjkuNDk2IDM4IDM4IDI5LjQ5NiAzOCAxOUMzOCA4LjUwNDAzIDI5LjQ5NiAwIDE5IDBaTTI1LjEyOSAxMi44NzFDMjYuNDg1MSAxMi44NzEgMjcuNTgwNiAxMy45NjY1IDI3LjU4MDYgMTUuMzIyNkMyNy41ODA2IDE2LjY3ODYgMjYuNDg1MSAxNy43NzQyIDI1LjEyOSAxNy43NzQyQzIzLjc3MyAxNy43NzQyIDIyLjY3NzQgMTYuNjc4NiAyMi42Nzc0IDE1LjMyMjZDMjIuNjc3NCAxMy45NjY1IDIzLjc3MyAxMi44NzEgMjUuMTI5IDEyLjg3MVpNMTEuNjQ1MiAzMS4yNTgxQzkuNjE0OTIgMzEuMjU4MSA3Ljk2Nzc0IDI5LjY0OTIgNy45Njc3NCAyNy42NTczQzcuOTY3NzQgMjYuMTI1IDEwLjE1MTIgMjMuMDI5OCAxMS4xNTQ4IDIxLjY5NjhDMTEuNCAyMS4zNjczIDExLjg5MDMgMjEuMzY3MyAxMi4xMzU1IDIxLjY5NjhDMTMuMTM5MSAyMy4wMjk4IDE1LjMyMjYgMjYuMTI1IDE1LjMyMjYgMjcuNjU3M0MxNS4zMjI2IDI5LjY0OTIgMTMuNjc1NCAzMS4yNTgxIDExLjY0NTIgMzEuMjU4MVpNMTIuODcxIDE3Ljc3NDJDMTEuNTE0OSAxNy43NzQyIDEwLjQxOTQgMTYuNjc4NiAxMC40MTk0IDE1LjMyMjZDMTAuNDE5NCAxMy45NjY1IDExLjUxNDkgMTIuODcxIDEyLjg3MSAxMi44NzFDMTQuMjI3IDEyLjg3MSAxNS4zMjI2IDEzLjk2NjUgMTUuMzIyNiAxNS4zMjI2QzE1LjMyMjYgMTYuNjc4NiAxNC4yMjcgMTcuNzc0MiAxMi44NzEgMTcuNzc0MlpNMjUuOTEwNSAyOS41ODc5QzI0LjE5NDQgMjcuNTM0NyAyMS42NzM4IDI2LjM1NDggMTkgMjYuMzU0OEMxNy4zNzU4IDI2LjM1NDggMTcuMzc1OCAyMy45MDMyIDE5IDIzLjkwMzJDMjIuNDAxNiAyMy45MDMyIDI1LjYxMTcgMjUuNDA0OCAyNy43ODc1IDI4LjAyNUMyOC44NDQ4IDI5LjI4MTUgMjYuOTI5NCAzMC44MjE0IDI1LjkxMDUgMjkuNTg3OVoiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPgo=\" alt=\"\"/></figure></div><!-- /wp:image --><!-- wp:heading {\"textAlign\":\"center\",\"className\":\"wc-block-cart__empty-cart__title\"} --><h2 class=\"has-text-align-center wc-block-cart__empty-cart__title\">Your cart is currently empty!</h2><!-- /wp:heading --><!-- wp:paragraph {\"align\":\"center\"} --><p class=\"has-text-align-center\"><a href=\"/shop/\">Browse store</a>.</p><!-- /wp:paragraph --><!-- wp:separator {\"className\":\"is-style-dots\"} --><hr class=\"wp-block-separator is-style-dots\"/><!-- /wp:separator --><!-- wp:heading {\"textAlign\":\"center\"} --><h2 class=\"has-text-align-center\">New in store</h2><!-- /wp:heading --><!-- wp:woocommerce/product-new {\"rows\":1} /--></div><!-- /wp:woocommerce/empty-cart-block --></div><!-- /wp:woocommerce/cart -->','Cart','','publish','closed','closed','','cart','','','2023-06-12 16:30:46','2023-06-12 16:30:46','',0,'http://localhost:8889/?page_id=55',1,'page','',0),(56,0,'2023-06-12 16:30:50','2023-06-12 16:30:50','<!-- wp:woocommerce/checkout --><div class=\"wp-block-woocommerce-checkout wc-block-checkout is-loading\"><!-- wp:woocommerce/checkout-fields-block --><div class=\"wp-block-woocommerce-checkout-fields-block\"><!-- wp:woocommerce/checkout-express-payment-block --><div class=\"wp-block-woocommerce-checkout-express-payment-block\"></div><!-- /wp:woocommerce/checkout-express-payment-block --><!-- wp:woocommerce/checkout-contact-information-block --><div class=\"wp-block-woocommerce-checkout-contact-information-block\"></div><!-- /wp:woocommerce/checkout-contact-information-block --><!-- wp:woocommerce/checkout-shipping-address-block --><div class=\"wp-block-woocommerce-checkout-shipping-address-block\"></div><!-- /wp:woocommerce/checkout-shipping-address-block --><!-- wp:woocommerce/checkout-billing-address-block --><div class=\"wp-block-woocommerce-checkout-billing-address-block\"></div><!-- /wp:woocommerce/checkout-billing-address-block --><!-- wp:woocommerce/checkout-shipping-methods-block --><div class=\"wp-block-woocommerce-checkout-shipping-methods-block\"></div><!-- /wp:woocommerce/checkout-shipping-methods-block --><!-- wp:woocommerce/checkout-payment-block --><div class=\"wp-block-woocommerce-checkout-payment-block\"></div><!-- /wp:woocommerce/checkout-payment-block --><!-- wp:woocommerce/checkout-order-note-block --><div class=\"wp-block-woocommerce-checkout-order-note-block\"></div><!-- /wp:woocommerce/checkout-order-note-block --><!-- wp:woocommerce/checkout-terms-block --><div class=\"wp-block-woocommerce-checkout-terms-block\"></div><!-- /wp:woocommerce/checkout-terms-block --><!-- wp:woocommerce/checkout-actions-block --><div class=\"wp-block-woocommerce-checkout-actions-block\"></div><!-- /wp:woocommerce/checkout-actions-block --></div><!-- /wp:woocommerce/checkout-fields-block --><!-- wp:woocommerce/checkout-totals-block --><div class=\"wp-block-woocommerce-checkout-totals-block\"><!-- wp:woocommerce/checkout-order-summary-block --><div class=\"wp-block-woocommerce-checkout-order-summary-block\"></div><!-- /wp:woocommerce/checkout-order-summary-block --></div><!-- /wp:woocommerce/checkout-totals-block --></div><!-- /wp:woocommerce/checkout -->','Checkout','','publish','closed','closed','','checkout','','','2023-06-12 16:30:50','2023-06-12 16:30:50','',0,'http://localhost:8889/?page_id=56',2,'page','',0),(57,0,'2023-06-12 16:30:56','2023-06-12 16:30:56','<!-- wp:shortcode -->[woocommerce_cart]<!-- /wp:shortcode -->','Classic Cart','','publish','closed','closed','','classic-cart','','','2023-06-12 16:30:56','2023-06-12 16:30:56','',55,'http://localhost:8889/?page_id=57',0,'page','',0),(58,0,'2023-06-12 16:30:59','2023-06-12 16:30:59','<!-- wp:shortcode -->[woocommerce_checkout]<!-- /wp:shortcode -->','Classic Checkout','','publish','closed','closed','','classic-checkout','','','2023-06-12 16:30:59','2023-06-12 16:30:59','',56,'http://localhost:8889/?page_id=58',0,'page','',0),(59,0,'2023-06-12 16:31:00','2023-06-12 16:31:00','<!-- wp:shortcode -->[woocommerce_my_account]<!-- /wp:shortcode -->','My Account','','publish','closed','closed','','my-account','','','2023-06-12 16:31:00','2023-06-12 16:31:00','',0,'http://localhost:8889/?page_id=59',3,'page','',0),(60,0,'2023-06-12 16:31:04','2023-06-12 16:31:04','','Terms','','publish','closed','closed','','terms','','','2023-06-12 16:31:04','2023-06-12 16:31:04','',0,'http://localhost:8889/?page_id=60',4,'page','',0),(61,0,'2023-06-12 16:31:08','2023-06-12 16:31:08','','Privacy','','publish','closed','closed','','privacy','','','2023-06-12 16:31:08','2023-06-12 16:31:08','',0,'http://localhost:8889/?page_id=61',3,'page','',0),(62,0,'2023-06-12 16:31:11','2023-06-12 16:31:11','<!-- wp:woocommerce/all-reviews --><div class=\"wp-block-woocommerce-all-reviews wc-block-all-reviews has-image has-name has-date has-rating has-content has-product-name\" data-image-type=\"reviewer\" data-orderby=\"most-recent\" data-reviews-on-page-load=\"10\" data-reviews-on-load-more=\"10\" data-show-load-more=\"true\" data-show-orderby=\"true\"></div><!-- /wp:woocommerce/all-reviews -->','All Reviews','','publish','open','open','','all-reviews','','','2023-06-12 16:31:11','2023-06-12 16:31:11','',0,'http://localhost:8889/?p=62',0,'post','',0),(63,0,'2023-06-12 16:31:12','2023-06-12 16:31:12','<!-- wp:columns --><div class=\"wp-block-columns\"><!-- wp:column {\"width\":\"33.33%\"} --><div class=\"wp-block-column\" style=\"flex-basis:33.33%\"><!-- wp:woocommerce/active-filters --><div class=\"wp-block-woocommerce-active-filters is-loading\" data-display-style=\"list\" data-heading=\"Active filters\" data-heading-level=\"3\"><span aria-hidden=\"true\" class=\"wc-block-active-product-filters__placeholder\"></span></div><!-- /wp:woocommerce/active-filters --><!-- wp:woocommerce/price-filter --><div class=\"wp-block-woocommerce-price-filter is-loading\" data-showinputfields=\"true\" data-showfilterbutton=\"false\" data-heading=\"Filter by price\" data-heading-level=\"3\"><span aria-hidden=\"true\" class=\"wc-block-product-categories__placeholder\"></span></div><!-- /wp:woocommerce/price-filter --><!-- wp:woocommerce/stock-filter --><div class=\"wp-block-woocommerce-stock-filter is-loading\" data-show-counts=\"true\" data-heading=\"Filter by stock status\" data-heading-level=\"3\"><span aria-hidden=\"true\" class=\"wc-block-product-stock-filter__placeholder\"></span></div><!-- /wp:woocommerce/stock-filter --></div><!-- /wp:column --><!-- wp:column {\"width\":\"66.66%\"} --><div class=\"wp-block-column\" style=\"flex-basis:66.66%\"><!-- wp:woocommerce/all-products {\"columns\":3,\"rows\":3,\"alignButtons\":false,\"contentVisibility\":{\"orderBy\":true},\"orderby\":\"date\",\"layoutConfig\":[[\"woocommerce/product-image\",{\"imageSizing\":\"cropped\"}],[\"woocommerce/product-title\"],[\"woocommerce/product-price\"],[\"woocommerce/product-rating\"],[\"woocommerce/product-button\"]]} --><div class=\"wp-block-woocommerce-all-products wc-block-all-products\" data-attributes=\"{&quot;alignButtons&quot;:false,&quot;columns&quot;:3,&quot;contentVisibility&quot;:{&quot;orderBy&quot;:true},&quot;isPreview&quot;:false,&quot;layoutConfig&quot;:[[&quot;woocommerce/product-image&quot;,{&quot;imageSizing&quot;:&quot;cropped&quot;}],[&quot;woocommerce/product-title&quot;],[&quot;woocommerce/product-price&quot;],[&quot;woocommerce/product-rating&quot;],[&quot;woocommerce/product-button&quot;]],&quot;orderby&quot;:&quot;date&quot;,&quot;rows&quot;:3}\"></div><!-- /wp:woocommerce/all-products --></div><!-- /wp:column --></div><!-- /wp:columns -->','Active Product Filters','','publish','open','open','','active-product-filters','','','2023-06-12 16:31:12','2023-06-12 16:31:12','',0,'http://localhost:8889/?p=63',0,'post','',0),(64,0,'2023-06-12 16:31:13','2023-06-12 16:31:13','<!-- wp:woocommerce/product-best-sellers /-->','Best Selling Products','','publish','open','open','','best-selling-products','','','2023-06-12 16:31:13','2023-06-12 16:31:13','',0,'http://localhost:8889/?p=64',0,'post','',0),(65,0,'2023-06-12 16:31:14','2023-06-12 16:31:14','<!-- wp:woocommerce/featured-category {\"editMode\":false,\"categoryId\":20} --><!-- wp:buttons --><div class=\"wp-block-buttons\"><!-- wp:button {\"align\":\"center\"} --><div class=\"wp-block-button aligncenter\"><a class=\"wp-block-button__link\" href=\"http://wpcli.local/product-category/clothing/\">Shop now</a></div><!-- /wp:button --></div><!-- /wp:buttons --><!-- /wp:woocommerce/featured-category -->','Featured Category','','publish','open','open','','featured-category','','','2023-06-12 16:31:14','2023-06-12 16:31:14','',0,'http://localhost:8889/?p=65',0,'post','',0),(66,0,'2023-06-12 16:31:16','2023-06-12 16:31:16','<!-- wp:woocommerce/featured-product {\"editMode\":false,\"productId\":10} --><!-- wp:buttons --><div class=\"wp-block-buttons\"><!-- wp:button {\"align\":\"center\"} --><div class=\"wp-block-button aligncenter\"><a class=\"wp-block-button__link\" href=\"http://wpcli.local/product/beanie/\">Shop now</a></div><!-- /wp:button --></div><!-- /wp:buttons --><!-- /wp:woocommerce/featured-product -->','Featured Product','','publish','open','open','','featured-product','','','2023-06-12 16:31:16','2023-06-12 16:31:16','',0,'http://localhost:8889/?p=66',0,'post','',0),(67,0,'2023-06-12 16:31:17','2023-06-12 16:31:17','<!-- wp:woocommerce/handpicked-products {\"editMode\":false,\"products\":[11,12,13]} /-->','Hand-picked Products','','publish','open','open','','hand-picked-products','','','2023-06-12 16:31:17','2023-06-12 16:31:17','',0,'http://localhost:8889/?p=67',0,'post','',0),(68,0,'2023-06-12 16:31:18','2023-06-12 16:31:18','<!-- wp:woocommerce/product-new /-->','Newest Products','','publish','open','open','','newest-products','','','2023-06-12 16:31:18','2023-06-12 16:31:18','',0,'http://localhost:8889/?p=68',0,'post','',0),(69,0,'2023-06-12 16:31:19','2023-06-12 16:31:19','<!-- wp:woocommerce/product-on-sale /-->','On Sale Products','','publish','open','open','','on-sale-products','','','2023-06-12 16:31:19','2023-06-12 16:31:19','',0,'http://localhost:8889/?p=69',0,'post','',0),(70,0,'2023-06-12 16:31:21','2023-06-12 16:31:21','<!-- wp:woocommerce/product-category {\"categories\":[17]} /-->','Products by Category','','publish','open','open','','products-by-category','','','2023-06-12 16:31:21','2023-06-12 16:31:21','',0,'http://localhost:8889/?p=70',0,'post','',0),(71,0,'2023-06-12 16:31:22','2023-06-12 16:31:22','<!-- wp:woocommerce/product-tag /-->','Products by Tag','','publish','open','open','','products-by-tag','','','2023-06-12 16:31:22','2023-06-12 16:31:22','',0,'http://localhost:8889/?p=71',0,'post','',0),(72,0,'2023-06-12 16:31:24','2023-06-12 16:31:24','<!-- wp:woocommerce/product-categories /-->','Product Categories List','','publish','open','open','','product-categories-list','','','2023-06-12 16:31:24','2023-06-12 16:31:24','',0,'http://localhost:8889/?p=72',0,'post','',0),(73,0,'2023-06-12 16:31:25','2023-06-12 16:31:25','<!-- wp:woocommerce/product-search {\"formId\":\"wc-block-product-search-3\"} /-->','Product Search','','publish','open','open','','product-search','','','2023-06-12 16:31:25','2023-06-12 16:31:25','',0,'http://localhost:8889/?p=73',0,'post','',0),(74,0,'2023-06-12 16:31:26','2023-06-12 16:31:26','<!-- wp:woocommerce/reviews-by-category {\"editMode\":false,\"categoryIds\":[18]} --><div class=\"wp-block-woocommerce-reviews-by-category wc-block-reviews-by-category has-image has-name has-date has-rating has-content has-product-name\" data-image-type=\"reviewer\" data-orderby=\"most-recent\" data-reviews-on-page-load=\"10\" data-reviews-on-load-more=\"10\" data-show-load-more=\"true\" data-show-orderby=\"true\" data-category-ids=\"18\"></div><!-- /wp:woocommerce/reviews-by-category -->','Reviews by Category','','publish','open','open','','reviews-by-category','','','2023-06-12 16:31:26','2023-06-12 16:31:26','',0,'http://localhost:8889/?p=74',0,'post','',0),(75,0,'2023-06-12 16:31:27','2023-06-12 16:31:27','<!-- wp:woocommerce/reviews-by-product {\"editMode\":false,\"productId\":27} --><div class=\"wp-block-woocommerce-reviews-by-product wc-block-reviews-by-product has-image has-name has-date has-rating has-content\" data-image-type=\"reviewer\" data-orderby=\"most-recent\" data-reviews-on-page-load=\"10\" data-reviews-on-load-more=\"10\" data-show-load-more=\"true\" data-show-orderby=\"true\" data-product-id=\"27\"></div><!-- /wp:woocommerce/reviews-by-product -->','Reviews by Product','','publish','open','open','','reviews-by-product','','','2023-06-12 16:31:27','2023-06-12 16:31:27','',0,'http://localhost:8889/?p=75',0,'post','',0),(76,0,'2023-06-12 16:31:29','2023-06-12 16:31:29','<!-- wp:woocommerce/product-top-rated /-->','Top Rated Products','','publish','open','open','','top-rated-products','','','2023-06-12 16:31:29','2023-06-12 16:31:29','',0,'http://localhost:8889/?p=76',0,'post','',0),(77,1,'2023-06-12 16:31:44','2023-06-12 16:31:44','','coupon','','publish','closed','closed','','coupon','','','2023-06-12 16:31:44','2023-06-12 16:31:44','',0,'http://localhost:8889/?post_type=shop_coupon&p=77',0,'shop_coupon','',0);
/*!40000 ALTER TABLE `wp_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_term_relationships`
--

DROP TABLE IF EXISTS `wp_term_relationships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_term_relationships` (
  `object_id` bigint(20) unsigned NOT NULL DEFAULT 0,
  `term_taxonomy_id` bigint(20) unsigned NOT NULL DEFAULT 0,
  `term_order` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`object_id`,`term_taxonomy_id`),
  KEY `term_taxonomy_id` (`term_taxonomy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_term_relationships`
--

LOCK TABLES `wp_term_relationships` WRITE;
/*!40000 ALTER TABLE `wp_term_relationships` DISABLE KEYS */;
INSERT INTO `wp_term_relationships` VALUES (6,2,0),(6,3,0),(6,4,0),(6,5,0),(6,6,0),(6,7,0),(6,8,0),(6,9,0),(6,10,0),(7,2,0),(7,4,0),(7,7,0),(7,9,0),(7,11,0),(8,2,0),(8,11,0),(8,12,0),(9,10,0),(9,12,0),(9,13,0),(10,7,0),(10,12,0),(10,14,0),(11,12,0),(11,14,0),(12,3,0),(12,12,0),(12,14,0),(12,15,0),(13,3,0),(13,12,0),(13,14,0),(14,3,0),(14,11,0),(14,12,0),(14,13,0),(14,16,0),(14,17,0),(15,3,0),(15,11,0),(15,12,0),(16,4,0),(16,10,0),(16,12,0),(17,2,0),(17,10,0),(17,12,0),(18,12,0),(18,18,0),(19,12,0),(19,18,0),(26,10,0),(26,12,0),(26,13,0),(27,7,0),(27,12,0),(27,14,0),(28,19,0),(28,20,0),(29,21,0),(29,22,0),(62,1,0),(63,1,0),(64,1,0),(65,1,0),(66,1,0),(67,1,0),(68,1,0),(69,1,0),(70,1,0),(71,1,0),(72,1,0),(73,1,0),(74,1,0),(75,1,0),(76,1,0);
/*!40000 ALTER TABLE `wp_term_relationships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_term_taxonomy`
--

DROP TABLE IF EXISTS `wp_term_taxonomy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_term_taxonomy` (
  `term_taxonomy_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `term_id` bigint(20) unsigned NOT NULL DEFAULT 0,
  `taxonomy` varchar(32) NOT NULL DEFAULT '',
  `description` longtext NOT NULL,
  `parent` bigint(20) unsigned NOT NULL DEFAULT 0,
  `count` bigint(20) NOT NULL DEFAULT 0,
  PRIMARY KEY (`term_taxonomy_id`),
  UNIQUE KEY `term_id_taxonomy` (`term_id`,`taxonomy`),
  KEY `taxonomy` (`taxonomy`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_term_taxonomy`
--

LOCK TABLES `wp_term_taxonomy` WRITE;
/*!40000 ALTER TABLE `wp_term_taxonomy` DISABLE KEYS */;
INSERT INTO `wp_term_taxonomy` VALUES (1,1,'category','',0,15),(2,2,'pa_color','',0,4),(3,3,'product_visibility','',0,5),(4,4,'pa_color','',0,3),(5,5,'pa_size','',0,1),(6,6,'pa_size','',0,1),(7,7,'pa_color','',0,4),(8,8,'pa_size','',0,1),(9,9,'product_type','',0,2),(10,10,'product_cat','',0,5),(11,11,'product_cat','',0,4),(12,12,'product_type','',0,14),(13,13,'pa_color','',0,3),(14,14,'product_cat','',0,5),(15,15,'pa_color','',0,1),(16,16,'product_visibility','',0,1),(17,17,'product_visibility','',0,1),(18,18,'product_cat','',0,2),(19,19,'product_type','',0,1),(20,20,'product_cat','',0,1),(21,21,'product_type','',0,1),(22,22,'product_cat','',0,1);
/*!40000 ALTER TABLE `wp_term_taxonomy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_termmeta`
--

DROP TABLE IF EXISTS `wp_termmeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_termmeta` (
  `meta_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `term_id` bigint(20) unsigned NOT NULL DEFAULT 0,
  `meta_key` varchar(255) DEFAULT NULL,
  `meta_value` longtext DEFAULT NULL,
  PRIMARY KEY (`meta_id`),
  KEY `term_id` (`term_id`),
  KEY `meta_key` (`meta_key`(191))
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_termmeta`
--

LOCK TABLES `wp_termmeta` WRITE;
/*!40000 ALTER TABLE `wp_termmeta` DISABLE KEYS */;
INSERT INTO `wp_termmeta` VALUES (1,10,'product_count_product_cat','5'),(2,11,'product_count_product_cat','3'),(3,14,'product_count_product_cat','5'),(4,18,'product_count_product_cat','2'),(5,20,'product_count_product_cat','1'),(6,22,'product_count_product_cat','1');
/*!40000 ALTER TABLE `wp_termmeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_terms`
--

DROP TABLE IF EXISTS `wp_terms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_terms` (
  `term_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL DEFAULT '',
  `slug` varchar(200) NOT NULL DEFAULT '',
  `term_group` bigint(10) NOT NULL DEFAULT 0,
  PRIMARY KEY (`term_id`),
  KEY `slug` (`slug`(191)),
  KEY `name` (`name`(191))
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_terms`
--

LOCK TABLES `wp_terms` WRITE;
/*!40000 ALTER TABLE `wp_terms` DISABLE KEYS */;
INSERT INTO `wp_terms` VALUES (1,'Uncategorized','uncategorized',0),(2,'Blue','blue',0),(3,'featured','featured',0),(4,'Green','green',0),(5,'Large','large',0),(6,'Medium','medium',0),(7,'Red','red',0),(8,'Small','small',0),(9,'variable','variable',0),(10,'Tshirts','tshirts',0),(11,'Hoodies','hoodies',0),(12,'simple','simple',0),(13,'Gray','gray',0),(14,'Accessories','accessories',0),(15,'Yellow','yellow',0),(16,'exclude-from-catalog','exclude-from-catalog',0),(17,'exclude-from-search','exclude-from-search',0),(18,'Music','music',0),(19,'grouped','grouped',0),(20,'Clothing','clothing',0),(21,'external','external',0),(22,'Decor','decor',0);
/*!40000 ALTER TABLE `wp_terms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_usermeta`
--

DROP TABLE IF EXISTS `wp_usermeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_usermeta` (
  `umeta_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL DEFAULT 0,
  `meta_key` varchar(255) DEFAULT NULL,
  `meta_value` longtext DEFAULT NULL,
  PRIMARY KEY (`umeta_id`),
  KEY `user_id` (`user_id`),
  KEY `meta_key` (`meta_key`(191))
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_usermeta`
--

LOCK TABLES `wp_usermeta` WRITE;
/*!40000 ALTER TABLE `wp_usermeta` DISABLE KEYS */;
INSERT INTO `wp_usermeta` VALUES (1,1,'nickname','admin'),(2,1,'first_name',''),(3,1,'last_name',''),(4,1,'description',''),(5,1,'rich_editing','true'),(6,1,'syntax_highlighting','true'),(7,1,'comment_shortcuts','false'),(8,1,'admin_color','fresh'),(9,1,'use_ssl','0'),(10,1,'show_admin_bar_front','true'),(11,1,'locale',''),(12,1,'wp_capabilities','a:1:{s:13:\"administrator\";b:1;}'),(13,1,'wp_user_level','10'),(14,1,'dismissed_wp_pointers',''),(15,1,'show_welcome_panel','1');
/*!40000 ALTER TABLE `wp_usermeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_users`
--

DROP TABLE IF EXISTS `wp_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_users` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_login` varchar(60) NOT NULL DEFAULT '',
  `user_pass` varchar(255) NOT NULL DEFAULT '',
  `user_nicename` varchar(50) NOT NULL DEFAULT '',
  `user_email` varchar(100) NOT NULL DEFAULT '',
  `user_url` varchar(100) NOT NULL DEFAULT '',
  `user_registered` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_activation_key` varchar(255) NOT NULL DEFAULT '',
  `user_status` int(11) NOT NULL DEFAULT 0,
  `display_name` varchar(250) NOT NULL DEFAULT '',
  PRIMARY KEY (`ID`),
  KEY `user_login_key` (`user_login`),
  KEY `user_nicename` (`user_nicename`),
  KEY `user_email` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_users`
--

LOCK TABLES `wp_users` WRITE;
/*!40000 ALTER TABLE `wp_users` DISABLE KEYS */;
INSERT INTO `wp_users` VALUES (1,'admin','$P$B7SRwiAaA8WQnkVYTbs8GDZOAKQSVR1','admin','wordpress@example.com','http://localhost:8889','2023-06-08 11:20:31','',0,'admin');
/*!40000 ALTER TABLE `wp_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_wc_admin_note_actions`
--

DROP TABLE IF EXISTS `wp_wc_admin_note_actions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_wc_admin_note_actions` (
  `action_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `note_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `label` varchar(255) NOT NULL,
  `query` longtext NOT NULL,
  `status` varchar(255) NOT NULL,
  `actioned_text` varchar(255) NOT NULL,
  `nonce_action` varchar(255) DEFAULT NULL,
  `nonce_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`action_id`),
  KEY `note_id` (`note_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_wc_admin_note_actions`
--

LOCK TABLES `wp_wc_admin_note_actions` WRITE;
/*!40000 ALTER TABLE `wp_wc_admin_note_actions` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_wc_admin_note_actions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_wc_admin_notes`
--

DROP TABLE IF EXISTS `wp_wc_admin_notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_wc_admin_notes` (
  `note_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` varchar(20) NOT NULL,
  `locale` varchar(20) NOT NULL,
  `title` longtext NOT NULL,
  `content` longtext NOT NULL,
  `content_data` longtext DEFAULT NULL,
  `status` varchar(200) NOT NULL,
  `source` varchar(200) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `date_reminder` datetime DEFAULT NULL,
  `is_snoozable` tinyint(1) NOT NULL DEFAULT 0,
  `layout` varchar(20) NOT NULL DEFAULT '',
  `image` varchar(200) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `icon` varchar(200) NOT NULL DEFAULT 'info',
  PRIMARY KEY (`note_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_wc_admin_notes`
--

LOCK TABLES `wp_wc_admin_notes` WRITE;
/*!40000 ALTER TABLE `wp_wc_admin_notes` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_wc_admin_notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_wc_category_lookup`
--

DROP TABLE IF EXISTS `wp_wc_category_lookup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_wc_category_lookup` (
  `category_tree_id` bigint(20) unsigned NOT NULL,
  `category_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`category_tree_id`,`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_wc_category_lookup`
--

LOCK TABLES `wp_wc_category_lookup` WRITE;
/*!40000 ALTER TABLE `wp_wc_category_lookup` DISABLE KEYS */;
INSERT INTO `wp_wc_category_lookup` VALUES (10,10),(11,11),(14,14),(18,18),(20,20),(22,22);
/*!40000 ALTER TABLE `wp_wc_category_lookup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_wc_customer_lookup`
--

DROP TABLE IF EXISTS `wp_wc_customer_lookup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_wc_customer_lookup` (
  `customer_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `username` varchar(60) NOT NULL DEFAULT '',
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `date_last_active` timestamp NULL DEFAULT NULL,
  `date_registered` timestamp NULL DEFAULT NULL,
  `country` char(2) NOT NULL DEFAULT '',
  `postcode` varchar(20) NOT NULL DEFAULT '',
  `city` varchar(100) NOT NULL DEFAULT '',
  `state` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_wc_customer_lookup`
--

LOCK TABLES `wp_wc_customer_lookup` WRITE;
/*!40000 ALTER TABLE `wp_wc_customer_lookup` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_wc_customer_lookup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_wc_download_log`
--

DROP TABLE IF EXISTS `wp_wc_download_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_wc_download_log` (
  `download_log_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` datetime NOT NULL,
  `permission_id` bigint(20) unsigned NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `user_ip_address` varchar(100) DEFAULT '',
  PRIMARY KEY (`download_log_id`),
  KEY `permission_id` (`permission_id`),
  KEY `timestamp` (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_wc_download_log`
--

LOCK TABLES `wp_wc_download_log` WRITE;
/*!40000 ALTER TABLE `wp_wc_download_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_wc_download_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_wc_order_coupon_lookup`
--

DROP TABLE IF EXISTS `wp_wc_order_coupon_lookup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_wc_order_coupon_lookup` (
  `order_id` bigint(20) unsigned NOT NULL,
  `coupon_id` bigint(20) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `discount_amount` double NOT NULL DEFAULT 0,
  PRIMARY KEY (`order_id`,`coupon_id`),
  KEY `coupon_id` (`coupon_id`),
  KEY `date_created` (`date_created`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_wc_order_coupon_lookup`
--

LOCK TABLES `wp_wc_order_coupon_lookup` WRITE;
/*!40000 ALTER TABLE `wp_wc_order_coupon_lookup` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_wc_order_coupon_lookup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_wc_order_product_lookup`
--

DROP TABLE IF EXISTS `wp_wc_order_product_lookup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_wc_order_product_lookup` (
  `order_item_id` bigint(20) unsigned NOT NULL,
  `order_id` bigint(20) unsigned NOT NULL,
  `product_id` bigint(20) unsigned NOT NULL,
  `variation_id` bigint(20) unsigned NOT NULL,
  `customer_id` bigint(20) unsigned DEFAULT NULL,
  `date_created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `product_qty` int(11) NOT NULL,
  `product_net_revenue` double NOT NULL DEFAULT 0,
  `product_gross_revenue` double NOT NULL DEFAULT 0,
  `coupon_amount` double NOT NULL DEFAULT 0,
  `tax_amount` double NOT NULL DEFAULT 0,
  `shipping_amount` double NOT NULL DEFAULT 0,
  `shipping_tax_amount` double NOT NULL DEFAULT 0,
  PRIMARY KEY (`order_item_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  KEY `customer_id` (`customer_id`),
  KEY `date_created` (`date_created`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_wc_order_product_lookup`
--

LOCK TABLES `wp_wc_order_product_lookup` WRITE;
/*!40000 ALTER TABLE `wp_wc_order_product_lookup` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_wc_order_product_lookup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_wc_order_stats`
--

DROP TABLE IF EXISTS `wp_wc_order_stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_wc_order_stats` (
  `order_id` bigint(20) unsigned NOT NULL,
  `parent_id` bigint(20) unsigned NOT NULL DEFAULT 0,
  `date_created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `date_created_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `date_paid` datetime DEFAULT '0000-00-00 00:00:00',
  `date_completed` datetime DEFAULT '0000-00-00 00:00:00',
  `num_items_sold` int(11) NOT NULL DEFAULT 0,
  `total_sales` double NOT NULL DEFAULT 0,
  `tax_total` double NOT NULL DEFAULT 0,
  `shipping_total` double NOT NULL DEFAULT 0,
  `net_total` double NOT NULL DEFAULT 0,
  `returning_customer` tinyint(1) DEFAULT NULL,
  `status` varchar(200) NOT NULL,
  `customer_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `date_created` (`date_created`),
  KEY `customer_id` (`customer_id`),
  KEY `status` (`status`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_wc_order_stats`
--

LOCK TABLES `wp_wc_order_stats` WRITE;
/*!40000 ALTER TABLE `wp_wc_order_stats` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_wc_order_stats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_wc_order_tax_lookup`
--

DROP TABLE IF EXISTS `wp_wc_order_tax_lookup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_wc_order_tax_lookup` (
  `order_id` bigint(20) unsigned NOT NULL,
  `tax_rate_id` bigint(20) unsigned NOT NULL,
  `date_created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `shipping_tax` double NOT NULL DEFAULT 0,
  `order_tax` double NOT NULL DEFAULT 0,
  `total_tax` double NOT NULL DEFAULT 0,
  PRIMARY KEY (`order_id`,`tax_rate_id`),
  KEY `tax_rate_id` (`tax_rate_id`),
  KEY `date_created` (`date_created`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_wc_order_tax_lookup`
--

LOCK TABLES `wp_wc_order_tax_lookup` WRITE;
/*!40000 ALTER TABLE `wp_wc_order_tax_lookup` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_wc_order_tax_lookup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_wc_product_attributes_lookup`
--

DROP TABLE IF EXISTS `wp_wc_product_attributes_lookup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_wc_product_attributes_lookup` (
  `product_id` bigint(20) NOT NULL,
  `product_or_parent_id` bigint(20) NOT NULL,
  `taxonomy` varchar(32) NOT NULL,
  `term_id` bigint(20) NOT NULL,
  `is_variation_attribute` tinyint(1) NOT NULL,
  `in_stock` tinyint(1) NOT NULL,
  PRIMARY KEY (`product_or_parent_id`,`term_id`,`product_id`,`taxonomy`),
  KEY `is_variation_attribute_term_id` (`is_variation_attribute`,`term_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_wc_product_attributes_lookup`
--

LOCK TABLES `wp_wc_product_attributes_lookup` WRITE;
/*!40000 ALTER TABLE `wp_wc_product_attributes_lookup` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_wc_product_attributes_lookup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_wc_product_download_directories`
--

DROP TABLE IF EXISTS `wp_wc_product_download_directories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_wc_product_download_directories` (
  `url_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `url` varchar(256) NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`url_id`),
  KEY `url` (`url`(191))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_wc_product_download_directories`
--

LOCK TABLES `wp_wc_product_download_directories` WRITE;
/*!40000 ALTER TABLE `wp_wc_product_download_directories` DISABLE KEYS */;
INSERT INTO `wp_wc_product_download_directories` VALUES (1,'file:///var/www/html/wp-content/uploads/woocommerce_uploads/',1),(2,'http://localhost:8889/wp-content/uploads/woocommerce_uploads/',1);
/*!40000 ALTER TABLE `wp_wc_product_download_directories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_wc_product_meta_lookup`
--

DROP TABLE IF EXISTS `wp_wc_product_meta_lookup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_wc_product_meta_lookup` (
  `product_id` bigint(20) NOT NULL,
  `sku` varchar(100) DEFAULT '',
  `virtual` tinyint(1) DEFAULT 0,
  `downloadable` tinyint(1) DEFAULT 0,
  `min_price` decimal(19,4) DEFAULT NULL,
  `max_price` decimal(19,4) DEFAULT NULL,
  `onsale` tinyint(1) DEFAULT 0,
  `stock_quantity` double DEFAULT NULL,
  `stock_status` varchar(100) DEFAULT 'instock',
  `rating_count` bigint(20) DEFAULT 0,
  `average_rating` decimal(3,2) DEFAULT 0.00,
  `total_sales` bigint(20) DEFAULT 0,
  `tax_status` varchar(100) DEFAULT 'taxable',
  `tax_class` varchar(100) DEFAULT '',
  PRIMARY KEY (`product_id`),
  KEY `virtual` (`virtual`),
  KEY `downloadable` (`downloadable`),
  KEY `stock_status` (`stock_status`),
  KEY `stock_quantity` (`stock_quantity`),
  KEY `onsale` (`onsale`),
  KEY `min_max_price` (`min_price`,`max_price`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_wc_product_meta_lookup`
--

LOCK TABLES `wp_wc_product_meta_lookup` WRITE;
/*!40000 ALTER TABLE `wp_wc_product_meta_lookup` DISABLE KEYS */;
INSERT INTO `wp_wc_product_meta_lookup` VALUES (6,'woo-vneck-tee',0,0,15.0000,20.0000,0,NULL,'instock',0,0.00,0,'taxable',''),(7,'woo-hoodie',0,0,42.0000,45.0000,0,NULL,'instock',0,0.00,0,'taxable',''),(8,'woo-hoodie-with-logo',0,0,45.0000,45.0000,0,NULL,'instock',0,0.00,0,'taxable',''),(9,'woo-tshirt',0,0,18.0000,18.0000,0,NULL,'instock',0,0.00,0,'taxable',''),(10,'woo-beanie',0,0,18.0000,18.0000,1,NULL,'instock',0,0.00,0,'taxable',''),(11,'woo-belt',0,0,55.0000,55.0000,1,NULL,'instock',0,0.00,0,'taxable',''),(12,'woo-cap',0,0,16.0000,16.0000,1,NULL,'instock',0,0.00,0,'taxable',''),(13,'woo-sunglasses',0,0,90.0000,90.0000,0,NULL,'instock',0,0.00,0,'taxable',''),(14,'woo-hoodie-with-pocket',0,0,35.0000,35.0000,1,NULL,'instock',0,0.00,0,'taxable',''),(15,'woo-hoodie-with-zipper',0,0,45.0000,45.0000,0,NULL,'instock',0,0.00,0,'taxable',''),(16,'woo-long-sleeve-tee',0,0,25.0000,25.0000,0,NULL,'instock',0,0.00,0,'taxable',''),(17,'woo-polo',0,0,20.0000,20.0000,0,NULL,'instock',0,0.00,0,'taxable',''),(18,'woo-album',1,1,15.0000,15.0000,0,NULL,'instock',0,0.00,0,'taxable',''),(19,'woo-single',1,1,2.0000,2.0000,1,NULL,'instock',0,0.00,0,'taxable',''),(20,'woo-vneck-tee-red',0,0,20.0000,20.0000,0,NULL,'instock',0,0.00,0,'taxable',''),(21,'woo-vneck-tee-green',0,0,20.0000,20.0000,0,NULL,'instock',0,0.00,0,'taxable',''),(22,'woo-vneck-tee-blue',0,0,15.0000,15.0000,0,NULL,'instock',0,0.00,0,'taxable',''),(23,'woo-hoodie-red',0,0,42.0000,42.0000,1,NULL,'instock',0,0.00,0,'taxable',''),(24,'woo-hoodie-green',0,0,45.0000,45.0000,0,NULL,'instock',0,0.00,0,'taxable',''),(25,'woo-hoodie-blue',0,0,45.0000,45.0000,0,NULL,'instock',0,0.00,0,'taxable',''),(26,'Woo-tshirt-logo',0,0,18.0000,18.0000,0,NULL,'instock',0,0.00,0,'taxable',''),(27,'Woo-beanie-logo',0,0,18.0000,18.0000,1,NULL,'instock',0,0.00,0,'taxable',''),(28,'logo-collection',0,0,18.0000,45.0000,0,NULL,'instock',0,0.00,0,'taxable',''),(29,'wp-pennant',0,0,11.0500,11.0500,0,NULL,'instock',0,0.00,0,'taxable',''),(30,'woo-hoodie-blue-logo',0,0,45.0000,45.0000,0,NULL,'instock',0,0.00,0,'taxable','');
/*!40000 ALTER TABLE `wp_wc_product_meta_lookup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_wc_rate_limits`
--

DROP TABLE IF EXISTS `wp_wc_rate_limits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_wc_rate_limits` (
  `rate_limit_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `rate_limit_key` varchar(200) NOT NULL,
  `rate_limit_expiry` bigint(20) unsigned NOT NULL,
  `rate_limit_remaining` smallint(10) NOT NULL DEFAULT 0,
  PRIMARY KEY (`rate_limit_id`),
  UNIQUE KEY `rate_limit_key` (`rate_limit_key`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_wc_rate_limits`
--

LOCK TABLES `wp_wc_rate_limits` WRITE;
/*!40000 ALTER TABLE `wp_wc_rate_limits` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_wc_rate_limits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_wc_reserved_stock`
--

DROP TABLE IF EXISTS `wp_wc_reserved_stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_wc_reserved_stock` (
  `order_id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `stock_quantity` double NOT NULL DEFAULT 0,
  `timestamp` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `expires` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`order_id`,`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_wc_reserved_stock`
--

LOCK TABLES `wp_wc_reserved_stock` WRITE;
/*!40000 ALTER TABLE `wp_wc_reserved_stock` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_wc_reserved_stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_wc_tax_rate_classes`
--

DROP TABLE IF EXISTS `wp_wc_tax_rate_classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_wc_tax_rate_classes` (
  `tax_rate_class_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL DEFAULT '',
  `slug` varchar(200) NOT NULL DEFAULT '',
  PRIMARY KEY (`tax_rate_class_id`),
  UNIQUE KEY `slug` (`slug`(191))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_wc_tax_rate_classes`
--

LOCK TABLES `wp_wc_tax_rate_classes` WRITE;
/*!40000 ALTER TABLE `wp_wc_tax_rate_classes` DISABLE KEYS */;
INSERT INTO `wp_wc_tax_rate_classes` VALUES (1,'Reduced rate','reduced-rate'),(2,'Zero rate','zero-rate');
/*!40000 ALTER TABLE `wp_wc_tax_rate_classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_wc_webhooks`
--

DROP TABLE IF EXISTS `wp_wc_webhooks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_wc_webhooks` (
  `webhook_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `status` varchar(200) NOT NULL,
  `name` text NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `delivery_url` text NOT NULL,
  `secret` text NOT NULL,
  `topic` varchar(200) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `date_created_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `date_modified` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `date_modified_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `api_version` smallint(4) NOT NULL,
  `failure_count` smallint(10) NOT NULL DEFAULT 0,
  `pending_delivery` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`webhook_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_wc_webhooks`
--

LOCK TABLES `wp_wc_webhooks` WRITE;
/*!40000 ALTER TABLE `wp_wc_webhooks` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_wc_webhooks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_woocommerce_api_keys`
--

DROP TABLE IF EXISTS `wp_woocommerce_api_keys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_woocommerce_api_keys` (
  `key_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `permissions` varchar(10) NOT NULL,
  `consumer_key` char(64) NOT NULL,
  `consumer_secret` char(43) NOT NULL,
  `nonces` longtext DEFAULT NULL,
  `truncated_key` char(7) NOT NULL,
  `last_access` datetime DEFAULT NULL,
  PRIMARY KEY (`key_id`),
  KEY `consumer_key` (`consumer_key`),
  KEY `consumer_secret` (`consumer_secret`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_woocommerce_api_keys`
--

LOCK TABLES `wp_woocommerce_api_keys` WRITE;
/*!40000 ALTER TABLE `wp_woocommerce_api_keys` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_woocommerce_api_keys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_woocommerce_attribute_taxonomies`
--

DROP TABLE IF EXISTS `wp_woocommerce_attribute_taxonomies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_woocommerce_attribute_taxonomies` (
  `attribute_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `attribute_name` varchar(200) NOT NULL,
  `attribute_label` varchar(200) DEFAULT NULL,
  `attribute_type` varchar(20) NOT NULL,
  `attribute_orderby` varchar(20) NOT NULL,
  `attribute_public` int(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`attribute_id`),
  KEY `attribute_name` (`attribute_name`(20))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_woocommerce_attribute_taxonomies`
--

LOCK TABLES `wp_woocommerce_attribute_taxonomies` WRITE;
/*!40000 ALTER TABLE `wp_woocommerce_attribute_taxonomies` DISABLE KEYS */;
INSERT INTO `wp_woocommerce_attribute_taxonomies` VALUES (1,'color','Color','select','menu_order',0),(2,'size','Size','select','menu_order',0);
/*!40000 ALTER TABLE `wp_woocommerce_attribute_taxonomies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_woocommerce_downloadable_product_permissions`
--

DROP TABLE IF EXISTS `wp_woocommerce_downloadable_product_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_woocommerce_downloadable_product_permissions` (
  `permission_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `download_id` varchar(36) NOT NULL,
  `product_id` bigint(20) unsigned NOT NULL,
  `order_id` bigint(20) unsigned NOT NULL DEFAULT 0,
  `order_key` varchar(200) NOT NULL,
  `user_email` varchar(200) NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `downloads_remaining` varchar(9) DEFAULT NULL,
  `access_granted` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `access_expires` datetime DEFAULT NULL,
  `download_count` bigint(20) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`permission_id`),
  KEY `download_order_key_product` (`product_id`,`order_id`,`order_key`(16),`download_id`),
  KEY `download_order_product` (`download_id`,`order_id`,`product_id`),
  KEY `order_id` (`order_id`),
  KEY `user_order_remaining_expires` (`user_id`,`order_id`,`downloads_remaining`,`access_expires`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_woocommerce_downloadable_product_permissions`
--

LOCK TABLES `wp_woocommerce_downloadable_product_permissions` WRITE;
/*!40000 ALTER TABLE `wp_woocommerce_downloadable_product_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_woocommerce_downloadable_product_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_woocommerce_log`
--

DROP TABLE IF EXISTS `wp_woocommerce_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_woocommerce_log` (
  `log_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` datetime NOT NULL,
  `level` smallint(4) NOT NULL,
  `source` varchar(200) NOT NULL,
  `message` longtext NOT NULL,
  `context` longtext DEFAULT NULL,
  PRIMARY KEY (`log_id`),
  KEY `level` (`level`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_woocommerce_log`
--

LOCK TABLES `wp_woocommerce_log` WRITE;
/*!40000 ALTER TABLE `wp_woocommerce_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_woocommerce_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_woocommerce_order_itemmeta`
--

DROP TABLE IF EXISTS `wp_woocommerce_order_itemmeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_woocommerce_order_itemmeta` (
  `meta_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `order_item_id` bigint(20) unsigned NOT NULL,
  `meta_key` varchar(255) DEFAULT NULL,
  `meta_value` longtext DEFAULT NULL,
  PRIMARY KEY (`meta_id`),
  KEY `order_item_id` (`order_item_id`),
  KEY `meta_key` (`meta_key`(32))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_woocommerce_order_itemmeta`
--

LOCK TABLES `wp_woocommerce_order_itemmeta` WRITE;
/*!40000 ALTER TABLE `wp_woocommerce_order_itemmeta` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_woocommerce_order_itemmeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_woocommerce_order_items`
--

DROP TABLE IF EXISTS `wp_woocommerce_order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_woocommerce_order_items` (
  `order_item_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `order_item_name` text NOT NULL,
  `order_item_type` varchar(200) NOT NULL DEFAULT '',
  `order_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`order_item_id`),
  KEY `order_id` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_woocommerce_order_items`
--

LOCK TABLES `wp_woocommerce_order_items` WRITE;
/*!40000 ALTER TABLE `wp_woocommerce_order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_woocommerce_order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_woocommerce_payment_tokenmeta`
--

DROP TABLE IF EXISTS `wp_woocommerce_payment_tokenmeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_woocommerce_payment_tokenmeta` (
  `meta_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `payment_token_id` bigint(20) unsigned NOT NULL,
  `meta_key` varchar(255) DEFAULT NULL,
  `meta_value` longtext DEFAULT NULL,
  PRIMARY KEY (`meta_id`),
  KEY `payment_token_id` (`payment_token_id`),
  KEY `meta_key` (`meta_key`(32))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_woocommerce_payment_tokenmeta`
--

LOCK TABLES `wp_woocommerce_payment_tokenmeta` WRITE;
/*!40000 ALTER TABLE `wp_woocommerce_payment_tokenmeta` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_woocommerce_payment_tokenmeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_woocommerce_payment_tokens`
--

DROP TABLE IF EXISTS `wp_woocommerce_payment_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_woocommerce_payment_tokens` (
  `token_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `gateway_id` varchar(200) NOT NULL,
  `token` text NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL DEFAULT 0,
  `type` varchar(200) NOT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`token_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_woocommerce_payment_tokens`
--

LOCK TABLES `wp_woocommerce_payment_tokens` WRITE;
/*!40000 ALTER TABLE `wp_woocommerce_payment_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_woocommerce_payment_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_woocommerce_sessions`
--

DROP TABLE IF EXISTS `wp_woocommerce_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_woocommerce_sessions` (
  `session_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `session_key` char(32) NOT NULL,
  `session_value` longtext NOT NULL,
  `session_expiry` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`session_id`),
  UNIQUE KEY `session_key` (`session_key`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_woocommerce_sessions`
--

LOCK TABLES `wp_woocommerce_sessions` WRITE;
/*!40000 ALTER TABLE `wp_woocommerce_sessions` DISABLE KEYS */;
INSERT INTO `wp_woocommerce_sessions` VALUES (1,'1','a:7:{s:4:\"cart\";s:6:\"a:0:{}\";s:11:\"cart_totals\";s:367:\"a:15:{s:8:\"subtotal\";i:0;s:12:\"subtotal_tax\";i:0;s:14:\"shipping_total\";i:0;s:12:\"shipping_tax\";i:0;s:14:\"shipping_taxes\";a:0:{}s:14:\"discount_total\";i:0;s:12:\"discount_tax\";i:0;s:19:\"cart_contents_total\";i:0;s:17:\"cart_contents_tax\";i:0;s:19:\"cart_contents_taxes\";a:0:{}s:9:\"fee_total\";i:0;s:7:\"fee_tax\";i:0;s:9:\"fee_taxes\";a:0:{}s:5:\"total\";i:0;s:9:\"total_tax\";i:0;}\";s:15:\"applied_coupons\";s:6:\"a:0:{}\";s:22:\"coupon_discount_totals\";s:6:\"a:0:{}\";s:26:\"coupon_discount_tax_totals\";s:6:\"a:0:{}\";s:21:\"removed_cart_contents\";s:6:\"a:0:{}\";s:8:\"customer\";s:742:\"a:27:{s:2:\"id\";s:1:\"1\";s:13:\"date_modified\";s:0:\"\";s:8:\"postcode\";s:0:\"\";s:4:\"city\";s:0:\"\";s:9:\"address_1\";s:0:\"\";s:7:\"address\";s:0:\"\";s:9:\"address_2\";s:0:\"\";s:5:\"state\";s:2:\"CA\";s:7:\"country\";s:2:\"US\";s:17:\"shipping_postcode\";s:0:\"\";s:13:\"shipping_city\";s:0:\"\";s:18:\"shipping_address_1\";s:0:\"\";s:16:\"shipping_address\";s:0:\"\";s:18:\"shipping_address_2\";s:0:\"\";s:14:\"shipping_state\";s:2:\"CA\";s:16:\"shipping_country\";s:2:\"US\";s:13:\"is_vat_exempt\";s:0:\"\";s:19:\"calculated_shipping\";s:0:\"\";s:10:\"first_name\";s:0:\"\";s:9:\"last_name\";s:0:\"\";s:7:\"company\";s:0:\"\";s:5:\"phone\";s:0:\"\";s:5:\"email\";s:21:\"wordpress@example.com\";s:19:\"shipping_first_name\";s:0:\"\";s:18:\"shipping_last_name\";s:0:\"\";s:16:\"shipping_company\";s:0:\"\";s:14:\"shipping_phone\";s:0:\"\";}\";}',1686758244);
/*!40000 ALTER TABLE `wp_woocommerce_sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_woocommerce_shipping_zone_locations`
--

DROP TABLE IF EXISTS `wp_woocommerce_shipping_zone_locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_woocommerce_shipping_zone_locations` (
  `location_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `zone_id` bigint(20) unsigned NOT NULL,
  `location_code` varchar(200) NOT NULL,
  `location_type` varchar(40) NOT NULL,
  PRIMARY KEY (`location_id`),
  KEY `location_id` (`location_id`),
  KEY `location_type_code` (`location_type`(10),`location_code`(20))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_woocommerce_shipping_zone_locations`
--

LOCK TABLES `wp_woocommerce_shipping_zone_locations` WRITE;
/*!40000 ALTER TABLE `wp_woocommerce_shipping_zone_locations` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_woocommerce_shipping_zone_locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_woocommerce_shipping_zone_methods`
--

DROP TABLE IF EXISTS `wp_woocommerce_shipping_zone_methods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_woocommerce_shipping_zone_methods` (
  `zone_id` bigint(20) unsigned NOT NULL,
  `instance_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `method_id` varchar(200) NOT NULL,
  `method_order` bigint(20) unsigned NOT NULL,
  `is_enabled` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`instance_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_woocommerce_shipping_zone_methods`
--

LOCK TABLES `wp_woocommerce_shipping_zone_methods` WRITE;
/*!40000 ALTER TABLE `wp_woocommerce_shipping_zone_methods` DISABLE KEYS */;
INSERT INTO `wp_woocommerce_shipping_zone_methods` VALUES (0,1,'flat_rate',1,1),(0,2,'free_shipping',2,1);
/*!40000 ALTER TABLE `wp_woocommerce_shipping_zone_methods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_woocommerce_shipping_zones`
--

DROP TABLE IF EXISTS `wp_woocommerce_shipping_zones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_woocommerce_shipping_zones` (
  `zone_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `zone_name` varchar(200) NOT NULL,
  `zone_order` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`zone_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_woocommerce_shipping_zones`
--

LOCK TABLES `wp_woocommerce_shipping_zones` WRITE;
/*!40000 ALTER TABLE `wp_woocommerce_shipping_zones` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_woocommerce_shipping_zones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_woocommerce_tax_rate_locations`
--

DROP TABLE IF EXISTS `wp_woocommerce_tax_rate_locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_woocommerce_tax_rate_locations` (
  `location_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `location_code` varchar(200) NOT NULL,
  `tax_rate_id` bigint(20) unsigned NOT NULL,
  `location_type` varchar(40) NOT NULL,
  PRIMARY KEY (`location_id`),
  KEY `tax_rate_id` (`tax_rate_id`),
  KEY `location_type_code` (`location_type`(10),`location_code`(20))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_woocommerce_tax_rate_locations`
--

LOCK TABLES `wp_woocommerce_tax_rate_locations` WRITE;
/*!40000 ALTER TABLE `wp_woocommerce_tax_rate_locations` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_woocommerce_tax_rate_locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_woocommerce_tax_rates`
--

DROP TABLE IF EXISTS `wp_woocommerce_tax_rates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_woocommerce_tax_rates` (
  `tax_rate_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tax_rate_country` varchar(2) NOT NULL DEFAULT '',
  `tax_rate_state` varchar(200) NOT NULL DEFAULT '',
  `tax_rate` varchar(8) NOT NULL DEFAULT '',
  `tax_rate_name` varchar(200) NOT NULL DEFAULT '',
  `tax_rate_priority` bigint(20) unsigned NOT NULL,
  `tax_rate_compound` int(1) NOT NULL DEFAULT 0,
  `tax_rate_shipping` int(1) NOT NULL DEFAULT 1,
  `tax_rate_order` bigint(20) unsigned NOT NULL,
  `tax_rate_class` varchar(200) NOT NULL DEFAULT '',
  PRIMARY KEY (`tax_rate_id`),
  KEY `tax_rate_country` (`tax_rate_country`),
  KEY `tax_rate_state` (`tax_rate_state`(2)),
  KEY `tax_rate_class` (`tax_rate_class`(10)),
  KEY `tax_rate_priority` (`tax_rate_priority`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_woocommerce_tax_rates`
--

LOCK TABLES `wp_woocommerce_tax_rates` WRITE;
/*!40000 ALTER TABLE `wp_woocommerce_tax_rates` DISABLE KEYS */;
INSERT INTO `wp_woocommerce_tax_rates` VALUES (1,'','','10.0000','',1,0,1,0,''),(2,'','','5.0000','',1,0,1,0,'reduced-rate'),(3,'','','0.0000','',1,0,1,0,'zero-rate');
/*!40000 ALTER TABLE `wp_woocommerce_tax_rates` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-12 16:35:05
