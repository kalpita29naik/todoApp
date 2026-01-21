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
    
      <div className="card-icon-section">
        <div className={`check-btn ${completed ? "done" : "pending"}`}>
          <TiTick />
        </div>
      </div>

      <div className="card-text-section">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <div className="card-button-section">
        <button onClick={onView}>View</button>
      </div>
    </div>
  );
};

export default TaskCard;
