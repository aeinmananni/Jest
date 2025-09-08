import { BlockType } from "../models";
import { BlockChaine } from "../script";
const blocks = BlockChaine();



export const GetBlocks = async (): Promise<BlockType[]> => {
  return blocks.getChain();
};

export const addBlocks = async <T>(data: T) => {
  await blocks.addBlock({ data });

  return true;
};