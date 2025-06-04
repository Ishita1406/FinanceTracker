import express from 'express';
import { addExpense, deleteExpense, downloadExpenseExcel, getAllExpenses } from '../controllers/expense.controller.js';
import { authenticateToken } from '../utils/authenticate.js';

const expenseRouter = express.Router();

expenseRouter.post('/add', authenticateToken, addExpense);

expenseRouter.get('/get', authenticateToken, getAllExpenses);

expenseRouter.delete('/delete/:id', authenticateToken, deleteExpense);

expenseRouter.get('/downloadExcel', authenticateToken, downloadExpenseExcel);

export default expenseRouter;