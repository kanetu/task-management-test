import { rest } from "msw";

export const handlers = [
  // Handles a GET /login request
  rest.get("/getUser", (req, res, ctx) => {
    console.log(req);
    const user = {
      name: "Hieu Tu",
      age: 25,
      email: "hieutum@nashtechglobal.com",
    };
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({ data: user })
    );
  }),
];
