import Block from './block'
import fs from 'fs'

export default class Chain {
    private _chain: Array<Block> = [];
    private readonly _difficult: number;

    constructor (difficult: number) {
        this._difficult = difficult;
        this.addBlock(Block.genesis())
    }

    get chain (): Array<Block> {
        return this._chain
    }

    get difficult(): number {
        return this._difficult
    }

    addBlock (block: Block) {
        this._chain.push(block)
    }

    getLastBlock(): Block {
        return this._chain[this._chain.length - 1]
    }

    getBlock(id: number): Block {
        return this._chain[id]
    }

    saveData(): void {

    }
}