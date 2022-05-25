/** Express router providing purchase related routes
 * @module routers/products
 * @requires express
 */

/**
 * express module
 * @const
 */
const express = require("express");

/**
 * Express router to mount purchase related functions on
 * @const
 * @namespace purchasesRouter
 */
const router = express.Router();

/**
 * Mongoose Purchase model to validate schema
 * @const
 * @namespace purchaseModel
 */
const Purchase = require("../models/purchase");

/**
 * Mongoose Client model to validate schema
 * @const
 * @namespace clientModel
 */
const Client = require("../models/client");

/**
 * Mongoose Order model to validate schema
 * @const
 * @namespace orderModel
 */
const Order = require("../models/order");


/**
 * Route serving GET for all purchases
 */
router.get('/', function (req, res, next){
    Purchase.find({}).then(purchases => {
        if (purchases === undefined || purchases.length === 0) {
            return res.status(204).send(purchases)
        }
        res.send(purchases)
    }).catch(err => {
        res.status(400).send(err)
    });
});

/**
 * Route serving GET for a specific purchase
 */
router.get('/:id', function (req, res, next) {
    Purchase.findById(req.params.id).then(purchase => {
        if (!purchase) return res.sendStatus(404);
        res.send(purchase);
    }).catch(err => res.status(400).send(err));
});

/**
 * Route serving POST to create a new purchase
 */
router.post("/", (req, res) => {
    Client.findById(req.body.client).then(client =>{
        if(!client) return res.status(404).send("Client not found.")
        Purchase.create(req.body).then(purchase => {
            res.status(201).send(purchase);
        }).catch(err => res.status(400).send(err));
    }).catch(err => res.status(400).send(err))
});

/**
 * Route serving PATCH to modify existing purchase
 */
router.patch("/:id", function (req, res, next) {
    Purchase.findOneAndUpdate({"_id": req.params.id}, {$set: req.body}, {runValidators: true}).then((result) => {
        res.sendStatus(200);
    }).catch((err) => res.status(400).send(err));
});

/**
 * Route serving PUT modify completely existing purchase
 */
router.put("/:id", function (req, res, next) {
    Purchase.replaceOne({"_id": req.params.id}, req.body, {runValidators: true}).then((result) => {
        if (result.nModified === 0)
            return res.sendStatus(404);
        res.sendStatus(200);
    }).catch((err) => res.status(400).send(err));
});

/**
 * Route serving GET for all orders of specific purchase
 */
router.get("/:id/orders", (req, res, next)=>{
    Order.find({purchase: req.params.id}).then(orders=>{
        res.send(orders);
    }).catch(err=>res.status(400).send(err));
});

module.exports = router;


