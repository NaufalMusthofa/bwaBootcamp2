var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource'); 
});

module.exports = router;

// kalo ingin mengganti apa yg dikirm sama res.send, kita harus matiin dulu server nya, baru abis itu jalanin lagi dengan npm start
// nah kita ga mau ribet kaya gitu, berarti kita harus install npm nodemon
// jadi setiap kali kita merubah / update baru dia akan secara otomatis merubah nya juga tanpa harus mematikan server side nya
