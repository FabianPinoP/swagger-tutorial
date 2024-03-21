import express from "express";
const router = express.Router();

import { create } from "../../../src/api/v2/controllers/tags.controller.js";

router.post("/tags", create);

export default router;