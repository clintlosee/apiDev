import mongoose from 'mongoose';
import { Router } from 'express';
import FoodTruck from '../model/foodtruck';
import Review from '../model/Review';

import { authenticate } from '../middleware/authMiddleware';

export default({ config, db }) => {
    let api = Router();

    // POST - /v1/foodtruck/add
    api.post('/add', authenticate, (req, res) => {
        let newFoodTruck = new FoodTruck();
        newFoodTruck.name = req.body.name;
        newFoodTruck.foodtype = req.body.foodtype;
        newFoodTruck.avgcost = req.body.avgcost;
        newFoodTruck.geometry.coordinates = req.body.geometry.coordinates;

        newFoodTruck.save(err => {
            if (err) {
                res.send(err);
            }
            res.json({ foodtruck: newFoodTruck, message: 'FoodTruck saved successfully' });
        });
    });

    // GET all - /v1/foodtruck
    api.get('/', (req, res) => {
        FoodTruck.find({}, (err, foodTrucks) => {
            if (err) {
                res.send(err);
            }
            res.json(foodTrucks);
        });
    });

    // GET one - /v1/foodtruck/:id
    api.get('/:id', (req, res) => {
        FoodTruck.findById(req.params.id, (err, foodTruck) => {
            if (err) {
                res.send(err);
            }
            res.json(foodTruck);
        });
    });

    // PUT - /v1/foodtruck/:id
    api.put('/:id', (req, res) => {
        FoodTruck.findById(req.params.id, (err, foodTruck) => {
            if (err) {
                res.send(err);
            }
            foodTruck.name = req.body.name;
            foodTruck.foodtype = req.body.foodtype;
            foodTruck.avgcost = req.body.avgcost;
            foodTruck.geometry.coordinates = req.body.geometry.coordinates;
            foodTruck.save(err => {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'FoodTruck successfully updated'});
            });
        });
    });

    // DELETE = /v1/foodtruck/:id
    api.delete('/:id', (req, res) => {
        FoodTruck.remove({ _id: req.params.id}, (err, foodtruck) => {
            if (err) {
                res.send(err);
            }
            Review.remove({foodtruck: req.params.id}, (err, review) => {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'FoodTruck and reviews successfully deleted'});
            });
        });
    });

    // add review for a specific foodtruck id
    // /v1/foodtruck/reviews/add/:id
    api.post('/reviews/add/:id', (req, res) => {
        FoodTruck.findById(req.params.id, (err, foodtruck) => {
            if (err) {
                res.send(err);
            }
            let newReview = new Review();

            newReview.title = req.body.title;
            newReview.text = req.body.text;
            newReview.foodtruck = foodtruck._id;
            newReview.save((err, review) => {
                if (err) {
                    res.send(err);
                }
                foodtruck.reviews.push(newReview);
                foodtruck.save(err => {
                    if (err) {
                        res.send(err);
                    }
                    res.json({ message: 'Food truck review saved' });
                });
            });
        });
    });

    // GET all reviews 
    // /v1/foodtruck/reviews/all
    api.get('/reviews/all', (req, res) => {
        Review.find({}, (err, reviews) => {
            if (err) {
                res.send(err);
            }
            res.json(reviews);
        });
    });

    // GET reviews for a specific foodtruck id
    // /v1/foodtruck/reviews/:id
    api.get('/reviews/:id', (req, res) => {
        Review.find({ foodtruck: req.params.id}, (err, reviews) => {
            if (err) {
                res.send(err);
            }
            res.json(reviews);
        });
    });

    // GET foodtrucks with a specific foodtype
    // /v1/foodtruck/foodtype/:foodtype
    api.get('/foodtype/:foodtype', (req, res) => {
        FoodTruck.find({ foodtype: req.params.foodtype }, (err, foodtrucks) => {
            if (err) {
                res.send(err);
            }
            res.json(foodtrucks);
        });
    });

    return api;
}
