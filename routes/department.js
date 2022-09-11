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
 * @namespace departmentsRouter
 */
const router = express.Router();

/**
 * Mongoose Artisan model to validate schema
 * @const
 * @namespace artisanModel
 */
const Department = require("../models/department");


/**
 * Middleware for protected endpoints
 * @const
 * @namespace restrictedRoute
 */
const restrictedRoute = require("./authorization");

/**
 * Route serving GET for all departments
 */
router.get('/', function (req, res, next){
    Department.find({}).then(departments => {
        if (departments === undefined || departments.length === 0) {
            return res.status(204).send(departments)
        }
        res.send(departments)
    }).catch(err => {
        res.status(400).send(err)
    });
});

/**
 * Route serving GET for a specific department
 */
router.get('/:id', function (req, res, next) {
    Department.findById(req.params.id).then(department => {
        if (!department) return res.sendStatus(404);
        res.send(department);
    }).catch(err => res.status(400).send(err));
});

/**
 * Route serving POST to create a new department
 */
router.post("/",
    // restrictedRoute, // FOR TRIAL PURPOSES ONLY
    (req, res) => {
        Department.create(req.body).then((department) => {
            res.status(201).send(department);
        }).catch(err => {
            console.log("Detalle de error", err)
            res.status(400).send(err)
        });
    });


/**
 * Route serving PATCH to modify existing department
 */
router.patch("/:id",
    // restrictedRoute, // FOR TRIAL PURPOSES ONLY
    function (req, res, next) {
        Department.findOneAndUpdate({"_id": req.params.id}, {$set: req.body}, {runValidators: true}).then((result) => {
            res.sendStatus(200);
        }).catch((err) => res.status(400).send(err));
    });

/**
 * Route serving PUT modify completely existing department
 */
router.put("/:id",
    // restrictedRoute, // FOR TRIAL PURPOSES ONLY
    function (req, res, next) {
        Department.replaceOne({"_id": req.params.id}, req.body, {runValidators: true}).then((result) => {
            if (result.nModified === 0)
                return res.sendStatus(404);
            res.sendStatus(200);
        }).catch((err) => res.status(400).send(err));
    });

module.exports = router;