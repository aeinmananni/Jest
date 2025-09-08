"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const blocks_routes_1 = __importDefault(require("../routes/blocks.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, compression_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/blocks", blocks_routes_1.default);
exports.default = app;
