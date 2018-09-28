-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.5.47-log - MySQL Community Server (GPL)
-- 服务器操作系统:                      Win32
-- HeidiSQL 版本:                  9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 导出 mini_note 的数据库结构
CREATE DATABASE IF NOT EXISTS `mini_note` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `mini_note`;


-- 导出  表 mini_note.mn_articles 结构
CREATE TABLE IF NOT EXISTS `mn_articles` (
  `aid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(32) NOT NULL,
  `content` text,
  `tags` varchar(50) DEFAULT NULL,
  `is_show` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `is_deleted` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`aid`),
  KEY `idx_title` (`title`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- 正在导出表  mini_note.mn_articles 的数据：0 rows
/*!40000 ALTER TABLE `mn_articles` DISABLE KEYS */;
/*!40000 ALTER TABLE `mn_articles` ENABLE KEYS */;


-- 导出  表 mini_note.mn_article_tag 结构
CREATE TABLE IF NOT EXISTS `mn_article_tag` (
  `id` int(10) unsigned NOT NULL,
  `aid` int(10) unsigned NOT NULL DEFAULT '0',
  `tid` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `idx_aid` (`aid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- 正在导出表  mini_note.mn_article_tag 的数据：0 rows
/*!40000 ALTER TABLE `mn_article_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `mn_article_tag` ENABLE KEYS */;


-- 导出  表 mini_note.mn_tags 结构
CREATE TABLE IF NOT EXISTS `mn_tags` (
  `tid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(20) NOT NULL,
  `is_able` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`tid`),
  KEY `idx_title` (`title`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- 正在导出表  mini_note.mn_tags 的数据：0 rows
/*!40000 ALTER TABLE `mn_tags` DISABLE KEYS */;
INSERT INTO `mn_tags` (`tid`, `title`, `is_able`, `update_time`) VALUES
	(1, '56465', 1, '2018-09-28 17:57:16'),
	(5, 'hhhhhhhhhhhhhhhhhh', 1, '2018-09-28 18:04:19'),
	(4, 'tyyyyyyyyyyyyyyyyyyy', 0, '2018-09-28 18:04:14'),
	(6, 'tttttttttttttttttt', 1, '2018-09-28 18:04:23'),
	(7, 'yuiyuiy', 0, '2018-09-28 18:05:39'),
	(8, 'hjkhjkhjk', 1, '2018-09-28 18:05:42'),
	(9, 'yuiyuiyui', 1, '2018-09-28 18:04:32'),
	(10, 'hjkhjkhj', 1, '2018-09-28 18:05:43'),
	(11, '657657567', 0, '2018-09-28 18:05:34'),
	(12, 'yuiyuiyu', 1, '2018-09-28 18:04:42'),
	(13, 'hjkhjkhjkhj', 1, '2018-09-28 18:04:48'),
	(14, 'uyityutyutyu', 1, '2018-09-28 18:04:53'),
	(15, 'yuiyuiyuiyuiyu', 1, '2018-09-28 18:04:59'),
	(16, 'ytuitutyutttt65', 0, '2018-09-28 18:05:25'),
	(17, '76666776', 1, '2018-09-28 18:05:31');
/*!40000 ALTER TABLE `mn_tags` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
