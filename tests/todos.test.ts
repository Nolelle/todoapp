import { NextRequest } from "next/server";
import request from "supertest";
import { DELETE, PUT } from "../app/api/todos/[id]/route";
import { GET, POST } from "../app/api/todos/route";

// Mock the Next.js API handler
const apiHandler = (handler: any) => {
  return {
    post: (url: string) => request(handler),
    get: (url: string) => request(handler),
    put: (url: string) => request(handler),
    delete: (url: string) => request(handler)
  };
};

describe("Todos API", () => {
  let todoId: string;

  test("POST /api/todos - should create a new todo", async () => {
    const res = await apiHandler(POST).post("/api/todos").send({
      title: "Test Todo"
    });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Test Todo");
    expect(res.body).toHaveProperty("id");
    todoId = res.body.id; // Store the ID for later use
  });

  test("GET /api/todos - should retrieve all todos", async () => {
    const res = await apiHandler(GET).get("/api/todos");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("PUT /api/todos/:id - should update a specific todo", async () => {
    const res = await apiHandler(PUT).put(`/api/todos/${todoId}`).send({
      title: "Updated Todo",
      completed: true
    });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Updated Todo");
    expect(res.body.completed).toBe(true);
  });

  test("DELETE /api/todos/:id - should delete a specific todo", async () => {
    const res = await apiHandler(DELETE).delete(`/api/todos/${todoId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(todoId);
  });
});
