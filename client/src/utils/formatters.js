export function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (remainingSeconds === 0) {
        return `${minutes}`;
    }

    return `${minutes} min ${remainingSeconds} sec`;
}

export function formatPace(secondsPerKm) {
    const minutes = Math.floor(secondsPerKm / 60);
    const seconds = Math.round(secondsPerKm % 60);

    return `${minutes}:${String(seconds).padStart(2, "0")}`;
}