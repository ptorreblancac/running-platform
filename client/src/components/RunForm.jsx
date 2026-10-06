import { useEffect, useState } from "react";

function RunForm({
        onRunCreated,
        onRunUpdated,
        onCancelEdit,
        editingRun
    }) {    
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        date: "",
        distance: "",
        durationHours: "0",
        durationMinutes: "0",
        durationSeconds: "0",
        run_type: "",
        elevation: "",
        heart_rate: "",
        notes: ""
    });

    useEffect(() => {
        if (editingRun) {
            setFormData({
                date: editingRun.date,
                distance: editingRun.distance,
                durationHours: Math.floor(editingRun.duration / 3600),
                durationMinutes: Math.floor((editingRun.duration % 3600) / 60),
                durationSeconds: editingRun.duration % 60,
                run_type: editingRun.run_type,
                elevation: editingRun.elevation ?? "",
                heart_rate: editingRun.heart_rate ?? "",
                notes: editingRun.notes ?? ""
            });
        } else {
            setFormData({
                date: "",
                distance: "",
                duration: "",
                run_type: "",
                elevation: "",
                heart_rate: "",
                notes: ""
            });
        }
    }, [editingRun]);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");

        const duration =
            Number(formData.durationHours) * 3600 +
            Number(formData.durationMinutes) * 60 +
            Number(formData.durationSeconds);

        if (!formData.date) {
            setError("Please select a date.");
            return;
        }

        if (!formData.distance || Number(formData.distance) <= 0) {
            setError("Distance must be greater than 0.");
            return;
        }

        if (duration <= 0) {
            setError("Duration must be greater than 0.");
            return;
        }

        if (!formData.run_type) {
            setError("Please select a run type.");
            return;
        }

        const runData = {
            date: formData.date,
            distance: Number(formData.distance),
            duration: duration,
            run_type: formData.run_type,
            elevation: formData.elevation
                ? Number(formData.elevation)
                : null,
            heart_rate: formData.heart_rate
                ? Number(formData.heart_rate)
                : null,
            notes: formData.notes || null
        };

        const url = editingRun
            ? `http://localhost:3000/api/runs/${editingRun.id}`
            : "http://localhost:3000/api/runs";

        const method = editingRun ? "PUT" : "POST";

        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(runData)
        });

        if (!response.ok) {
            throw new Error("Failed to create run");
        }

        const savedRun = await response.json();

        if (editingRun) {
            onRunUpdated(savedRun);
        } else {
            onRunCreated(savedRun);
        }

        setFormData({
            date: "",
            distance: "",
            duration: "",
            run_type: "",
            elevation: "",
            heart_rate: "",
            notes: ""
        });
    }

    return (
        <form className="run-form" onSubmit={handleSubmit}>
            <h2>{editingRun ? "Edit Run" : "Add a Run"}</h2>

            <label>
                Date:
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                />
            </label>
            <label>
                Distance (km):
                <input
                    type="number"
                    name="distance"
                    value={formData.distance}
                    onChange={handleChange}
                />
            </label>
            <label>
                Duration:
                <div className="duration-inputs">
                    <input
                        type="number"
                        min="0"
                        max="99"
                        name="durationHours"
                        value={formData.durationHours}
                        onChange={handleChange}
                    />
                    <span>h</span>

                    <input
                        type="number"
                        min="0"
                        max="59"
                        name="durationMinutes"
                        value={formData.durationMinutes}
                        onChange={handleChange}
                    />
                    <span>min</span>

                    <input
                        type="number"
                        min="0"
                        max="59"
                        name="durationSeconds"
                        value={formData.durationSeconds}
                        onChange={handleChange}
                    />
                    <span>sec</span>
                </div>
            </label>
            <label>
                Run type:
                <select
                    name="run_type"
                    value={formData.run_type}
                    onChange={handleChange}
                >
                    <option value="">Select a type</option>
                    <option value="easy">Easy</option>
                    <option value="tempo">Tempo</option>
                    <option value="intervals">Intervals</option>
                    <option value="long">Long</option>
                    <option value="race">Race</option>
                </select>
            </label>
            <label>
                Elevation (m):
                <input
                    type="number"
                    name="elevation"
                    value={formData.elevation}
                    onChange={handleChange}
                />
            </label>
            <label>
                Heart rate (bpm):
                <input
                    type="number"
                    name="heart_rate"
                    value={formData.heart_rate}
                    onChange={handleChange}
                />
            </label>
            <label>
                Notes:
                <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                />
            </label>

            {error && <p className="form-error">{error}</p>}

            <div className="form-actions">
                <button type="submit">
                    {editingRun ? "Save Changes" : "Add Run"}
                </button>
                {editingRun && (
                    <button type="button" onClick={onCancelEdit}>
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}

export default RunForm;