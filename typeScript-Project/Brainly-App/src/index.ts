import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

// middleware
app.use(express.json());

// route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express + TypeScript 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
