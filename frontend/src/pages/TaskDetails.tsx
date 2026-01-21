import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { api } from "../services/api";
import "../styles/TaskDetail.css";
import type { taskTypes } from "../types/task";

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<taskTypes | null>(null);

  useEffect(() => {
    if (!id) return;
    api
      .get(`/tasks/${id}`)
      .then((res) => setTask(res.data))
      .catch(() => navigate("/"));
  }, [id, navigate]);

  const handleUpdate = () => {
    api.put(`/tasks/${id}`, task).then(() => navigate("/"));
  };

  const handleDelete = () => {
    api.delete(`/tasks/${id}`).then(() => navigate("/"));
  };

  if (!task) {
    return (
      <main className="detail-main">
        <h1 className="heading">
          TODO <span>LIST</span>
        </h1>
        <p style={{ color: "white" }}>Loading task...</p>
      </main>
    );
  }

  return (
    <main className="detail-main">
      <h1 className="heading">
        TODO <span>LIST</span>
      </h1>

      <div className="form-div">
        <div className="status-section">
          <label>FINISH</label>
          <div
            className={`big-check-btn ${task.completed ? "done" : "pending"}`}
            onClick={() => setTask({ ...task, completed: !task.completed })}
          >
            <TiTick />
          </div>
        </div>

        <div className="detail-container">
          {/* Status Section */}

          {/* Title Section */}
          <div className="input-group">
            <label>TITLE</label>
            <input
              type="text"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
            />
          </div>

          {/* Description Section */}
          <div className="input-group">
            <label>DESCRIPTION</label>
            <textarea
              value={task.description}
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
              rows={8}
            />
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button onClick={handleUpdate}>UPDATE</button>
            <button className="delete-btn" onClick={handleDelete}>
              DELETE
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TaskDetail;
