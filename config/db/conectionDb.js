import 'dotenv/config'
import pg from 'pg'

const pool = new pg.Pool({
  host: process.env.DB_HOST,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.NAME_DATABASE,
  allowExitOnIdle: true
  // connectionString: process.env.DATABASE_URL,
 })

 export default pool;