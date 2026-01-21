import {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
  getSingleTask,
} from "../controllers/taskController";

import { Router } from "express";

const router = Router();

router.get("/", getAllTasks);

router.post("/", createTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

router.get("/:id", getSingleTask);

export default router;
