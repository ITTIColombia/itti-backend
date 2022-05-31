/** Express router providing artisan related routes
 * @module routers/artisans
 * @requires express
 */

/**
 * express module
 * @const
 */
const express = require("express");

/**
 * Express router to mount artisan related functions on
 * @const
 * @namespace artisansRouter
 */
const router = express.Router();

/**
 * Mongoose Artisan model to validate schema
 * @const
 * @namespace artisanModel
 */
const Artisan = require("../models/artisan");

/**
 * Mongoose Product model to validate schema
 * @const
 * @namespace productModel
 */
const Product = require("../models/product");

/**
 * Mongoose Order model to validate schema
 * @const
 * @namespace orderModel
 */
const Order = require("../models/order");

/**
 * Middleware for protected endpoints
 * @const
 * @namespace restrictedRoute
 */
const restrictedRoute = require("./authorization");
const {number} = require("joi");

/**
 * Route serving GET for all artisans
 */
router.get('/', function (req, res, next){
    Artisan.find({}).then(artisans => {
        if (artisans === undefined || artisans.length === 0) {
            return res.status(204).send(artisans)
        }
        res.send(artisans)
    }).catch(err => {
        res.status(400).send(err)
    });
});


/**
 * Route serving GET for sample artisans
 */
router.get("/sample", (req, res, next)=>{
    const qty = parseInt(req.query.qty) || 2;
    Artisan.aggregate([{ $sample: {size:qty}}]).then(artisans=>{
        return res.status(200).send(artisans);
    }).catch(err=>{
        return res.status(err.code).send(err)
    });
});

/**
 * Route serving GET for a specific artisan
 */
router.get('/:id', function (req, res, next) {
    Artisan.findById(req.params.id).then(artisan => {
        if (!artisan) return res.sendStatus(404);
        res.send(artisan);
    }).catch(err => res.status(400).send(err));
});

/**
 * Route serving POST to create a new artisan
 */
router.post("/",
    restrictedRoute,
    (req, res) => {
    Artisan.create(req.body).then((artisan) => {
        res.status(201).send(artisan);
    }).catch(err => {
        console.log("Detalle de error", err)
        res.status(400).send(err)
    });
});


/**
 * Route serving PATCH to modify existing artisan
 */
router.patch("/:id",
    restrictedRoute,
    function (req, res, next) {
    Artisan.findOneAndUpdate({"_id": req.params.id}, {$set: req.body}, {runValidators: true}).then((result) => {
        res.sendStatus(200);
    }).catch((err) => res.status(400).send(err));
});

/**
 * Route serving PUT modify completely existing artisan
 */
router.put("/:id",
    restrictedRoute,
    function (req, res, next) {
    Artisan.replaceOne({"_id": req.params.id}, req.body, {runValidators: true}).then((result) => {
        if (result.nModified === 0)
            return res.sendStatus(404);
        res.sendStatus(200);
    }).catch((err) => res.status(400).send(err));
});


/**
 * Route serving GET for all products of specific artisan
 */
router.get("/:id/products", (req, res, next)=>{
    restrictedRoute,
    Product.find({artisan: req.params.id}).then(products=>{
        res.send(products);
    }).catch(err=>res.status(400).send(err));
});


/**
 * Route serving GET for sample products of specific artisan
 */
router.get("/:id/products/sample", (req, res, next)=>{
    const qty = parseInt(req.query.qty) || 2;
    Product.aggregate([{ $match: {$expr: { $eq: ["$artisan",{$toObjectId: req.params.id} ]} }}, { $sample: {size:qty}}]).then(products=>{
        return res.status(200).send(products);
    }).catch(err=>{
        return res.status(err.code).send(err)
    });
});


/**
 * Route serving GET for all orders of specific artisan
 */
router.get("/:id/orders", (req, res, next)=>{
    restrictedRoute,
    Order.find({artisan: req.params.id}).then(orders=>{
        res.send(orders);
    }).catch(err=>res.status(400).send(err));
});

module.exports = router;


