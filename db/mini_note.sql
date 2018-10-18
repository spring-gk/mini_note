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


-- 导出  表 mini_note.mn_notes 结构
CREATE TABLE IF NOT EXISTS `mn_notes` (
  `tid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(20) NOT NULL,
  `is_able` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`tid`),
  KEY `idx_title` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- 正在导出表  mini_note.mn_notes 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `mn_notes` DISABLE KEYS */;
INSERT INTO `mn_notes` (`tid`, `title`, `is_able`, `update_time`) VALUES
	(1, 'sssssss', 1, '2018-10-18 16:40:16'),
	(2, 'dddddddddddddd', 1, '2018-10-18 16:40:21'),
	(3, 'ddddddddddddd', 1, '2018-10-18 16:40:34'),
	(4, 'tttttttttttttt', 1, '2018-10-18 16:40:39');
/*!40000 ALTER TABLE `mn_notes` ENABLE KEYS */;


-- 导出  表 mini_note.mn_tags 结构
CREATE TABLE IF NOT EXISTS `mn_tags` (
  `tid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(20) NOT NULL,
  `is_able` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`tid`),
  KEY `idx_title` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

-- 正在导出表  mini_note.mn_tags 的数据：~4 rows (大约)
/*!40000 ALTER TABLE `mn_tags` DISABLE KEYS */;
INSERT INTO `mn_tags` (`tid`, `title`, `is_able`, `update_time`) VALUES
	(21, 'Node', 1, '2018-10-18 16:19:09'),
	(22, 'Laravel', 1, '2018-10-18 16:16:25'),
	(23, 'Golang', 1, '2018-10-18 16:17:43'),
	(24, 'Zookeeper', 1, '2018-10-18 16:20:33');
/*!40000 ALTER TABLE `mn_tags` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
