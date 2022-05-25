/** Express router providing client related routes
 * @module routers/products
 * @requires express
 */

/**
 * express module
 * @const
 */
const express = require("express");

/**
 * Express router to mount user related functions on
 * @const
 * @namespace clientsRouter
 */
const router = express.Router();


/**
 * Mongoose Product model to validate schema
 * @const
 * @namespace productModel
 */
const Product = require("../models/product");

/**
 * Mongoose Product model to validate schema
 * @const
 * @namespace productModel
 */
const Artisan = require("../models/artisan");


/**
 * Middleware for protected endpoints
 * @const
 * @namespace restrictedRoute
 */
const restrictedRoute = require("./authorization");

/**
 * Route serving GET for all products
 */
router.get('/', function (req, res, next){
    Product.find({}).then(products => {
        if (products === undefined || products.length === 0) {
            return res.status(204).send(products)
        }
        res.send(products)
    }).catch(err => {
        res.status(400).send(err)
    });
});

/**
 * Route serving GET for a specific product
 */
router.get('/:id', function (req, res, next) {
    Product.findById(req.params.id).then(product => {
        if (!product) return res.sendStatus(404);
        res.send(product);
    }).catch(err => res.status(400).send(err));
});

/**
 * Route serving POST to create a new product
 */
router.post("/",
    restrictedRoute,
    (req, res) => {
    Artisan.findById(req.body.artisan).then(artisan => {
        if(!artisan) return res.status(404).send("Artisan not found.");
        Product.create(req.body).then(product=>
            res.status(201).send(product)
        ).catch(err => res.status(400).send(err))
    }).catch(err => res.status(400).send(err))
});

/**
 * Route serving PATCH to modify existing product
 */
router.patch("/:id",
    restrictedRoute,
    function (req, res, next) {
    Product.findOneAndUpdate({"_id": req.params.id}, {$set: req.body}, {runValidators: true}).then((result) => {
        res.sendStatus(200);
    }).catch((err) => res.status(400).send(err));
});


/**
 * Route serving PUT modify completely existing product
 */
router.put("/:id",
    restrictedRoute,
    function (req, res, next) {
    Product.replaceOne({"_id": req.params.id}, req.body, {runValidators: true}).then((result) => {
        if (result.nModified === 0)
            return res.sendStatus(404);
        res.sendStatus(200);
    }).catch((err) => res.status(400).send(err));
});

module.exports = router;