import request from "supertest";
import { createApp } from "../src/app";

describe("Foundation smoke", () => {
  const { app } = createApp();

  it("GET /health returns ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  it("Unknown route returns 404", async () => {
    const res = await request(app).get("/does-not-exist");
    expect(res.status).toBe(404);
  });
});
