import Expense from "../models/expense.model.js";
import xlsx from "xlsx";

export const addExpense = async (req, res) => {
    const userId = req.user._id;
    try {
        const { icon, category, amount, date } = req.body;
        if (!icon || !category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date),
        });
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllExpenses = async (req, res) => {
    const userId = req.user._id;
    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        console.error("Error deleting expense:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const downloadExpenseExcel = async (req, res) => {
    const userId = req.user._id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount.toString(),
            Date: new Date(item.date).toLocaleDateString("en-IN")

        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb, "expense_details.xlsx");
        res.download('expense_details.xlsx');
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}