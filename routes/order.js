/** Express router providing client related routes
 * @module routers/orders
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
 * Mongoose Order model to validate schema
 * @const
 * @namespace orderModel
 */
const Order = require("../models/order");

/**
 * Mongoose Client model to validate schema
 * @const
 * @namespace clientModel
 */
const Client = require("../models/client");

/**
 * Mongoose Artisan model to validate schema
 * @const
 * @namespace artisanModel
 */
const Artisan = require("../models/artisan");


/**
 * Route serving GET for all orders
 */
router.get('/', function (req, res, next){
    Order.find({}).then(orders => {
        if (orders === undefined || orders.length === 0) {
            return res.status(204).send(orders)
        }
        res.send(orders)
    }).catch(err => {
        res.status(400).send(err)
    });
});

/**
 * Route serving GET for a specific order
 */
router.get('/:id', function (req, res, next) {
    Order.findById(req.params.id).then(order => {
        if (!order) return res.sendStatus(404);
        res.send(order);
    }).catch(err => res.status(400).send(err));
});

/**
 * Route serving POST to create a new order
 */
router.post("/", (req, res) => {
    Client.findById(req.body.client).then(client =>{
        if(!client) return res.status(404).send("Client not found.")
        Artisan.findById(req.body.artisan).then( artisan => {
            if(!artisan) return res.status(404).send("Artisan not found.")
            Order.create(req.body).then(order => {
                res.status(201).send(order);
            }).catch(err => res.status(400).send(err));
        }).catch(err => res.status(400).send(err));
    }).catch(err => res.status(400).send(err))
});

/**
 * Route serving PATCH to modify existing order
 */
router.patch("/:id", function (req, res, next) {
    Order.findOneAndUpdate({"_id": req.params.id}, {$set: req.body}, {runValidators: true}).then((result) => {
        res.sendStatus(200);
    }).catch((err) => res.status(400).send(err));
});

/**
 * Route serving PUT modify completely existing purchase
 */
router.put("/:id", function (req, res, next) {
    Order.replaceOne({"_id": req.params.id}, req.body, {runValidators: true}).then((result) => {
        if (result.nModified === 0)
            return res.sendStatus(404);
        res.sendStatus(200);
    }).catch((err) => res.status(400).send(err));
});

module.exports = router;
