import app from "./app.js";
import pool from "./config/database.js";
import redisClient from "./config/redis.js";
import { connectRabbitMQ } from "./config/rabbitMQ.js";
import { startBookingWorker } from "./workers/booking.worker.js";

const PORT = 3000;

async function startserver (){
try{
  const connection = await pool.getConnection();
     try {
      await connection.query("SELECT 1");
      console.log("MySQL connected successfully");
         await redisClient.connect();
           console.log("Redis connected successfully");
           await redisClient.set("test:key", "hello redis");
           await connectRabbitMQ();
           await startBookingWorker();
    } finally {
      connection.release();
    }
       app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
}catch (error) {
    console.error("Unable to connect to MySQL:", error);
    process.exit(1);
  }
}
startserver();
