import express from 'express';
import { authenticateToken } from '../utils/authenticate.js';
import { getDashboarddata } from '../controllers/dashboard.controller.js';

const dashboardRouter = express.Router();

dashboardRouter.get('/', authenticateToken, getDashboarddata);

export default dashboardRouter;