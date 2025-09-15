import { blockchainInstance } from "../instance";
import { BlockType } from "../models";
import { CHANNELS } from "../redisController/channels";
import { publisher } from "../redisController/redis";

export const GetBlocks = async (): Promise<BlockType[]> => {
  return blockchainInstance.getChain();
};

export const addBlocks = async <T>(data: T) => {
  const newBlock = blockchainInstance.addBlock({ data });

  await publisher.publish(CHANNELS.BLOCK, JSON.stringify(newBlock));

  return true;
};
