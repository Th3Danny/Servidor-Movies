import { createConnection } from "mysql2";
import dotenv from "dotenv"

dotenv.config();

const db = createConnection({
    host : 3306,
    user : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE
})

export default db.promise();