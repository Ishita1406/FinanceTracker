import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './backend/routes/user.route.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import incomeRouter from './backend/routes/income.route.js';
import expenseRouter from './backend/routes/expense.route.js';
dotenv.config();

const port = process.env.PORT;

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log('MongoDB connected successfully!');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

const app = express();

app.use(express.json()); 
app.use(bodyParser.json());

app.use(cors());


app.use('/backend/auth', userRouter);
app.use('/backend/income', incomeRouter);
app.use('/backend/expense', expenseRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});