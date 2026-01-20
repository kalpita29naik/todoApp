import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Backend is Running");
});

app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
