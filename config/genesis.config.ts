import { BlockType } from "../models";
import { block } from "../script/block";

const INITAIL_DIFFICULTY = 3;

export const GENESIS: BlockType<string> = block({
  lastHash: "Gen-lastHash",
  hash: "Gen-hash",
  difficulty: INITAIL_DIFFICULTY,
  nonce: 0,
  data: "Gen-data",
});
