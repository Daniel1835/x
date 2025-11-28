import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.SUPABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Supabase butuh SSL
  },
});

pool.connect()
  .then(() => console.log("🟢 Connected to Supabase Postgres"))
  .catch((err) => console.error("🔴 Database connection error:", err));
