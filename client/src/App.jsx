import { useEffect, useState } from "react";
import RunCard from "./components/RunCard";
import { formatPace } from "./utils/formatters";
import RunForm from "./components/RunForm";

const API_URL = "http://localhost:3000/api/runs";

function App() {

    const [runs, setRuns] = useState([]);
    const [filterType, setFilterType] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [editingRun, setEditingRun] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(API_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch runs");
                }

                return response.json();
            })
            .then(data => {
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

        try {
           const response = await fetch(
                `${API_URL}/${id}`,
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
        } catch (error) {
            setError(error.message);
        }

        
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

    const filteredRuns = filterType === "all" ? runs : runs.filter(run => run.run_type === filterType);

    const sortedRuns = [...filteredRuns].sort((a,b) => {
        if (sortBy === "newest") {
            return new Date(b.date) - new Date(a.date);
        } else if (sortBy === "oldest") {
            return new Date(a.date) - new Date(b.date);
        } else if (sortBy === "distance") {
            return Number(b.distance) - Number(a.distance);
        } else if (sortBy === "pace") {
            const paceA = Number(a.duration) / Number(a.distance);
            const paceB = Number(b.duration) / Number(b.distance);

            return paceA - paceB;
        }

        return 0;


    })

    return (
        <div className="app">

            <header className="header">
                <h1>Running Platform</h1>
                <p>My running tracker</p>
            </header>
            
            <section className="stats">
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
                    <strong>{formattedPace} /km</strong>
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

                    <div className="run-controls">
                        <label>
                            Filter by type:
                        <select
                                value={filterType}
                                onChange={(event => setFilterType(event.target.value))}
                        >
                                <option value="all">All</option>
                                <option value="easy">Easy</option>
                                <option value="tempo">Tempo</option>
                                <option value="intervals">Intervals</option>
                                <option value="long">Long</option>
                                <option value="race">Race</option>
                            </select> 
                            
                        </label>

                        <label>
                            Sort by:
                        <select
                                value={sortBy}
                                onChange={(event => setSortBy(event.target.value))}
                        >
                                <option value="newest">Newest</option>
                                <option value="oldest">Oldest</option>
                                <option value="distance">Distance</option>
                                <option value="pace">Pace</option>
                            </select> 
                            
                        </label>
                    </div>
                    

                </div>
                
                <div className="runs-list">
                    {sortedRuns.length === 0 ? (
                        <p>
                            {filteredType === "all" 
                                ? "No runs yet. Add your first run!" 
                                : "No runs found for this filter."
                            }
                        </p>
                    ) : (
                        sortedRuns.map(run => (
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