const BannerModel = require('../models/banner.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');


/******************************************************************************
 *                              Banner Controller
 ******************************************************************************/
class BannerController {
 

    getAllBanner = async (req, res, next) => {
        let bannerList = await BannerModel.find();
        if (!bannerList.length) {
            throw new HttpException(404, 'Banners not found');
        }

        res.send(bannerList);
    };

    getBannerById = async (req, res, next) => {
        const banner = await BannerModel.findOne({ id: req.params.id });
        if (!banner) {
            throw new HttpException(404, 'Banner not found');
        }

        res.send(banner);
    };

    getBannerBybannerTittle = async (req, res, next) => {
        const banner = await BannerModel.findOne({ banner_tittle: req.params.bannername });
        if (!banner) {
            throw new HttpException(404, 'Banner not found');
        }

        const { password, ...bannerWithoutPassword } = banner;

        res.send(bannerWithoutPassword);
    };


    createBanner = async (req, res, next) => {
        this.checkValidation(req);

        await this.hashPassword(req);

        const result = await BannerModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('Banner was created!');
    };

    updateBanner = async (req, res, next) => {
        this.checkValidation(req);

        await this.hashPassword(req);

        const { confirm_password, ...restOfUpdates } = req.body;

        // do the update query and get the result
        // it can be partial edit
        const result = await BannerModel.update(restOfUpdates, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'Banner not found' :
            affectedRows && changedRows ? 'Banner updated successfully' : 'Updated faild';

        res.send({ message, info });
    };

    deleteBanner = async (req, res, next) => {
        const result = await BannerModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Banner not found');
        }
        res.send('Banner has been deleted');
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
module.exports = new BannerController;