import pool from "../config/database.js";
import type {  ResultSetHeader } from "mysql2";
import redisClient from "../config/redis.js";

export async function createBookingService(
  eventId: number,
  customerId: string,
  quantity: number
) {
  const [updateResult] = await pool.execute<ResultSetHeader>(
    `
      UPDATE events
      SET available_tickets = available_tickets - ?
      WHERE id = ?
        AND available_tickets >= ?
    `,
    [quantity, eventId, quantity]
  );
  
    if (updateResult.affectedRows === 0) {
    throw new Error("INSUFFICIENT_TICKETS");
  }
   
 

  const [result] = await pool.execute<ResultSetHeader>(
    `
      INSERT INTO bookings (
        event_id,
        customer_id,
        quantity,
        status
      )
      VALUES (?, ?, ?, 'CONFIRMED')
    `,
    [eventId, customerId, quantity]
  );

  return {
    bookingId: result.insertId,
    eventId,
    customerId,
    quantity,
    status: "CONFIRMED"
  };

  await redisClient.del(`event:${eventId}`);
}

