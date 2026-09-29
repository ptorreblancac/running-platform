import { formatDuration } from "../utils/formatters";

function RunCard({ run, onEdit, onDelete }) {
    return (
        <div className="run-card">
            <p><strong>Date:</strong> {run.date}</p>
            <p><strong>Distance:</strong> {run.distance} km</p>
            <p><strong>Duration:</strong> {formatDuration(run.duration)} minutes</p>
            <p><strong>Type:</strong> {run.run_type}</p>
            <button onClick={() => onEdit(run)}>
                Edit
            </button>
            <button onClick={() => onDelete(run.id)}>
                Delete
            </button>
        </div>
    );
}

export default RunCard;