import Block from '../block';
import { logger } from '../../utils';

export default class Miner {
  private readonly _difficult: number;

  constructor(difficult: number) {
    this._difficult = difficult;
  }

  public mine(previousBlock: Block, data: object): Block {
    const { index, hash: previousHash } = previousBlock;
    const block = new Block(index + 1, Date.now().toString(), previousHash, data);

    do {
      block.nonce++;
      block.hash = block.computeHash();
    } while (block.hash.substring(0, this._difficult) !== '0'.repeat(this._difficult));

    logger.info(`Block with hash: ${block.hash} was mining.`);

    return block;
  }
}
