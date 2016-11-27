import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import config from './config';
import routes from './routes';

let app = express();
app.server = http.createServer(app);

// middleware


// passport config


// api routes v1
app.use('/v1', routes);

app.server.listen(config.port);
console.log(`Starting on port ${app.server.address().port}`);

export default app;