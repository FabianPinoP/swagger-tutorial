import express from "express";
const router = express.Router();

import { allTravels } from "../../../src/api/v2/controllers/travels.controller.js";

router.get("/travels", allTravels);

export default router;
