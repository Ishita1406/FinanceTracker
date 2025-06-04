import express from 'express';
import { authenticateToken } from '../utils/authenticate.js';
import { createUser, getUser, userLogin } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post('/signup', createUser);

userRouter.post('/login', userLogin);

userRouter.get('/get', authenticateToken, getUser);

export default userRouter;