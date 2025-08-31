"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const script_1 = require("./script");
const blocks = (0, script_1.BlockChaine)();
for (let i = 0; i <= 5; i++) {
    blocks.addBlock({ data: `Data ${i}` });
}
console.log("Is validate Request!", blocks.isValidChain(blocks.getChain()));
console.log(blocks.getChain());
