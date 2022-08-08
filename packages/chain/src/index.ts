import path from "path";
import { readdirSync, openSync, readFileSync } from "fs";
import { writeFile } from "fs/promises";

import logger from "@chaindb/logger";
import { Config } from "@chaindb/config";
import { Block } from "@chaindb/block";

export class Chain {
  private readonly _chain: Array<Block> = [];
  private readonly _name: string;
  private readonly _path: string;
  private readonly _difficult: number;

  constructor(name: string, difficult: number = 4) {
    this._name = name;
    this._difficult = difficult;
    this._path = path.normalize(`${Config.Path.data}/${this._name}`);
  }

  public difficult(): number {
    return this._difficult;
  }

  public chain(): Array<Block> {
    return this._chain;
  }

  public getBlock(index: number): Block {
    return this._chain[index];
  }

  public getLastBlock(): Block {
    return this._chain[this._chain.length - 1];
  }

  public saveBlock(block: Block): void {
    this._chain.push(block);

    writeFile(
      path.normalize(`${this._path}/${block.index}`),
      JSON.stringify(block)
    ).catch((error) => logger.error(error));
  }

  public validateChain(): boolean {
    let id = 1;

    if (this.chain.length > 1) {
      while (id <= this._chain.length) {
        let block = this._chain[id];
        let prevBlock = this._chain[id - 1];

        const { hash } = block;
        block.computeHash();

        if (block.index - 1 !== prevBlock.index) return false;
        if (block.previousHash !== block.hash) return false;
        if (block.hash !== hash) return false;

        id++;
      }
    }

    return true;
  }

  public loadBlocks(): void {
    try {
      const files = readdirSync(this._path, "utf-8");

      files.forEach((file) => {
        try {
          const fd = openSync(path.normalize(`${this._path}/${file}`), "r");
          const data = readFileSync(fd, "utf-8");

          this._chain.push(JSON.parse(data));
        } catch (exception) {
          logger.emerg(exception);
          throw exception;
        }
      });
    } catch (error) {
      logger.emerg(error);
    }
  }
}
