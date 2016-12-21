import { Router } from 'express';
import Account from '../model/account';
import passport from 'passport';
import config from '../config';

import { generateAccessToken, respond, authenticate } from '../middleware/authMiddleware';

export default({ config, db }) => {
    let api = Router();

    return api;
};