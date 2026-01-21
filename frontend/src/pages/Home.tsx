import "../styles/Home.css";
import TaskCard from "../components/TaskCard";
import { useEffect, useState } from "react";
import type { taskTypes } from "../types/task";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { FaPencilAlt } from "react-icons/fa";

const Home = () => {
  const [tasks, setTasks] = useState<taskTypes[]>([]);
  const [viewAll, setViewAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/tasks").then((res) => setTasks(res.data));
  }, []);

  const displayedTasks = viewAll ? tasks : tasks.slice(0, 4);

  return (
    <main>
      <h1 className="heading">
        TODO <span>LIST</span>
      </h1>

      {tasks.length === 0 && (
        <p style={{ color: "white", fontSize: "2rem" }}>No Task Available</p>
      )}

      <div className={`tasks-container ${viewAll ? "grid" : "list"}`}>
        {displayedTasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            description={
              viewAll ? task.description : task.description.slice(0, 50) + "..."
            }
            completed={task.completed}
            onView={() => navigate(`/task/${task.id}`)}
          />
        ))}
      </div>

      {tasks.length !== 0 && (
        <button onClick={() => setViewAll(!viewAll)} className="view-all-btn">
          {viewAll ? "Show Less" : "Show All"}
        </button>
      )}

      <div onClick={() => navigate("/add")} className="add-todo-container">
        <button>Add Todo</button>
        <FaPencilAlt />
      </div>
    </main>
  );
};

export default Home;
