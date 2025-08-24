import { BlockType } from "../models";
import { block } from "../script/block";

export const GENESIS: BlockType<string> = block({
  lastHash: "Gen-lastHash",
  hash: "Gen-hash",
  data: "Gen-data",
});
