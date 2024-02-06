import pool from  "../../../../config/db/conectionDb.js";
import format from "pg-format";
import createQuery from "../helpers/filter.js"; 

const getTravels = async () => {
  const SQLquery = { text: "SELECT * FROM viajes" };
  const response = await pool.query(SQLquery);
  return response.rows;
};

const createTravel = async ({ destino, presupuesto }) => {
  const SQLquery = {
    text: "INSERT INTO viajes (destino, presupuesto) VALUES ($1, $2) RETURNING *",
    values: [destino, presupuesto],
  };
  const response = await pool.query(SQLquery);
  return response.rows[0];
};

const updateTravel = async (id, { presupuesto, destino }) => {
  const SQLquery = {
    text: "UPDATE viajes SET presupuesto = $1, destino = $2 WHERE id = $3 RETURNING *",
    values: [presupuesto, destino, id],
  };
  const response = await pool.query(SQLquery);
  return response.rows[0];
};

const destroyTravel = async (id) => {
  const SQLquery = {
    text: "DELETE FROM viajes WHERE id = $1",
    values: [id],
  };
  const response = await pool.query(SQLquery);
  return response.rowCount;
};

// para liimitar las cantidad de reagistros que se muestran basta con recibir este campo por query params
// se agrega un parametro por defecto en caso de que no se reciba nada
const limitTravels = async (limits = 10) => {
  const SQLquery = {
    text: "SELECT * FROM viajes ORDER BY id DESC LIMIT $1",
    values: [limits],
  };
  const response = await pool.query(SQLquery);
  return response.rows;
};

// comineza el uso de pg format

const orderAndLimitTravels = async (
  order_by = "id_ASC",
  limits = 10,
  page = 0
) => {
  const [attribute, direction] = order_by.split("_");
  const offset = page * limits;
  const formattedQuery = format(
    "SELECT * FROM viajes ORDER BY %s %s LIMIT %s OFFSET %s",
    attribute,
    direction,
    limits,
    offset
  );
  console.log("query: ", formattedQuery);
  const response = await pool.query(formattedQuery);
  console.log("response", response);
  return response.rows;
};

// termina pg format

const travelsFilter = async (filters) => {
  const { query, values } = createQuery("viajes", filters);
  const result = await pool.query(query, values);
  return result.rows;
};

const travelById = async (id) => {
  const SQLquery = {
    text: "SELECT * FROM viajes WHERE id = $1",
    values: [id],
  };
  const response = await pool.query(SQLquery);
  return response.rows[0];
}

export {
  getTravels,
  createTravel,
  updateTravel,
  destroyTravel,
  limitTravels,
  orderAndLimitTravels,
  travelsFilter,
  travelById
};
