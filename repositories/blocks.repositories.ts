import { BlockType } from "../models";
import { CHANNELS } from "../redisController/channels";
import { publisher } from "../redisController/redis";
import { BlockChaine } from "../script";
const blocks = BlockChaine();

export const GetBlocks = async (): Promise<BlockType[]> => {
  return blocks.getChain();
};

export const addBlocks = async <T>(data: T) => {
  publisher.publish(CHANNELS.BLOCK, JSON.stringify(data));
  await blocks.addBlock({ data });

  return true;
};