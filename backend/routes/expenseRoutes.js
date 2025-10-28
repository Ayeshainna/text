import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addExpense, deleteExpense, downloadExpenseExcel, getAllExpense } from "../controllers/expenseController.js";


const router = Router();

router.post("/add", protect, addExpense);
router.get("/get", protect, getAllExpense);
router.get("/downloadexcel", protect, downloadExpenseExcel);
router.delete("/:id", protect, deleteExpense);


export const ExpenseRouter = router