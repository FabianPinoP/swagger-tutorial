import {
  getTravels,
  createTravel,
  updateTravel,
  destroyTravel,
  limitTravels,
  orderAndLimitTravels,
  travelsFilter,
  travelById,
} from "../models/travelModel.js";

import { findError } from "../utils/utils.js";
import pagination from "../helpers/paginator.js";
import prepareHateoas from "../helpers/hateoas.js";

const getAllTravels = async (req, res) => {
  try {
    const travels = await getTravels();
    res.status(200).json({ travels: travels });
  } catch (error) {
    console.log(error);
    const errorFound = findError(error.code);
    return res
      .status(errorFound[0]?.status)
      .json({ error: errorFound[0]?.message });
  }
};

const createTravels = async (req, res) => {
  try {
    const { travel } = req.body;
    const newProduct = await createTravel(travel);
    res.status(201).json({ travel: newProduct });
  } catch (error) {
    const errorFound = findError(error.code);
    return res
      .status(errorFound[0].status)
      .json({ error: errorFound[0].message });
  }
};

const updateTravels = async (req, res) => {
  try {
    const { id } = req.params;
    const { travel } = req.body;
    const travel_update = await updateTravel(id, travel);
    res.status(200).json({ travel: travel_update });
  } catch (error) {
    const errorFound = findError(error.code);
    return res
      .status(errorFound[0].status)
      .json({ error: errorFound[0].message });
  }
};

const deleteTravels = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTravel = await destroyTravel(id);
    if (deleteTravel === 0) {
      return res.status(404).json({ message: "No existe el registro" });
    }
    res.status(204).json({ message: "registro eliminado con exito" });
  } catch (error) {
    const errorFound = findError(error.code);
    return res
      .status(errorFound[0].status)
      .json({ error: errorFound[0].message });
  }
};

// para liimitar las cantidad de reagistros que se muestran basta con mandar este campo por query params

const getTravelsLimit = async (req, res) => {
  try {
    console.log("req.query", req.query);
    console.log("req.params", req.params);
    const { limit } = req.query;
    const travels = await limitTravels(limit);
    res.status(200).json({ travels: travels });
  } catch (error) {
    const errorFound = findError(error.code);
    return res
      .status(errorFound[0].status)
      .json({ error: errorFound[0].message });
  }
};

// comineza el uso de pg format para ordenar, limitar los registros y paginar los registros

const getOrderAndLimitTravels = async (req, res) => {
  try {
    const { order_by, limit, page } = req.query;
    const travels = await orderAndLimitTravels(order_by, limit, page);
    res.status(200).json({ travels: travels });
  } catch (error) {
    console.log("error", error);
    const errorFound = findError(error.code);
    return res
      .status(errorFound[0].status)
      .json({ error: errorFound[0].message });
  }
};

// usando mi paginador
const travelsWithPagination = async (req, res) => {
  try {
    const { items, page } = req.query;
    const travels = await getTravels();
    const paginationData = pagination(travels, items, page);
    res.status(200).json(paginationData);
  } catch (error) {
    console.log("error", error);
    const errorFound = findError(error.code);
    return res
      .status(errorFound[0].status)
      .json({ error: errorFound[0].message });
  }
};

// creando filtros dinamicos

const filterTravels = async (req, res) => {
  try {
    const { items, page, filters } = req.body;
    const travels = await travelsFilter(filters);
    const paginationData = pagination(travels, items, page);
    res.status(200).json(paginationData);
  } catch (error) {
    console.log("error", error);
  }
};

const getTravelsWithHateoas = async (req, res) => {
  try {
    const { items, page } = req.query;
    const travels = await getTravels();
    const travelsWithHateoas = await prepareHateoas("travels", travels, items, page);
    res.status(200).json({ travels: travelsWithHateoas });
  } catch (error) {
    console.log("error", error);
  }
};

const getTravelById = async (req, res) => {
  try {
    const { id } = req.params;
    const travel = await travelById(id);
    res.status(200).json({ travel: travel });
  } catch (error) {
    console.log("error", error);
  }
};

export {
  getAllTravels,
  createTravels,
  updateTravels,
  deleteTravels,
  getTravelsLimit,
  getOrderAndLimitTravels,
  travelsWithPagination,
  filterTravels,
  getTravelsWithHateoas,
  getTravelById,
};
