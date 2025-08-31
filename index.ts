import { BlockChaine } from "./script";

const blocks = BlockChaine<string>();
for (let i = 0; i <= 5; i++) {
  blocks.addBlock({ data: `Data ${i}` });
}

console.log("Is validate Request!", blocks.isValidChain(blocks.getChain()));
console.log(blocks.getChain());
