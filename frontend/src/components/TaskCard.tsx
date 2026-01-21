import "../styles/TaskCard.css";
import { TiTick } from "react-icons/ti";

type TaskCardProps = {
  title: string;
  description: string;
  completed: boolean;
  onView: () => void;
};

const TaskCard = ({ title, description, completed, onView }: TaskCardProps) => {
  return (
    <div className="container">
      {/* Part 1: Check mark */}
      <div className="card-icon-section">
        <div className={`check-btn ${completed ? "done" : "pending"}`}>
          <TiTick />
        </div>
      </div>

      {/* Parts 2 & 3: Title and Description */}
      <div className="card-text-section">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      {/* Part 4: View button */}
      <div className="card-button-section">
        <button onClick={onView}>View</button>
      </div>
    </div>
  );
};

export default TaskCard;
