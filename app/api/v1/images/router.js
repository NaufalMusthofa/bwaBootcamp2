const express = require('express').Router;
const router = express();

const { create, index } = require('./controller');
const upload = require('../../../middlewares/multer')

router.post('/images', upload.single('avatar'),  create); // namanya harus sama dengan yang di postman jadi disini kita avatar. berati di postman pada saat kita mencreate/menambahkan di form-data nya harus sama nama key nya yaitu lalu ubah menjadi file avatar

// get all
router.get('/images', index)


module.exports = router;