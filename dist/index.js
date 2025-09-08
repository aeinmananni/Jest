"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
require("dotenv-safe/config");
const port = process.env.PORT || 3030;
app_1.default.listen(port, () => console.log(`Listening on Port : ${port}`));
