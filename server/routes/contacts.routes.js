import express from "express";
import contactsCtrl from "../controllers/contacts.controller.js";

const router = express.Router();

router
  .route("/")
  .get(contactsCtrl.getAll)
  .post(contactsCtrl.create)
  .delete(contactsCtrl.deleteAll);

router
  .route("/:id")
  .get(contactsCtrl.getById)
  .put(contactsCtrl.updateById)
  .delete(contactsCtrl.deleteById);

export default router;
