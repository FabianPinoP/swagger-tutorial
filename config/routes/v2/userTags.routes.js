import express from "express";
const router = express.Router();

import { create } from "../../../src/api/v2/controllers/userTags.controller.js";

router.post("/user_tags", create);


export default router;