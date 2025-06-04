import Income from "../models/income.model.js";
import xlsx from "xlsx";

export const addIncome = async (req, res) => {
    const userId = req.user._id;
    try {
        const { icon, amount, source, date } = req.body;
        if (!icon || !amount || !source || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newIncome = new Income({
            userId,
            icon,
            amount,
            source,
            date: new Date(date),
        });
        await newIncome.save();
        res.status(201).json(newIncome);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllIncomes = async (req, res) => {
    const userId = req.user._id;
    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Income deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        const data = income.map((item) => ({
            amount: item.amount,
            source: item.source,
            date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, "income_details.xlsx");
        res.download('income_details.xlsx');
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}