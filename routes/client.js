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
 * AWS Cognito module to authenticate users
 * @const
 * @namespace cognitoExpress
 */
const { validateAuth } = require("../auth");


/**
 * Route serving GET for all clients
 */
router.get('/', [validateAuth], function (req, res, next){
    Client.find({}).then(clients => {
        if (clients === undefined || clients.length === 0) {
            return res.status(204).send(clients)
        }
        res.send(clients)
    }).catch(err => res.status(400).send(err));
});


/**
 * Route serving GET for a specific client
 */
router.get('/:id', [validateAuth], function (req, res, next) {
    Client.findById(req.params.id).then(client => {
        if (!client) return res.sendStatus(404);
        res.send(client);
    }).catch(err => res.status(400).send(err));
});

/**
 * Route serving GET for a specific client by email
 */
router.get('/email/:email', [validateAuth], function (req, res, next) {
    Client.find({email: req.params.email}).then(clients => {
        if (clients === undefined || clients.length === 0) {
            return res.sendStatus(404);
        }
        res.send(clients[0]);
    }).catch(err => res.status(400).send(err));
});

/**
 * Route serving POST to create a new client
 */
router.post("/", [validateAuth], (req, res) => {
    Client.create(req.body).then((client) => {
        res.status(201).send(client);
    }).catch(err => res.status(400).send(err));
});

/**
 * Route serving PATCH to modify existing client
 */
router.patch("/:id", [validateAuth], function (req, res, next) {
    Client.findOneAndUpdate({"_id": req.params.id}, {$set: req.body}, {runValidators: true}).then((result) => {
        res.sendStatus(200);
    }).catch((err) => res.status(400).send(err));
});

/**
 * Route serving PATCH to modify existing client by its email
 */
 router.patch("/email/:email", [validateAuth], function (req, res, next) {
    Client.findOneAndUpdate({"email": req.params.email}, {$set: req.body}, {runValidators: true}).then((result) => {
        res.sendStatus(200);
    }).catch((err) => res.status(400).send(err));
});

/**
 * Route serving PUT modify completely existing client
 */
router.put("/:id", [validateAuth], function (req, res, next) {
    Client.replaceOne({"_id": req.params.id}, req.body, {runValidators: true}).then((result) => {
        if (result.nModified === 0)
            return res.sendStatus(404);
        res.sendStatus(200);
    }).catch((err) => res.status(400).send(err));
});

/**
 * Route serving DELETE to delete a client
 */
router.delete("/email/:email", [validateAuth], function (req, res, next) {
    Client.deleteOne({email: req.params.email}).then((result) => {
        if (result.deletedCount === 0)
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


