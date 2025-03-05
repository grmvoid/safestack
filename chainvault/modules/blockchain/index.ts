import { BlockChain, Block } from '../../blockchain';

const chain = new BlockChain('test', 4);
chain.saveBlock(Block.genesis());

export default chain;
