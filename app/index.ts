import express from "express";
import compression from "compression";
import cors from "cors";
import BLOCKS from "../routes/blocks.routes";
const app = express();

app.use(express.json());
app.use(compression());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/api/blocks", BLOCKS);
export default app;
