import express from 'express';
import { addIncome, deleteIncome, downloadIncomeExcel, getAllIncomes } from '../controllers/income.controller.js';
import { authenticateToken } from '../utils/authenticate.js';


const incomeRouter = express.Router();

incomeRouter.post('/add', authenticateToken, addIncome);

incomeRouter.get('/get', authenticateToken, getAllIncomes);

incomeRouter.delete('/delete/:id', authenticateToken, deleteIncome);

incomeRouter.get('/downloadExcel', authenticateToken, downloadIncomeExcel);

export default incomeRouter;