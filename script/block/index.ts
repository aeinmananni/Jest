import { BlockType } from "../../models";

export const block = <T>(v: Omit<BlockType<T>, "timeStamp">): BlockType<T> => {
  return {
    ...v,
    timeStamp: Date.now(),
  };
};
