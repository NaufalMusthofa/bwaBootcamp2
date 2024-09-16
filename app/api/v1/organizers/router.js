const { createCMSOrganizer } = require('./controller');

const express = require('express').Router;
const router = express();

router.post('/organizers', createCMSOrganizer);

module.exports = router;