import { BlockChaine } from "./script";

const blocks = BlockChaine<string>();
for (let i = 0; i <= 5; i++) {
  blocks.addBlock({ data: `Data ${i}` });
}

console.log(blocks.getChain());
