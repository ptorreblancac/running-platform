import { formatPace, formatDuration } from "../utils/formatters";

function RunCard({ run, onEdit, onDelete }) {

    const pace = Number(run.duration)/(run.distance);

    return (
        <div className="run-card">

            <div className="run-card-header">
                <div>
                    <h3>{run.date}</h3>
                    <span className="run-type">{run.run_type}</span>
                </div>
            </div>

            <div className="run-main-stats">
                <div>
                    <span>Distance </span>
                    <strong>{run.distance} km</strong>
                </div>

                <div>
                    <span>Duration </span>
                    <strong>{formatDuration(run.duration)}</strong>
                </div>

                <div>
                    <span>Pace </span>
                    <strong>{formatPace(pace)} /km</strong>
                </div>
            </div>

            <div className="run-details">
                {run.elevation !== null && (
                    <span>
                        Elevation: {run.elevation}
                    </span>
                )}

                {run.heart_rate !== null && (
                    <span>
                        Heart rate: {run.heart_rate}
                    </span>
                )}
        
            </div>

            {run.notes !== null && (
                <span>
                    {run.notes}
                </span>
            )}

            <div className="run-actions">
                <button 
                className="edit-button"
                onClick={() => onEdit(run)}
                >
                    Edit
                </button>

                <button 
                className="delete-button"
                onClick={() => onDelete(run.id)}
                >
                    Delete
                </button>

            </div>
            
        </div>
    );
}

export default RunCard;