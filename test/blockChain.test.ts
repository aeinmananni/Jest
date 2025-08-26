import { GENESIS } from '../config/genesis.config';
import { BlockChaine } from '../script';

describe('BlockChaine', () => {
  const blocks = BlockChaine<string>();
  blocks.addBlock({ data: `my First Data` });

  // انتظار داریم خروجی تابع بلاکچین از نوع ارایه باشه
  it('Contains a `Chain` Array Instance', () => {
    expect(blocks.getChain() instanceof Array).toBe(true);
  });

  //انتظار داریم اولین عنصر ارایه با جنسیس بلاک برابر باشه
  it('starts with the genesis block', () => {
    expect(blocks.getChain()[0]).toEqual(GENESIS);
  });
});
