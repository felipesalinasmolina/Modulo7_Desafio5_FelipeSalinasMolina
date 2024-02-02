import { Router } from "express";
import {
  getAllJoyasHateoasController,
  getAllJoyasLimitController,
  getAllJoyasLimitFormatController,
  allJoyasPaginatorController,
  getAllJoyasFilterController,
  getJoyasFilterController,
} from "../controllers/joyas.controllers.js";

const router = Router();
//Hateoas
/*1. Crear una ruta GET /joyas que:
  a. Devuelva la estructura HATEOAS de todas las joyas almacenadas en la base
de datos (1.5 puntos)
  b. Reciba en la query string los parámetros (2 puntos):
i. limits: Limita la cantidad de joyas a devolver por página
ii. page: Define la página
iii. order_by: Ordena las joyas según el valor de este parámetro, 
 */
router.get("/joyas", getAllJoyasHateoasController);


/*FILTRO ESTATICO*/
/**
  2.Crear una ruta GET /joyas/filtros que reciba los siguientes parámetros en la query
string: (3.5 puntos)
a. precio_max: Filtrar las joyas con un precio mayor al valor recibido
b. precio_min: Filtrar las joyas con un precio menor al valor recibido.
c. categoria: Filtrar las joyas por la categoría
d. metal: Filtrar las joyas por la categoría
 */

router.get("/joyas/filtros", getJoyasFilterController);



/**AYUDAS VARIAS 
  |
  |
  V
 */


router.get("/joyas_whit_limit", getAllJoyasLimitController);
router.get("/joyas_whit_limit_and_order", getAllJoyasLimitFormatController);
router.get("/joyas_whit_pagination", allJoyasPaginatorController);

//router.get("/joyas/filter",getAllJoyasFilterController)

export default router;
