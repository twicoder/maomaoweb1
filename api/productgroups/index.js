'use strict';

var express = require('express');
var controller = require('./productgroups.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:target', controller.show);
// router.post('/', controller.create);
router.put('/:target', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

module.exports = router;