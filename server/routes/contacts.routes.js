import express from "express";
import contactsCtrl from "../controllers/contacts.controller.js";
import { requireAdmin, requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router
  .route("/")
  .get(contactsCtrl.getAll)
  .post(contactsCtrl.create)
  .delete(requireAuth, requireAdmin, contactsCtrl.deleteAll);

router
  .route("/:id")
  .get(contactsCtrl.getById)
  .put(requireAuth, requireAdmin, contactsCtrl.updateById)
  .delete(requireAuth, requireAdmin, contactsCtrl.deleteById);

export default router;
