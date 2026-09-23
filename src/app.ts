import express from "express";
import eventRoutes from "./routes/event.routes.js";
import bookingRoutes from "./routes/booking.routes.js";

const app = express();

app.use(express.json());


app.get("/health", (_req, res) => {
  res.json({
    status: "ok"
  });
});

app.use("/api/events", eventRoutes);
app.use("/api", bookingRoutes);

export default app;