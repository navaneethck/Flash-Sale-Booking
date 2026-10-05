import type { Request, Response } from "express";
import { createBookingService } from "../services/booking.service.js";
import { publishBooking } from "../services/bookingProducer.service.js";

export async function createBooking(req: Request, res: Response) {
  try {
    const eventId = Number(req.params.id);

    const { customerId, quantity } = req.body;

    if (!Number.isInteger(eventId) || eventId <= 0) {
      return res.status(400).json({
        message: "Invalid event ID"
      });
    }

    if (
      typeof customerId !== "string" ||
      customerId.trim() === ""
    ) {
      return res.status(400).json({
        message: "Invalid customer ID"
      });
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).json({
        message: "Quantity must be a positive integer"
      });
    }

    // const booking = await createBookingService(
    //   eventId,
    //   customerId,
    //   quantity
    // );

    publishBooking(eventId, customerId, quantity);

    return res.status(202).json({
      message:"Booking Request Accepted"
    });

  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "EVENT_NOT_FOUND") {
        return res.status(404).json({
          message: "Event not found"
        });
      }

      if (error.message === "INSUFFICIENT_TICKETS") {
        return res.status(409).json({
          message: "Not enough tickets available"
        });
      }
    }

    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}