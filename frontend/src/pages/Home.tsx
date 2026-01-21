import "../styles/Home.css";
import TaskCard from "../components/TaskCard";
import { useEffect, useState } from "react";
import type { taskTypes } from "../types/task";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { FaPencilAlt } from "react-icons/fa";

type FilterType = "all" | "completed" | "pending";
type SortType = "none" | "az" | "za" | "status";

const Home = () => {
  const [tasks, setTasks] = useState<taskTypes[]>([]);
  const [viewAll, setViewAll] = useState(false);
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState<SortType>("none");

  const navigate = useNavigate();

  useEffect(() => {
    api.get("/tasks").then((res) => setTasks(res.data));
  }, []);

  const filteredByStatus = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const filteredBySearch = filteredByStatus.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedTasks = [...filteredBySearch].sort((a, b) => {
    if (sortType === "az") {
      return a.title.localeCompare(b.title);
    }
    if (sortType === "za") {
      return b.title.localeCompare(a.title);
    }
    if (sortType === "status") {
      return Number(b.completed) - Number(a.completed);
    }
    return 0;
  });

  const displayedTasks = viewAll ? sortedTasks : sortedTasks.slice(0, 4);

  return (
    <main>
      <h1 className="heading">
        TODO <span>LIST</span>
      </h1>

      {sortedTasks.length === 0 && (
        <p style={{ color: "white", marginTop: "20px", fontSize: "20px" }}>
          No tasks Available
        </p>
      )}

      <div className="sort-search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="sort-select"
          value={sortType}
          onChange={(e) => setSortType(e.target.value as SortType)}
        >
          <option value="none">Sort By</option>
          <option value="az">Name (A-Z)</option>
          <option value="za">Name (Z-A)</option>
          <option value="status">Status (Completed First)</option>
        </select>
      </div>

      <div className="filter-container">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        <button
          className={filter === "pending" ? "active" : ""}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
      </div>

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

      <button onClick={() => setViewAll(!viewAll)} className="view-all-btn">
        {viewAll ? "Show Less" : "Show All"}
      </button>

      <div onClick={() => navigate("/add")} className="add-todo-container">
        <button>Add Todo</button>
        <FaPencilAlt />
      </div>
    </main>
  );
};

export default Home;
