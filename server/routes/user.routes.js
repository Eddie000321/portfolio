import express from "express";

import {
  requireAdmin,
  requireAuth,
  requireSelfOrAdmin,
} from "../middleware/auth.middleware.js";
import userCtrl from "../controllers/user.controller.js";

const router = express.Router();

router
  .route("/")
  .post(userCtrl.create)
  .get(requireAuth, requireAdmin, userCtrl.list)
  .delete(requireAuth, requireAdmin, userCtrl.removeAll);

router.param("userId", userCtrl.userByID);

router
  .route("/:userId")
  .get(requireAuth, requireSelfOrAdmin, userCtrl.read)
  .put(requireAuth, requireSelfOrAdmin, userCtrl.update)
  .delete(requireAuth, requireSelfOrAdmin, userCtrl.remove);

export default router;
