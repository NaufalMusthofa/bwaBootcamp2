const { index, create, find, update, destroy } = require('./controller');

const express = require('express').Router;
const router = express();

// get all talents
router.get('/talents', index);

// create
router.post('/talents', create),

// find one by id
router.get('/talents/:id', find);

// update
router.put('/talents/:id', update);

// delete
router.delete('/talents/:id', destroy);

module.exports = router;
