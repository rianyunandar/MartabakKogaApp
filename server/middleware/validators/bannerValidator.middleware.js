const { body, check } = require("express-validator");

exports.createBannerSchema = [
    check("banner_name")
        .exists()
        .withMessage("banner_name is required")
        .isLength({
            min: 3
        }).withMessage("Must be at least 3 chars long"),
    check("img_url")
        .exists()
        .withMessage("img_url is required")
        .isLength({
            min: 3
        }).withMessage("Must be at least 3 chars long"),
];

exports.updateBannerSchema = [
    check("banner_name")
        .exists()
        .withMessage("banner_name is required")
        .isLength({
            min: 3
        }).withMessage("Must be at least 3 chars long"),
    check("img_url")
        .exists()
        .withMessage("img_url is required")
        .isLength({
            min: 3
        }).withMessage("Must be at least 3 chars long"),
body()
        .custom((value) => {
            return !!Object.keys(value).length;
        })
        .withMessage("Please provide required field to update")
        .custom((value) => {
            const updates = Object.keys(value);
            const allowUpdates = [
                "banner_name",
                "img_url"
            ];
            return updates.every((update) => allowUpdates.includes(update));
        })
        .withMessage("Invalid updates!")
];

