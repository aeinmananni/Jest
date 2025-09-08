import { BlockType } from "../models";
import { BlockChaine } from "../script";
const blocks = BlockChaine();
export const GetBlocks = async (): Promise<BlockType[]> => {
  return blocks.getChain();
};
