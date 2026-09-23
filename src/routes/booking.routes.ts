import { Router } from "express";
import { createBooking } from "../controllers/booking.controller.js";

const router=Router();

router.post("/events/:id/book",createBooking);

export default router;