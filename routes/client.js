/** Express router providing client related routes
 * @module routers/clients
 * @requires express
 */

/**
 * express module
 * @const
 */
const express = require("express");

/**
 * Express router to mount client related functions on
 * @const
 * @namespace clientsRouter
 */
const router = express.Router();

/**
 * Mongoose Client model to validate schema
 * @const
 * @namespace clientModel
 */
const Client = require("../models/client");

/**
 * Mongoose Purchase model to validate schema
 * @const
 * @namespace purchaseModel
 */
const Purchase = require("../models/purchase");

/**
 * Route serving GET for all clients
 */
router.get('/', function (req, res, next){
    Client.find({}).then(clients => {
        if (clients === undefined || clients.length === 0) {
            return res.status(204).send(clients)
        }
        res.send(clients)
    }).catch(err => {
        res.status(400).send(err)
    });
});


/**
 * Route serving GET for a specific client
 */
router.get('/:id', function (req, res, next) {
    Client.findById(req.params.id).then(client => {
        if (!client) return res.sendStatus(404);
        res.send(client);
    }).catch(err => res.status(400).send(err));
});

/**
 * Route serving POST to create a new client
 */
router.post("/", (req, res) => {
    Client.create(req.body).then((client) => {
        res.status(201).send(client);
    }).catch(err => res.status(400).send(err));
});

/**
 * Route serving PATCH to modify existing client
 */
router.patch("/:id", function (req, res, next) {
    Client.findOneAndUpdate({"_id": req.params.id}, {$set: req.body}, {runValidators: true}).then((result) => {
        res.sendStatus(200);
    }).catch((err) => res.status(400).send(err));
});

/**
 * Route serving PUT modify completely existing client
 */
router.put("/:id", function (req, res, next) {
    Client.replaceOne({"_id": req.params.id}, req.body, {runValidators: true}).then((result) => {
        if (result.nModified === 0)
            return res.sendStatus(404);
        res.sendStatus(200);
    }).catch((err) => res.status(400).send(err));
});

/**
 * Route serving GET for all purchases of specific client
 */
router.get("/:id/purchases", (req, res, next)=>{
    Purchase.find({client: req.params.id}).then(purchases=>{
        res.send(purchases);
    }).catch(err=>res.status(400).send(err));
});


module.exports = router


