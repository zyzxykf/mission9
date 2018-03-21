-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2017-12-01 10:11:05
-- 服务器版本： 10.1.19-MariaDB
-- PHP Version: 5.5.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `baidunews`
--

-- --------------------------------------------------------

--
-- 表的结构 `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `newstype` char(100) NOT NULL,
  `newstitle` varchar(200) NOT NULL,
  `newsimg` varchar(200) NOT NULL,
  `newstime` char(100) NOT NULL,
  `newssrc` char(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='新闻表';

--
-- 转存表中的数据 `news`
--

INSERT INTO `news` (`id`, `newstype`, `newstitle`, `newsimg`, `newstime`, `newssrc`) VALUES
(20, '推荐', '习近平向亚太残疾人十年审查高级别会议致贺信', 'img/1.jpg', '1小时前', '凤凰网'),
(21, '百家', '时尚女王苏芒登《创意中国》舞台 犀利点评呛声创客', 'img/1.JPEG', '3小时前', '百家号'),
(22, '本地', '杨斌任北京市副市长 此前担任通州区委书记(图|简历)', 'img/2.JPEG', '1小时前', '齐鲁网'),
(23, '娱乐', '《复仇者联盟3》预告片创纪录 24小时播放量2.3亿次', 'img/4.JPG', '29分钟前', '搜狐新闻'),
(24, '社会', '济南祖孙三人煤气中毒 13岁女孩不幸身亡', 'img/5.JPEG', '3分钟前', '齐鲁网');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
