import express from "express";
import {
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
} from "../../src/api/v1/controllers/travelsController.js";
import { isLogin } from "../../middlewares/isLogin.js";
const router = express.Router();


router.get("/travels", isLogin, getAllTravels);
router.post("/travels", createTravels);
router.put("/travels/:id", updateTravels);
router.delete("/travels/:id", deleteTravels);
router.get("/travels_with_limit", getTravelsLimit);
router.get("/travels_with_limit_and_order", getOrderAndLimitTravels);
router.get("/travels_with_pagination", travelsWithPagination);
router.get("/filter_travels", filterTravels);
router.get("/travels_with_hateoas", getTravelsWithHateoas);
router.get("/travels/:id", getTravelById);

export default router;
