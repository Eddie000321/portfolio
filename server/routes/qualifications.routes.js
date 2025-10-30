import express from "express";

import { requireAuth } from "../middleware/auth.middleware.js";
import qualificationsCtrl from "../controllers/qualifications.controller.js";

const router = express.Router();

router
  .route("/")
  .get(qualificationsCtrl.getAll)
  .post(requireAuth, qualificationsCtrl.create)
  .delete(requireAuth, qualificationsCtrl.deleteAll);

router
  .route("/:id")
  .get(qualificationsCtrl.getById)
  .put(requireAuth, qualificationsCtrl.updateById)
  .delete(requireAuth, qualificationsCtrl.deleteById);

export default router;
