import { Router } from "express";
import {
  handelAddBlocks,
  handelGetBlocks,
} from "../controller/blocks.controller";
const router = Router();

router.get("/GET/All", handelGetBlocks);
router.post("/POST/Add", handelAddBlocks);

export default router;
