import express from "express";

import { requireAdmin, requireAuth } from "../middleware/auth.middleware.js";
import qualificationsCtrl from "../controllers/qualifications.controller.js";

const router = express.Router();

router
  .route("/")
  .get(qualificationsCtrl.getAll)
  .post(requireAuth, requireAdmin, qualificationsCtrl.create)
  .delete(requireAuth, requireAdmin, qualificationsCtrl.deleteAll);

router
  .route("/:id")
  .get(qualificationsCtrl.getById)
  .put(requireAuth, requireAdmin, qualificationsCtrl.updateById)
  .delete(requireAuth, requireAdmin, qualificationsCtrl.deleteById);

export default router;
