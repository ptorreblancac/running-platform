import { useEffect, useState } from "react";
import RunCard from "./components/RunCard";
import { formatPace } from "./utils/formatters";
import RunForm from "./components/RunForm";

function App() {

    const [runs, setRuns] = useState([]);
    const [editingRun, setEditingRun] = useState(null);
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

    function handleRunCreated(newRun) {
        setRuns(prevRuns => [newRun, ...prevRuns]);
    }

    function handleRunUpdated(updatedRun) {
        console.log("Updating React state with:", updatedRun);
        setRuns(prevRuns =>
            prevRuns.map(run =>
                run.id === updatedRun.id ? updatedRun : run
            )
        );
    }

    async function handleDelete(id) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this run?"
        );

        if (!confirmed) {
            return;
        }
        const response = await fetch(
            `http://localhost:3000/api/runs/${id}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error("Failed to delete run");
        }

        setRuns(prevRuns =>
            prevRuns.filter(run => run.id !== id)
        );
    }

    function handleEdit(run) {
        setEditingRun(run);
    }

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
        <div className="app">

            <header className="header">
                <h1>Running Platform</h1>
                <p>My running tracker</p>
            </header>
            
            <section className="stats">
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
            </section>
            

            <RunForm 
                onRunCreated={handleRunCreated}
                onRunUpdated={handleRunUpdated}
                onCancelEdit={() => setEditingRun(null)}
                editingRun={editingRun}
            />
 
            <section className="runs-section">
                <div className="section-header">
                    <h2>My Runs</h2>
                </div>
                
                <div className="runs-list">
                    {runs.length === 0 ? (
                        <p>No runs yet. Add your first run!</p>
                    ) : (
                        runs.map(run => (
                            <RunCard 
                            key={run.id}
                            run={run}
                            onEdit={handleEdit} 
                            onDelete={handleDelete}
                            />
                        ))
                    )}
                </div> 
                
            </section>
            
        </div>
    );
}

export default App;