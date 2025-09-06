import { BlockType } from "../../models";

export const block = (v: Omit<BlockType, "timeStamp">): BlockType => {
  return {
    ...v,
    timeStamp: Date.now(),
  };
};
