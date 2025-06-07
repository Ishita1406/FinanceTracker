import express from 'express';
import { authenticateToken } from '../utils/authenticate.js';
import { createUser, getUser, userLogin } from '../controllers/user.controller.js';
import uploadProfileImage from '../middlewares/uploads.middleware.js';

const userRouter = express.Router();

userRouter.post('/signup',  uploadProfileImage, createUser);

userRouter.post('/login', userLogin);

userRouter.get('/get', authenticateToken, getUser);

export default userRouter;