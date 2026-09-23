import pool from "../config/database.js";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export async function createBookingService(
  eventId: number,
  customerId: string,
  quantity: number
) {
  // 1. Get the event
  const [eventRows] = await pool.execute<RowDataPacket[]>(
    `
      SELECT
        id,
        name,
        available_tickets,
        price
      FROM events
      WHERE id = ?
    `,
    [eventId]
  );

  // 2. Check whether event exists
  if (eventRows.length === 0) {
    throw new Error("EVENT_NOT_FOUND");
  }

  const event = eventRows[0]!;

  // 3. Check ticket availability
  if (event.available_tickets < quantity) {
    throw new Error("INSUFFICIENT_TICKETS");
  }

  // 4. Reduce available tickets
  await pool.execute(
    `
      UPDATE events
      SET available_tickets = available_tickets - ?
      WHERE id = ?
    `,
    [quantity, eventId]
  );

  // 5. Create booking
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

  // 6. Return booking information
  return {
    bookingId: result.insertId,
    eventId,
    customerId,
    quantity,
    status: "CONFIRMED"
  };
}