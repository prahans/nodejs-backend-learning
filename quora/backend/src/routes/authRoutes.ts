import { Router } from "express";

import { signup, login } from "../controllers/authController.ts";

import { userVerification } from "../middlewares/authMiddleware.ts";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/me", userVerification, (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      id: req.user!._id,
      username: req.user!.username,
      email: req.user!.email,
    },
  });
});

export default router;
