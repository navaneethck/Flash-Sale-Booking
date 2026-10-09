import { Router } from "express";
import { createBooking } from "../controllers/booking.controller.js";
import { rateLimiter } from "../middleware/ratelimitter.js";

const router=Router();

router.post("/events/:id/book",rateLimiter,createBooking);

export default router;