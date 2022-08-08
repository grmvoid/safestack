import { mkdirSync, openSync } from "fs";
import { normalize } from "path";
import { Block } from "@chaindb/block";
import { Chain } from "@chaindb/chain";
import { Miner } from "@chaindb/miner";
import { Config } from "@chaindb/config";

export class ChainDB {
  private _chain: Chain;
  private _miner: Miner;
  private _database: string;

  constructor(database: string, difficulty: number) {
    this._chain = new Chain(database, difficulty);
    this._miner = new Miner(difficulty);
    this._database = database;

    try {
      mkdirSync(`${Config.Path.data}/${database}`, { recursive: true });
    } catch (error: any) {
      if (error.code === "EEXISTS") {
        return;
      }
    }
  }

  initialize() {
    const p = normalize(`${Config.Path.data}/${this._database}/0`);

    try {
      openSync(p, "r");
      this._chain.loadBlocks();
    } catch (error: any) {
      if (error.code === "ENOENT") {
        this._chain.saveBlock(Block.genesis());
      }
    }
  }

  find() {
    return this._chain.chain;
  }

  findOne(index: number) {
    return this._chain.getBlock(index);
  }

  insert(data: object): Block {
    const previousBlock = this._chain.getLastBlock();
    const block = this._miner.mine(previousBlock, data);

    this._chain.saveBlock(block);

    return block;
  }

  validate(): boolean {
    return this._chain.validateChain();
  }
}
