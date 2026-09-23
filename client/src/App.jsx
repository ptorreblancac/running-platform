import { useEffect, useState } from "react";
import RunCard from "./components/RunCard";
import { formatPace } from "./utils/formatters";


function App() {

    const [runs, setRuns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/api/runs")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch runs");
                }

                return response.json();
            })
            .then(data => {
                console.log(data);
                setRuns(data);
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });

    }, []);

    const totalRuns = runs.length;

    const totalDistance = runs.reduce(
        (total,run) => total + Number(run.distance),0
    );

    const totalDuration = runs.reduce(
        (total,run) => total + Number(run.duration),0
    );

    const averagePace = (totalDistance > 0) ? totalDuration / totalDistance : 0;
    const formattedPace = formatPace(averagePace);

    if (loading) {
        return <p>Loading runs...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>Running Platform</h1>
            <p>My running tracker</p>

            <div className="stats">
                <div className="stat-card">
                    <span>Total Runs</span>
                    <strong>{totalRuns}</strong>
                </div>

                <div className="stat-card">
                    <span>Total Distance</span>
                    <strong>{totalDistance.toFixed(2)} km</strong>
                </div>

                <div className="stat-card">
                    <span>Average Pace</span>
                    <strong>{formattedPace} min/km</strong>
                </div>
            </div>

            <h2>My Runs</h2>

            {runs.length === 0 ? (
                <p>No runs yet. Add your first run!</p>
            ) : (
                runs.map(run => (
                    <RunCard key={run.id} run={run} />
                ))
            )}
        </div>
    );
}

export default App;