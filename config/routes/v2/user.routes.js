import express from "express";
const router = express.Router();

import { create, by_id } from "../../../src/api/v2/controllers/users.controller.js";

router.post("/users", create);
router.get("/users/:id", by_id);

export default router;