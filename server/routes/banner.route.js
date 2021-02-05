const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/banner.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createBannerSchema, updateBannerSchema} = require('../middleware/validators/bannerValidator.middleware');


router.get('/',awaitHandlerFactory(bannerController.getAllBanner)); // localhost:3000/api/v1/banners/
router.get('/id/:id', auth(), awaitHandlerFactory(bannerController.getBannerById)); // localhost:3000/api/v1/banners/id/1
router.post('/', createBannerSchema, awaitHandlerFactory(bannerController.createBanner)); // localhost:3000/api/v1/banners
router.patch('/id/:id', auth(Role.Admin), updateBannerSchema, awaitHandlerFactory(bannerController.updateBanner)); // localhost:3000/api/v1/banners/id/1 , using patch for partial update
router.delete('/id/:id', auth(Role.Admin), awaitHandlerFactory(bannerController.deleteBanner)); // localhost:3000/api/v1/banners/id/1

module.exports = router;