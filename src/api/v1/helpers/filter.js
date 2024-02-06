const createQuery = (entity, filters) => {
  // **********esto lo podriamos llevar a un metodo ?? para que todas las tablas lo usen, podriamos paginarlo??  ******
  // Inicializar la consulta base
  const table = entity.toLowerCase();
  let query = `SELECT * FROM ${table} WHERE 1 = 1`;

  console.log("init query", query);

  // La expresión 1 = 1 es simplemente una condición que siempre es verdadera. Se utiliza comúnmente
  // como truco en la construcción de consultas SQL dinámicas para simplificar la lógica.

  // Cuando estás construyendo condiciones dinámicamente y quieres agregar condiciones adicionales con el
  // operador AND, necesitas asegurarte de que la primera condición no genere un error de sintaxis.
  // Al agregar 1 = 1 como la primera condición, la consulta siempre es verdadera, por lo que no afecta el
  // resultado final de la consulta, pero permite agregar condiciones adicionales sin preocuparse si es la
  // primera condición o no.

  // Obtener las claves y valores de filters
  const filterEntries = Object.entries(filters);
  console.log("filterEntries", filterEntries);
  const values = [];
  // Iterar sobre las claves y valores de filters
  for (const [key, value] of filterEntries) {
    // if (key == 'stock_min'){
    //   query += ` AND stock >= $${values.length + 1}`;
    //   values.push(value);
    // }
    query += ` AND ${key} = $${values.length + 1}`;
    values.push(value);
  }
  console.log("final query", query);
  console.log("final values", values);
  return { query, values };
};

export default createQuery;
