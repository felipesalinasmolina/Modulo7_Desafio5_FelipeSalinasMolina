import format from "pg-format";
import { pool } from "../db.js";
import postQuery from "../helpers/filter.js";

//Hateoas
/*1. Crear una ruta GET /joyas que:
  a. Devuelva la estructura HATEOAS de todas las joyas almacenadas en la base
de datos (1.5 puntos)
  b. Reciba en la query string los parámetros (2 puntos):
i. limits: Limita la cantidad de joyas a devolver por página
ii. page: Define la página
iii. order_by: Ordena las joyas según el valor de este parámetro, 
 */
export const getAllJoyasHateoasModel = async () => {
  try {
    const allJoyas = await pool.query("SELECT * FROM inventario");
    console.log(allJoyas);
    return allJoyas.rows;
  } catch (error) {
    throw new Error(" Error getting all joyas " + error.message);
  }
};

// FILTERS

/*FILTRO ESTATICO*/
/**
  2.Crear una ruta GET /joyas/filtros que reciba los siguientes parámetros en la query
string: (3.5 puntos)
a. precio_max: Filtrar las joyas con un precio mayor al valor recibido
b. precio_min: Filtrar las joyas con un precio menor al valor recibido.
c. categoria: Filtrar las joyas por la categoría
d. metal: Filtrar las joyas por la categoría
 */

export const getJoyasFilterModel = async ({
  precio_max = 100000,
  precio_min = 0,
  categoria = "collar",
  metal = "oro"}
) => {
  try {
    const allJoyas = format(
      "SELECT * FROM inventario WHERE precio <=%s AND precio >= %s AND categoria = '%s' AND metal='%s'",
      precio_max,
      precio_min,
      categoria,
      metal
    );
    const response = await pool.query(allJoyas);
    return response.rows;
  } catch (error) {
    throw new Error(" Error getting filters joyas " + error.message);
  }
};

/*FILTRO DINAMICO */

export const getAllJoyasFilterModel = async (filters) => {
  try {
    const { query, values } = postQuery("inventario", filters);
    console.log(query);
    console.log(values);
    const result = await pool.query(query, values);
    console.log(result.rows);
    return result.rows;
  } catch (error) {
    throw new Error(" Error getting all joyas " + error.message);
  }
};
export const getAllJoyas = async () => {
  try {
    const allJoyas = await pool.query("SELECT * FROM inventario");
    return allJoyas.rows;
  } catch (error) {
    throw new Error(" Error getting all joyas" + error.message);
  }
};


/**AYUDAS VARIAS 
  |
  |
  V
 */


export const getAllJoyasLimitModel = async ({ limits = 10 }) => {
  try {
    const alljoyas = await pool.query(
      "SELECT * FROM inventario ORDER BY id DESC LIMIT $1",
      [limits]
    );
    return alljoyas.rows;
  } catch (error) {
    throw new Error(" Error getting all joyas" + error.message);
  }
};

export const getAllJoyasLimitFormatModel = async (
  order_by = "id_DESC",
  limits = 10,
  page = 0
) => {
  try {
    const [attribute, direction] = order_by.split("_");
    const offset = page * limits;
    const allJoyas = format(
      "SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s",
      attribute,
      direction,
      limits,
      offset
    );
    const response = await pool.query(allJoyas);
    return response.rows;
  } catch (error) {
    throw new Error(" Error getting all joyas " + error.message);
  }
};

