import pool from "../config/database.js";
import type { RowDataPacket } from "mysql2";
import type { ResultSetHeader } from "mysql2";
import redisClient from "../config/redis.js";


export async function findEventById(eventId: number) {
  const cacheKey=`event:&{eventId}`;
  const cachedEvent=await redisClient.get(cacheKey);
    if (cachedEvent) {
    console.log("CACHE HIT");
    return JSON.parse(cachedEvent);
  }
  console.log("cache miss")
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
    [eventId]
  );
await redisClient.set(
  cacheKey,
  JSON.stringify(record),
  {
    EX:60
  }
)
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