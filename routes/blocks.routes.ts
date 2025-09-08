import { Router } from "express";
import { handelGetBlocks } from "../controller/blocks.controller";
const router = Router();

router.get("/GET/All", handelGetBlocks);

export default router;
