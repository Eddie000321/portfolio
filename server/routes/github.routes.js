import express from "express";

import { requireAdmin, requireAuth } from "../middleware/auth.middleware.js";
import githubCtrl from "../controllers/github.controller.js";

const router = express.Router();

router.get("/repos", requireAuth, requireAdmin, githubCtrl.listRepos);

export default router;
