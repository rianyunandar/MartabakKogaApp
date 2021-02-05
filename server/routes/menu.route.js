const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');

const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createMenuSchema, updateMenuSchema} = require('../middleware/validators/menuValidator.middleware');


router.get('/',awaitHandlerFactory(menuController.getAllMenuBanner)); // localhost:3000/api/v1/menus/
router.get('/id/:id', auth(), awaitHandlerFactory(menuController.getMenuById)); // localhost:3000/api/v1/menus/id/1
router.get('/menu', auth(), awaitHandlerFactory(menuController.getAllMenu)); // localhost:3000/api/v1/menus/whoami
router.post('/', createMenuSchema, awaitHandlerFactory(menuController.createMenu)); // localhost:3000/api/v1/menus
router.patch('/id/:id', auth(Role.Admin), updateMenuSchema, awaitHandlerFactory(menuController.updateMenu)); // localhost:3000/api/v1/menus/id/1 , using patch for partial update
router.delete('/id/:id', auth(Role.Admin), awaitHandlerFactory(menuController.deleteMenu)); // localhost:3000/api/v1/menus/id/1

module.exports = router;