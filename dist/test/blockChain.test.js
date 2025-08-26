"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genesis_config_1 = require("../config/genesis.config");
const script_1 = require("../script");
describe('BlockChaine', () => {
    const blocks = (0, script_1.BlockChaine)();
    blocks.addBlock({ data: `my First Data` });
    // انتظار داریم خروجی تابع بلاکچین از نوع ارایه باشه
    it('Contains a `Chain` Array Instance', () => {
        expect(blocks.getChain() instanceof Array).toBe(true);
    });
    //انتظار داریم اولین عنصر ارایه با جنسیس بلاک برابر باشه
    it('starts with the genesis block', () => {
        expect(blocks.getChain()[0]).toEqual(genesis_config_1.GENESIS);
    });
});
