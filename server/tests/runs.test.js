const request = require("supertest");


jest.mock("../src/db", () => ({
    query: jest.fn()
}));

const app = require("../src/app");
const pool = require("../src/db");

describe("GET /api/runs", () => {

    beforeEach(() => {
        pool.query.mockReset();
    });

    test("Should return all runs", async () => {

        pool.query.mockResolvedValue({
            rows: [
                {
                    id: 1,
                    date: "2026-09-22",
                    distance: 5,
                    duration: 30,
                    run_type: "easy",
                    elevation: 50,
                    heart_rate: 150,
                    notes: "Easy run"
                }
            ]
        });

        const response = await request(app).get("/api/runs");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toHaveLength(1);
        expect(response.body[0].distance).toBe(5);

    });

    test("Should return a run by ID", async () => {

        pool.query.mockResolvedValue({
            rows: [
                {
                    id: 1,
                    date: "2026-09-22",
                    distance: 5,
                    duration: 30,
                    run_type: "easy",
                    elevation: 50,
                    heart_rate: 150,
                    notes: "Easy run"
                }
            ]
        });

        const response = await request(app).get("/api/runs/1");

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(1);
        expect(response.body.distance).toBe(5);

    });

    test("Should return error for a non-existent run by ID", async () => {

        pool.query.mockResolvedValue({
            rows: []
        });

        const response = await request(app).get("/api/runs/2");

        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe("Run not found");

    });
})

describe("POST /api/runs", () => {

    beforeEach(() => {
        pool.query.mockReset();
    });

    test("Should create a new run", async () => {

        pool.query.mockResolvedValue({
            rows: [
                {
                    id: 3,
                    date: "2026-09-22",
                    distance: 5,
                    duration: 30,
                    run_type: "easy",
                    elevation: 50,
                    heart_rate: 150,
                    notes: "Easy run"
                }
            ]
        });

        const newRun = {
            date: "2026-09-22",
            distance: 5,
            duration: 30,
            run_type: "easy",
            elevation: 50,
            heart_rate: 150,
            notes: "Easy run"
        };

        const response = await request(app).post("/api/runs").send(newRun);

        expect(response.statusCode).toBe(201);
        expect(response.body.id).toBe(3);
        expect(response.body.distance).toBe(5);
        expect(pool.query).toHaveBeenCalledWith(
            expect.any(String),
            [
                newRun.date,
                newRun.distance,
                newRun.duration,
                newRun.run_type,
                newRun.elevation,
                newRun.heart_rate,
                newRun.notes
            ]
        );

    });

   test.each([
        ["missing date", {
            distance: 5,
            duration: 30,
            run_type: "easy"
        }],
        ["missing distance", {
            date: "2026-09-22",
            duration: 30,
            run_type: "easy"
        }],
        ["missing duration", {
            date: "2026-09-22",
            distance: 5,
            run_type: "easy"
        }],
        ["missing run_type", {
            date: "2026-09-22",
            distance: 5,
            duration: 30
        }]
    ])("Should reject request with %s", async (description, invalidRun) => {

        const response = await request(app)
            .post("/api/runs")
            .send(invalidRun);

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe("Missing required fields");
    });

    test.each([
        ["negative distance", {
            date: "2026-09-22",
            distance: -5,
            duration: 30,
            run_type: "easy"
        }],
        ["zero distance", {
            date: "2026-09-22",
            distance: 0,
            duration: 30,
            run_type: "easy"
        }],
        ["negative duration", {
            date: "2026-09-22",
            distance: 5,
            duration: -30,
            run_type: "easy"
        }],
        ["zero duration", {
            date: "2026-09-22",
            distance: 5,
            duration: 0,
            run_type: "easy"
        }]
    ])("Should reject request with %s", async (description, invalidRun) => {

        const response = await request(app)
            .post("/api/runs")
            .send(invalidRun);

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe("Invalid values");
    });
});

describe("PUT /api/runs/:id", () => {

    beforeEach(() => {
        pool.query.mockReset();
    });

    test("updates an existing run", async () => {
        const updatedRun = {
            id: 1,
            date: "2026-09-22",
            distance: 10,
            duration: 55,
            run_type: "tempo",
            elevation: 80,
            heart_rate: 165,
            notes: "Updated run"
        };

        pool.query.mockResolvedValue({
            rows: [updatedRun]
        });

        const response = await request(app).put("/api/runs/1").send(updatedRun);

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(1);
        expect(response.body.distance).toBe(10);
        expect(response.body.run_type).toBe("tempo");
    });

    test("returns 404 when run does not exist", async () => {
        pool.query.mockResolvedValue({
            rows: []
        });

        const response = await request(app)
            .put("/api/runs/999")
            .send({
                date: "2026-09-22",
                distance: 5,
                duration: 30,
                run_type: "easy",
                elevation: 50,
                heart_rate: 150,
                notes: "Test"
            });

        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe("Run not found");
    });

    test("handles database error", async () => {
        pool.query.mockRejectedValue(new Error("Database error"));

        const response = await request(app)
            .put("/api/runs/1")
            .send({
                date: "2026-09-22",
                distance: 5,
                duration: 30,
                run_type: "easy",
                elevation: 50,
                heart_rate: 150,
                notes: "Test"
            });

        expect(response.statusCode).toBe(500);
        expect(response.body.error).toBe("Database error");
    });
});

describe("DELETE /api/runs/:id", () => {

    beforeEach(() => {
        pool.query.mockReset();
    });

    test("deletes an existing run", async () => {
        pool.query.mockResolvedValue({
            rowCount: 1
        });

        const response = await request(app).delete("/api/runs/1");

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Run deleted succesfully!");
    });

    test("returns 404 when run does not exist", async () => {
        pool.query.mockResolvedValue({
            rowCount: 0
        });

        const response = await request(app)
            .delete("/api/runs/999");

        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe("Run not found");
    });

    test("handles database error", async () => {
        pool.query.mockRejectedValue(new Error("Database error"));

        const response = await request(app)
            .delete("/api/runs/1");

        expect(response.statusCode).toBe(500);
        expect(response.body.error).toBe("Database error");
    });
});

describe("GET /", () => {

    test("returns API running message", async () => {
        const response = await request(app)
            .get("/");

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe(
            "Running Platform API is running!"
        );
    });

});

describe("Unknown routes", () => {

    test("returns 404 for an unknown route", async () => {
        const response = await request(app)
            .get("/api/does-not-exist");

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Invalid route");
    });

});