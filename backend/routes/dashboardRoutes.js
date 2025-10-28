import { getDashboardData } from "../controllers/dashboardController.js";
import { protect } from "../middleware/authMiddleware.js";
import router from "./authRoutes.js";


router.get("/", protect, getDashboardData);



export default router;