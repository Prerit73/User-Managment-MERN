import express from "express";

import {
  addUser,
  getUsers,
  getUser,
  editUser,
  deleteUser,
  getSearchUsers,
  getSortedUsers,
  registerUser,loginUser
} from "../controller/user-controller.js";

const router = express.Router();

router.post("/add", addUser);
router.get("/all/:count", getUsers);
router.get("/:id", getUser);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);
router.get("/a/:value", getSearchUsers);
router.get("/s/:value/:toggle/:count", getSortedUsers);

router.post("/register", registerUser);
router.get("/login/:username/:password",loginUser);

export default router;
