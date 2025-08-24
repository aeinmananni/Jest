export type BlockType<T> = {
  timeStamp: number;
  lastHash: string;
  hash: string;
  data: T;
};
