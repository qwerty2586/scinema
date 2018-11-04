var express = require('express');
var router = express.Router();
let scinema = require('../scinema');

/* GET home page. */
router.get('/', function(req, res, next) {
    var nav = req.param("nav");
    var title = req.param('title');
    if (nav===undefined) nav = "/";
    if (title===undefined) title = "/";

      scinema.get(nav,function (data) {
          res.render('index', { title: title , nav: nav, data : data});
      });
});

module.exports = router;
