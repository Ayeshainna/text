import { Router } from "express";
import { AuthRouter } from "./authRoutes.js";
import { IncomeRouter } from "./incomeRoutes.js";
import { ExpenseRouter } from "./expenseRoutes.js";
import { DashboardRouter } from "./dashboardRoutes.js";

export const router = Router();

const apiRoutes = [
  {
    path: "/auth",
    route: AuthRouter,
  },
  {
    path: "/income",
    route: IncomeRouter,
  },
  {
    path: "/expense",
    route: ExpenseRouter,
  },
  {
    path: "/dashboard",
    route: DashboardRouter,
  },
];

apiRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
