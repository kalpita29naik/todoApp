import { TaskTypes } from "../types/types";
import { todoList } from "./taskStore";
import { randomUUID, UUID } from "node:crypto";
import { Request, Response } from "express";

// All tasks
export const getAllTasks = (_req: Request, res: Response) => {
  res.status(200).json(todoList);
};

// Creating new Task
export const createTask = (req: Request, res: Response) => {
  const { title, description, completed } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const newTodo: TaskTypes = {
    id: randomUUID(),
    title,
    description: description || "",
    completed: completed || false,
  };

  todoList.push(newTodo);
  res.status(201).json(newTodo);
};

// update task
export const updateTask = (req: Request, res: Response) => {
  const { id } = req.params;

  const task = todoList.find((t) => t.id === id);
  console.log("ID from params:", id);
  console.log("Current tasks:", todoList);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  console.log("ID from params:", id);
  console.log("Current tasks:", todoList);

  const { title, description, completed } = req.body;

  if (title !== undefined) {
    task.title = title;
  }

  if (description !== undefined) {
    task.description = description;
  }

  if (completed !== undefined) {
    task.completed = completed;
  }

  res.status(200).json(task);
};

// delete task
export const deleteTask = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = todoList.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  todoList.splice(index, 1);
  res.status(200).json({ message: "Task deleted Sucessfully" });
};

//get single task
export const getSingleTask = (req: Request, res: Response) => {
  const { id } = req.params;

  const task = todoList.find((t) => t.id === id);

  if (task) {
    return res.status(200).json(task);
  } else {
    return res.status(404).json({ message: "Task not found" });
  }
};
