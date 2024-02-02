import {
  getAllJoyasLimitModel,
  getAllJoyasLimitFormatModel,
  getAllJoyasHateoasModel,
  getAllJoyas,
  getAllJoyasFilterModel,
  getJoyasFilterModel,
} from "../models/joyas.models.js";

import HATEOAS from "../helpers/hateoas.js";
import pagination from "../helpers/paginator.js";

//Hateoas
/*1. Crear una ruta GET /joyas que:
  a. Devuelva la estructura HATEOAS de todas las joyas almacenadas en la base
de datos (1.5 puntos)
  b. Reciba en la query string los parámetros (2 puntos):
i. limits: Limita la cantidad de joyas a devolver por página
ii. page: Define la página
iii. order_by: Ordena las joyas según el valor de este parámetro, ejemplo:
stock_ASC
 */

export const getAllJoyasHateoasController = async (req, res) => {
  try {
    const result = await getAllJoyasHateoasModel();
    //console.log(result);
    const allJoyasWithHateoas = await HATEOAS("joyas", result);
    // console.log(allJoyasWithHateoas);
    res.status(200).json({ joyas: allJoyasWithHateoas });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//PAGINATOR
export const allJoyasPaginatorController = async (req, res) => {
  try {
    const { items, page } = req.query;
    const allJoyas = await getAllJoyas();
    const pageData = pagination(allJoyas, items, page);
    res.status(200).json(pageData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
  2.Crear una ruta GET /joyas/filtros que reciba los siguientes parámetros en la query
string: (3.5 puntos)
a. precio_max: Filtrar las joyas con un precio mayor al valor recibido
b. precio_min: Filtrar las joyas con un precio menor al valor recibido.
c. categoria: Filtrar las joyas por la categoría
d. metal: Filtrar las joyas por la categoría
 */


export const getJoyasFilterController = async (req, res) => {
  try {
    const { precio_max, precio_min, categoria, metal } = req.query;
    const allJoyas = await getJoyasFilterModel({
      precio_max,
      precio_min,
      categoria,
      metal}
    );
    res.status(200).json(allJoyas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**AYUDAS VARIAS 
  |
  |
  V
 */


// LIMIT


export const getAllJoyasLimitController = async (req, res) => {
  try {
    const { limits } = req.query;
    const result = await getAllJoyasLimitModel({ limits });
    res.status(200).json({ joyas: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllJoyasLimitFormatController = async (req, res) => {
  try {
    const { order_by, limits, page } = req.query;
    const joyas = await getAllJoyasLimitFormatModel(order_by, limits, page);
    res.status(200).json({ joya: joyas });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//FILTERS

export const getAllJoyasFilterController = async (req, res) => {
  try {
    const { items, page, filters } = req.body;
    console.log(items);
    const allJoyas = await getAllJoyasFilterModel(filters);
    console.log(allJoyas);
    const pageData = pagination(allJoyas, items, page);
    res.status(200).json(pageData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

