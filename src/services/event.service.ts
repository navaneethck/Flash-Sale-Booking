import pool from "../config/database.js";
import type { RowDataPacket } from "mysql2";
import type { ResultSetHeader } from "mysql2";

export async function findEventById(id: number) {
  const [record] = await pool.execute<RowDataPacket[]>(
    `
      SELECT
        id,
        name,
        total_tickets,
        available_tickets,
        price,
        sale_starts_at,
        sale_ends_at,
        created_at
      FROM events
      WHERE id = ?
    `,
    [id]
  );

  return record;
}

export async function createEvent(
  name: string,
  totalTickets: number,
  price: number,
  saleStartsAt: string,
  saleEndsAt: string
){
  const [record] = await pool.execute<ResultSetHeader>(
     `
      INSERT INTO events (
        name,
        total_tickets,
        available_tickets,
        price,
        sale_starts_at,
        sale_ends_at
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `,
        [
      name,
      totalTickets,
      totalTickets,
      price,
      saleStartsAt,
      saleEndsAt
    ]
  );

  return record;
}