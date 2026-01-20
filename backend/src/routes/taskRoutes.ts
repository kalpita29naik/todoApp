import {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../controllers/taskController";

import { Router } from "express";

const router = Router();

router.get("/", getAllTasks);

router.post("/", createTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

export default router;
