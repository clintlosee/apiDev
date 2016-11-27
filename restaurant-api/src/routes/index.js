import express from 'express';
import config from '../config';
import middleware from '../middlware';
import initializeDB from '../db';

let router = express();

//connect to db
initializeDB(db => {

    // internal middleware
    router.use(middleware({ config, db }));

    // api routes v1 (/v1)

});

export default router;
