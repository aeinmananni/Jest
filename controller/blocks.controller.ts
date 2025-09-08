import { GetBlocks } from "../repositories/blocks.repositories";
import { asyncHandler } from "../utils/async-handler";
import { Request, Response } from "express";

export const handelGetBlocks = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await GetBlocks();

    res.status(200).json(result);
  }
);
