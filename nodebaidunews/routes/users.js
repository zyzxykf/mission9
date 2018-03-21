var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* 后台数据连接处理端 */

var connection = mysql.createPool({
	  host     : 'localhost',
	  port	   : 3306,
	  user     : 'root',
	  password : '',
	  database : 'baidunews'
});


/* 获取news列表 */
router.get('/getnews', function(req, res, next) {

  	connection.query('SELECT * FROM `news`', function (error, results, fields) {
	  	if (error) throw error;
	  	res.json(results);
	});
});

/* 更新新闻 */
router.post('/update', function(req, res, next) {

	var newsid = req.body.newsid,
		newstitle = req.body.newstitle,
		newstype = req.body.newstype,
		newsimg = req.body.newsimg,
		newstime = req.body.newstime,
		newssrc = req.body.newssrc;

	connection.query("UPDATE `news` SET `newstype`=?,`newstitle`=?,`newsimg`=?,`newstime`=?,`newssrc`=? WHERE `id`=?", [newstype, newstitle, newsimg, newstime, newssrc, newsid], function(error, results, fields) {
		if (error) throw error;
	});
	res.end();
});

/* 获取当前新闻数据 */
router.get('/curnews', function(req, res, next) {

	var newsid = req.query.newsid;

	connection.query("SELECT * FROM `news` WHERE `id` = ?", [newsid], function(error, results, fields) {
		if (error) throw error;
	  	res.json(results);
	});
});

/* 删除新闻 */
router.post('/delete', function(req, res, next) {
	var newsid = req.body.newsid;

	connection.query("DELETE FROM `news` WHERE `id` = ?", [newsid], function(error, results, fields) {
		if (error) throw error;
	  	console.log(results.affectedRows);
	});
	res.end();
});

/* 添加新闻 */
router.post('/insert', function(req, res, next) {
	var newstitle = req.body.newstitle,
		newstype = req.body.newstype,
		newsimg = req.body.newsimg,
		newstime = req.body.newstime,
		newssrc = req.body.newssrc;

	connection.query('INSERT INTO `news` (`newstype`, `newstitle`, `newsimg`, `newstime`, `newssrc`) VALUES (?,?,?,?,?)', [newstype, newstitle, newsimg, newstime, newssrc], function(error, results, fields) {
		if (error) throw error;
	});
	res.end();
});

module.exports = router;
