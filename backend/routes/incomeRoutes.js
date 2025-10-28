import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addIncome, deleteIncome, downloadIncomeExcel, getAllIncome } from "../controllers/incomeController.js";


const router = Router();

router.post("/add", protect, addIncome);
router.get("/get", protect, getAllIncome);
router.get("/downloadexcel", protect, downloadIncomeExcel);
router.delete("/:id", protect, deleteIncome);


export default router;