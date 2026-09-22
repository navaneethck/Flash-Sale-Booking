import app from "./app.js";
import pool from "./config/database.js";

const PORT = 3000;

async function startserver (){
try{
  const connection = await pool.getConnection();
     try {
      await connection.query("SELECT 1");
      console.log("MySQL connected successfully");
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
