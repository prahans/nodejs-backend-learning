import { Router } from "express";

import { signup, login } from "../controllers/authController.ts";
import { userVerification } from "../middlewares/authMiddleware.ts";

const router = Router();

router.post("/", userVerification);
router.post("/signup", signup);
router.post("/login", login);

export default router;
