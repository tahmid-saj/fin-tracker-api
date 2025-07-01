
export const insertLogQuery = `
  insert into logs (createdtime, userid, email, requestpath, 
    requestmethod, responsestatus, responsecode)
  values ($1, $2, $3, $4, $5, $6, $7)
  returning *;
`

export const readAllLogsQuery = `
  select * from logs
  where time between $1 and $2 and userid = $3 and email = $4 
  and requestpath = $5 and requestmethod = $6
  and responsestatus = $7 and responsecode = $8
  offset $9
  limit $10;
`

export const readLogsByTimeQuery = `
  select * from logs
  where time between $1 and $2
  offset $3
  limit $4;
`

export const readLogsByUserQuery = `
  select * from logs
  where userid = $1 and email = $2
  offset $3
  limit $4;
`

export const readLogsByRequestQuery = `
  select * from logs
  where requestpath = $1 and requestmethod = $2
  offset $3
  limit $4;
`

export const readLogsByResponseQuery = `
  select * from logs
  where responsestatus = $1 and responsecode = $2
  offset $3
  limit $4;
`