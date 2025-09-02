export type BlockType<T> = {
  timeStamp: number;
  lastHash: string;
  hash: string;
  difficulty: number;
  nonce: number;
  data: T;
};
