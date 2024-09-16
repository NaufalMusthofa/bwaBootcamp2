const express = require('express').Router;
const router = express();
const { indexAllCategories, find, destroy, create, update, } = require('./controller');
const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth')

// get all categories
router.get('/categories', authenticateUser, indexAllCategories);

// post categories / create
router.post('/categories', authenticateUser, create);

// get temukan satu categories berdasarkan id nya
router.get('/categories/:id', find);

// put id dari categories nya / update
router.put('/categories/:id', update);

// delete id dari categories nya / delete
router.delete('/categories/:id', destroy);


module.exports = router;

