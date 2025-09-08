"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blocks_controller_1 = require("../controller/blocks.controller");
const router = (0, express_1.Router)();
router.get("/GET/All", blocks_controller_1.handelGetBlocks);
router.post("/POST/Add", blocks_controller_1.handelAddBlocks);
exports.default = router;
