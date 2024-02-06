const ERRORS = [
  {
    code: "23502",
    status: 400,
    message: "El campo destino o presupuesto no puede estar vacio",
  },
  {
    code: "42P01",
    status: 500,
    message: "error en la conexion con la base de datos",
  },
  { code: "22P02", status: 400, message: "el tipo de dato no corresponde" },
  { code: "22P02", status: 400, message: "bad request" },
  { code: "42601", status: 400, message: "errro de sintaxis en la consulta" },
  { code: "auth_01", status: 400, message: "el usuario no existe" },
  { code: "auth_02", status: 400, message: "contraseña invalida" },
  { code: "auth_03", status: 401, message: "el token debe estar presente" },
  { code: "auth_04", status: 401, message: "el token no es valido" },
];

export default ERRORS;
