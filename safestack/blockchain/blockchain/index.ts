import { default as Block } from "../block";

export default class BlockChain {
    private readonly _chain: Array<Block> = [];
    private readonly _name: string;
    private readonly _difficult: number;

    constructor(name: string, difficult: number = 4) {
        this._name = name;
        this._difficult = difficult;
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
        //TODO
    }
}
