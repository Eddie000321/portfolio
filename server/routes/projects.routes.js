import express from "express";

import { requireAuth } from "../middleware/auth.middleware.js";
import projectsCtrl from "../controllers/projects.controller.js";

const router = express.Router();

router
  .route("/")
  .get(projectsCtrl.getAll)
  .post(requireAuth, projectsCtrl.create)
  .delete(requireAuth, projectsCtrl.deleteAll);

router
  .route("/:id")
  .get(projectsCtrl.getById)
  .put(requireAuth, projectsCtrl.updateById)
  .delete(requireAuth, projectsCtrl.deleteById);

export default router;
