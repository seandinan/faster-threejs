var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.post('/modelThings', function(req, res){
	res.status(200).send({modelData: req.body.modelData});
})

module.exports = router;
