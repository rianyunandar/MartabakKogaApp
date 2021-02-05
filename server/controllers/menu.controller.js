const MenuModel = require('../models/menu.model');
const BannerModel = require('../models/banner.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');




/******************************************************************************
 *                              Menu Controller
 ******************************************************************************/
class MenuController {
    getAllMenuBanner = async (req, res, next) => {
        let menuList = await MenuModel.find();
        let bannerList = await BannerModel.find();
        if (!menuList.length) {
            throw new HttpException(404, 'Menus not found');
        }
        if (!bannerList.length) {
            throw new HttpException(404, 'Banner not found');
        }

        res.send({bannerList,menuList});
    };

    getAllMenu = async (req, res, next) => {
        let menuList = await MenuModel.find();
        if (!menuList.length) {
            throw new HttpException(404, 'Menus not found');
        }

        res.send(menuList);
    };

    getMenuById = async (req, res, next) => {
        const menu = await MenuModel.findOne({ id: req.params.id });
        if (!menu) {
            throw new HttpException(404, 'Menu not found');
        }

        res.send(menu);
    };

    getMenuBymenuTittle = async (req, res, next) => {
        const menu = await MenuModel.findOne({ menu_tittle: req.params.menuname });
        if (!menu) {
            throw new HttpException(404, 'Menu not found');
        }

        const { password, ...menuWithoutPassword } = menu;

        res.send(menuWithoutPassword);
    };


    createMenu = async (req, res, next) => {
        this.checkValidation(req);

        await this.hashPassword(req);

        const result = await MenuModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('Menu was created!');
    };

    updateMenu = async (req, res, next) => {
        this.checkValidation(req);

        await this.hashPassword(req);

        // do the update query and get the result
        // it can be partial edit
        const result = await MenuModel.update(req.body, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'Menu not found' :
            affectedRows && changedRows ? 'Menu updated successfully' : 'Updated faild';

        res.send({ message, info });
    };

    deleteMenu = async (req, res, next) => {
        const result = await MenuModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Menu not found');
        }
        res.send('Menu has been deleted');
    };


    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }
}




/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new MenuController;