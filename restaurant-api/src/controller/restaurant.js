import mongoose from 'mongoose';
import { Router } from 'express';
import Restaurant from '../model/restaurant';
import bodyParser from 'body-parser';

export default({ config, db }) => {
    let api = Router();

    // POST - /v1/restaurant/add
    api.post('/add', (req, res) => {
        let newRest = new Restaurant();
        newRest.name = req.body.name;

        newRest.save(err => {
            if (err) {
                res.send(err);
            }
            res.json({ restaurant: newRest, message: 'Restaurant saved successfully' });
        });
    });

    // GET all - /v1/restaurant
    api.get('/', (req, res) => {
        Restaurant.find({}, (err, restaurants) => {
            if (err) {
                res.send(err);
            }
            res.json(restaurants);
        });
    });

    // GET one - /v1/restaurant/:id
    api.get('/:id', (req, res) => {
        Restaurant.findById(req.params.id, (err, restaurant) => {
            if (err) {
                res.send(err);
            }
            res.json(restaurant);
        });
    });

    // PUT - /v1/restaurant/:id
    api.put('/:id', (req, res) => {
        Restaurant.findById(req.params.id, (err, restaurant) => {
            if (err) {
                res.send(err);
            }
            restaurant.name = req.body.name;
            restaurant.save(err => {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Restaurant successfully updated'});
            });
        });
    });

    // DELETE = /v1/restaurant/:id
    api.delete('/:id', (req, res) => {
        Restaurant.remove({ _id: req.params.id}, (err) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Restaurant successfully deleted'});
        });
    });

    return api;
}
