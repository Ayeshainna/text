import XLSX from "xlsx"
import { Expense } from "../models/Expense.js";

// Add Expense Source
export const addExpense = async (req , res) => {
    const userId = req.user.id;

    try{
        const {icon, category, amount, date} = req.body;

        // Validation Check for missing details
        if(!category || !amount || !date) {
            return res.status(400).json({message:"All fields are required"});
        }
        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (error) {
        res.status(500).json({message:"Server Error"});
    }
}

//Get All Expense Source
export const getAllExpense = async (req , res) => {
    const userId = req.user.id;

    try{
        const expense = await Expense.find({ userId}).sort({ date: -1 });
        res.json(expense);
    } catch (error) {
        res.status(500).json({message:"Server Error"});
    }
};

// Delete Expense Source
export const deleteExpense = async (req , res) => {
   

    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message:"Expense deleted successfully"});
    } catch (error) {
        res.status(500).json({message:"Server Error"});
    }
        
};

//Download Excel
// export const downloadExpenseExcel = async (req , res) => {
//     const userId = req.user.id;

//     try{
//        const expense = await Expense.find({ userId }).sort({ date: -1 });


//         // Prepare data for excel
        
//         const data = expense.map((item) =>({
//             Category: item.category,
//             Amount: item.amount,
//             Date: item.date,
//         }));

//         const wb = xlsx.utils.book_new();
//         const ws = xlsx.utils.json_to_sheet(data);
//         xlsx.utils.book_append_sheet(wb, ws, "Income");
//         xlsx.writeFile(wb, "expense_details.xlsx");
//         res.download("expense_details.xlsx");
//     } catch (error) {
//         res.status(500).json({message:"Server Error"});
//     }
// };



export const downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });

    const data = expenses.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Expense");

    // ✅ Write workbook to a buffer instead of a file
    const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

    // ✅ Set correct headers for file download
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=expense_details.xlsx"
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    // ✅ Send buffer directly as response
    res.send(buffer);
  } catch (error) {
    console.error("Error generating Excel:", error);
    res.status(500).json({ message: "Server Error generating Excel" });
  }
};
