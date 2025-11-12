import express from "express";

import { requireAdmin, requireAuth } from "../middleware/auth.middleware.js";
import projectsCtrl from "../controllers/projects.controller.js";

const router = express.Router();

router
  .route("/")
  .get(projectsCtrl.getAll)
  .post(requireAuth, requireAdmin, projectsCtrl.create)
  .delete(requireAuth, requireAdmin, projectsCtrl.deleteAll);

router
  .route("/:id")
  .get(projectsCtrl.getById)
  .put(requireAuth, requireAdmin, projectsCtrl.updateById)
  .delete(requireAuth, requireAdmin, projectsCtrl.deleteById);

export default router;
