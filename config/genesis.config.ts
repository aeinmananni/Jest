import { BlockType } from "../models";
import { block } from "../script/block";

const INITAIL_DIFFICULTY = 3;
export const MINE_RATE = 1000 //برابر با هزار میلی ثانیه و در واقع میخواهیم هر بیک ثانیه یک بار یک بلاک جدید به شبکه اضافه شود

export const GENESIS: BlockType<string> = block({
  lastHash: "Gen-lastHash",
  hash: "Gen-hash",
  difficulty: INITAIL_DIFFICULTY,
  nonce: 0,
  data: "Gen-data",
});
