import { blockchainInstance } from "../instance";
import { BlockType } from "../models";
import { CHANNELS } from "../redisController/channels";
import { publisher } from "../redisController/redis";
import { BlockChaine } from "../script";

export const GetBlocks = async (): Promise<BlockType[]> => {
  return blockchainInstance.getChain();
};

export const addBlocks = async <T>(data: T) => {
  await blockchainInstance.addBlock({ data });

  await publisher.publish(
    CHANNELS.BLOCK,
    JSON.stringify(blockchainInstance.getChain())
  );

  return true;
};
