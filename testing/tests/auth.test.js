const app = require("../../express/index");
const request = require("supertest");

describe("Testing Login", () => {
  test("Login sebagai Admin berhasil", async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "admin@billing.play", password: "admin" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.role).toBe("admin");
  });

  test("Login sebagai Kasir berhasil", async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "kasir@billing.play", password: "kasir" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.role).toBe("kasir");
  });
});
