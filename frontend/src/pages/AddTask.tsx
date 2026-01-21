import { api } from "../services/api";
import type { taskTypes } from "../types/task";
import "../styles/AddTask.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const naviagte = useNavigate();

  const [task, setTask] = useState<taskTypes>({
    id: "",
    title: "",
    description: "",
    completed: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!task.title.trim()) return;

    api
      .post("/tasks", {
        title: task.title,
        description: task.description,
        completed: task.completed,
      })
      .then(() => naviagte("/"));
  };

  return (
    <main className="main-container">
      <h1 className="heading">
        TODO <span>LIST</span>
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="detail-container-form">
          <div className="input-group">
            <label htmlFor="task-title">TITLE</label>
            <input
              id="task-title"
              type="text"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              required
            />
          </div>

          <div className="input-group">
            <label>
              DESCRIPTION
              <textarea
                value={task.description}
                onChange={(e) =>
                  setTask({ ...task, description: e.target.value })
                }
                rows={8}
              />{" "}
            </label>
          </div>

          <div className="input-group">
            <label htmlFor="status-select">STATUS</label>
            <select
              id="status-select"
              className="status-dropdown"
              value={task.completed.toString()}
              onChange={(e) =>
                setTask({ ...task, completed: e.target.value === "true" })
              }
            >
              <option value="false">Pending</option>
              <option value="true">Completed</option>
            </select>
          </div>

          <div className="action-buttons">
            <button>Add Task</button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default AddTask;
