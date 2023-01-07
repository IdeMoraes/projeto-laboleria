import pkg from "pg";

const { Pool } = pkg;

const connection = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "29062007",
  database: "la_boleria",
});

export default connection;