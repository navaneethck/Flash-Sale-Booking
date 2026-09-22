import express from "express";
import eventRoutes from "./routes/event.routes.js";

const app = express();

app.use(express.json());


app.get("/health", (_req, res) => {
  res.json({
    status: "ok"
  });
});

app.use("/api/events", eventRoutes);

export default app;