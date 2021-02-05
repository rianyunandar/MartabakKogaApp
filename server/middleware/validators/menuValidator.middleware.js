const { body, check } = require("express-validator");

exports.createMenuSchema = [
    check("menu_tittle")
        .exists()
        .withMessage("menu_tittle is required")
        .isLength({
            min: 3
        }).withMessage("Must be at least 3 chars long"),
    check("desc1")
        .exists()
        .withMessage("desc1 is required")
        .isLength({
            min: 3
        }).withMessage("Must be at least 3 chars long"),
    check("desc2")
        .exists()
        .withMessage("desc1 is required")
        .isLength({
            min: 3
        }).withMessage("Must be at least 3 chars long"),
    check("price")
        .exists()
        .withMessage("price is required")
        .isNumeric()
        .withMessage("Must be only Number chars")
        .isLength({
            min: 3
        }).withMessage("Must be at least 3 chars long"),
    check("url_image")
        .exists()
        .withMessage("url is required")
        .isLength({
            min: 3
        }).withMessage("Must be at least 3 chars long")
];

exports.updateMenuSchema = [
    check("menu_tittle")
        .exists()
        .withMessage("menu_tittle is required")
        .isLength({
            min: 3
        }).withMessage("Must be at least 3 chars long"),
    check("desc1")
        .exists()
        .withMessage("desc1 is required")
        .isLength({
            min: 3
        }).withMessage("Must be at least 3 chars long"),
    check("desc2")
        .exists()
        .withMessage("desc1 is required")
        .isLength({
            min: 3
        }).withMessage("Must be at least 3 chars long"),
    check("price")
        .exists()
        .withMessage("price is required")
        .isNumeric()
        .withMessage("Must be only Number chars")
        .isLength({
            min: 3
        }).withMessage("Must be at least 3 chars long"),
    check("url_image")
        .exists()
        .withMessage("url is required")
        .isLength({
            min: 3
        })
        .withMessage("Must be at least 3 chars long"),
    body()
        .custom((value) => {
            return !!Object.keys(value).length;
        })
        .withMessage("Please provide required field to update")
        .custom((value) => {
            const updates = Object.keys(value);
            const allowUpdates = [
                "menu_tittle",
                "desc1",
                "desc2",
                "price",
                "url_image"
            ];
            return updates.every((update) => allowUpdates.includes(update));
        })
        .withMessage("Invalid updates!")
];

