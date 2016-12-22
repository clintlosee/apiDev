import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import passportLocalMongoose from 'passport-local-mongoose';

let AccountSchema = new Schema({
    email: {
        type: String
    },
    password: {
        type: String
    }
});

AccountSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', AccountSchema);