import pool from "../../../../config/db/conectionDb.js";
import bcrypt from "bcryptjs";

const createUser = async ({ nombre, apellido, email, password }) => {
  const hashedPassword = bcrypt.hashSync(password)
  const SQLquery = {
    text: "INSERT INTO usuarios (nombre, apellido, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
    values: [nombre, apellido, email, hashedPassword],
  };
  const response = await pool.query(SQLquery);
  return response.rows[0];
};


const byEmail = async ({email}) => {
  const SQLquery = {
    text: "SELECT * FROM usuarios WHERE email = $1",
    values: [email],
  };
  const response = await pool.query(SQLquery);
  return response.rows[0];
}
export { createUser, byEmail };
