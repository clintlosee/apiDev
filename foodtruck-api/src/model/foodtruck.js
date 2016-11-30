import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let FoodTruckSchema = new Schema({
    name: String
});

module.exports = mongoose.model('FoodTruck', FoodTruckSchema);
