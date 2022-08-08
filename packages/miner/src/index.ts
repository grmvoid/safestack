import { Block } from '@chaindb/block';
import logger from '@chaindb/logger';

export class Miner {
  private readonly _difficult: number;

  constructor(difficult: number) {
    this._difficult = difficult;
  }

  public mine(previousBlock: Block, txs: object): Block {
    const { index, hash: previousHash } = previousBlock;
    const block = new Block(index + 1, Date.now().toString(), previousHash, txs);

    do {
      block.nonce++;
      block.hash = block.computeHash();
    } while (block.hash.substring(0, this._difficult) != '0'.repeat(this._difficult));

    logger.info(`Block with hash: ${block.hash} was mining.`);

    return block;
  }
}
