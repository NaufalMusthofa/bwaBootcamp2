const { signinCms } = require('./controller');

const express = require('express').Router;
const router = express();

router.post('/auth/signin', signinCms);

module.exports = router;