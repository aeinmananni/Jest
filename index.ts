import { BlockChaine } from "./script";
// import { Avrage_function } from "./script/avrageWork";
const blocks1 = BlockChaine();
for (let i = 0; i <= 5; i++) {
  blocks1.addBlock({ data: `Data ${i}` });
}
const blocks2 = BlockChaine();
for (let i = 0; i <= 15; i++) {
  blocks2.addBlock({ data: `Data ${i}` });
}

console.log("Is validate Request!", blocks1.isValidChain(blocks1.getChain()));
blocks1.isChainReplaceMent(blocks2.getChain());

console.log("Chain-replacements : ", blocks1.getChain());

// Avrage_function();