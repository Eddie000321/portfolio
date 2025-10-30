import express from "express";

import { requireAuth } from "../middleware/auth.middleware.js";
import userCtrl from "../controllers/user.controller.js";

const router = express.Router();

router
  .route("/")
  .post(userCtrl.create)
  .get(requireAuth, userCtrl.list)
  .delete(requireAuth, userCtrl.removeAll);

router.param("userId", userCtrl.userByID);

router
  .route("/:userId")
  .get(requireAuth, userCtrl.read)
  .put(requireAuth, userCtrl.update)
  .delete(requireAuth, userCtrl.remove);

export default router;
