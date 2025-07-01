import pg from "pg"

// allow multiple clients to be initialized using the connection pool
class PostgresPool {
  pool: any = null
   
  connect(options: any) {
    this.pool = new pg.Pool(options)

    return this.pool.query("select 1 + 1;")
  }

  close() {
    return this.pool.end()
  }

  query(sql: string, params: any) {
    return this.pool.query(sql, params)
  }
}

export const pgPool = new PostgresPool()
