import express from "express";

import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signin", authCtrl.signin);
router.post("/signout", authCtrl.signout);

export default router;
