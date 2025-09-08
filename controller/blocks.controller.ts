import { addBlocks, GetBlocks } from "../repositories/blocks.repositories";
import { asyncHandler } from "../utils/async-handler";
import { Request, Response } from "express";

export const handelGetBlocks = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await GetBlocks();

    res.status(200).json(result);
  }
);

export const handelAddBlocks = asyncHandler(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await addBlocks(data);

    res.status(200).send(result);
  }
);
