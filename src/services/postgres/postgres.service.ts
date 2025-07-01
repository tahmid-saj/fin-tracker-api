import { pgPool } from "../../postgres/pool/pool.js";

export const postgresConnect = async () => {
  await pgPool.connect({
    host: process.env.PG_DB_HOST,
    port: process.env.PG_DB_PORT,
    database: process.env.PG_DB_NAME,
    user: process.env.PG_DB_USERNAME,
    password: process.env.PG_DB_PW,
    ssl: {
      rejectUnauthorized: false
    }
  })

  console.log("Connected to postgres DB")
}
