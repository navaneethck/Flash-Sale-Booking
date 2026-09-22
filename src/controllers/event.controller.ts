import type { Request, Response } from "express";
import { findEventById } from "../services/event.service.js";
import { createEvent as createEventService } from "../services/event.service.js";


export async function getEvent(req:Request,res:Response){
    const id =Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "Invalid event ID"
    });
  }
    const event = await findEventById(id);

    if (event.length === 0) {
    return res.status(404).json({
      message: "Event not found"
    });
  }
    return res.json(event[0]);
}

export async function createEvent(req: Request, res: Response) {
  const {
    name,
    totalTickets,
    price,
    saleStartsAt,
    saleEndsAt
  } = req.body;

  if (
    !name ||
    !Number.isInteger(totalTickets) ||
    totalTickets <= 0 ||
    typeof price !== "number" ||
    price <= 0 ||
    !saleStartsAt ||
    !saleEndsAt
  ) {
    return res.status(400).json({
      message: "Invalid event data"
    });
  }

  const result = await createEventService(
    name,
    totalTickets,
    price,
    saleStartsAt,
    saleEndsAt
  );

  return res.status(201).json({
    message: "Event created",
    eventId: result.insertId
  });
}