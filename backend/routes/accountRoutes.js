import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { transferMoney } from "../controllers/accountController.js";
import {
  getBalance,
  getStatement,
  getUsers
} from "../controllers/accountController.js";

const router = express.Router();

router.get("/balance", protect, getBalance);
router.get("/statement", protect, getStatement);
router.get("/users", protect, getUsers);
router.post("/transfer", protect, transferMoney);

export default router;