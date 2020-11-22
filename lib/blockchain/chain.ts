import fs from 'fs'
import path from 'path'
import Block from './block'
import Config from '../config'
import Logger from '../logger'

export default class Chain {
    private readonly _chain: Array<Block> = []
    private readonly _difficult: number
    private readonly _name: string
    private readonly _path: string

    constructor (name: string, difficult: number) {
        this._difficult = difficult
        this._name = name
        this._path = path.normalize(`${Config.path}/${this._name}`)
    }

    get difficult(): number {
        return this._difficult
    }

    get chain(): Array<Block> {
        return this._chain
    }

    getLastBlock(): Block {
        return this._chain[this._chain.length - 1]
    }

    validateChain (): boolean {
        let id = 1;

        if (this.chain.length > 1) {
            while ( id <= this._chain.length ) {
                let block = this._chain[id]
                let prevBlock = this.chain[id - 1]

                const {hash} = block
                block.computeHash()

                if (block.id - 1 !== prevBlock.id) return false
                if (block.prevHash !== block.hash) return false
                if (block.hash !== hash) return false

                id++;
            } 
        }

        return this._chain[0].id === Block.genesis().id && this._chain[0].data === Block.genesis().data
    }

    saveBlock (block: Block): void {
        this._chain.push(block)

        try {
            fs.writeFileSync(path.normalize(`${this._path}/${block.id}`), JSON.stringify(block))
        }
        catch (e) {
            Logger(e.message)
        }
    }

    loadBlocks(): void {
        try {
            const files = fs.readdirSync(this._path, 'utf-8')

            files.forEach(file => {
                try {
                    const fd = fs.openSync(path.normalize(`${this._path}/${file}`) , 'r')
                    const data = fs.readFileSync(fd, 'utf-8')

                    this._chain.push(JSON.parse(data.toString()))
                } catch (e) {
                    Logger(e.message)
                }

            })
        } catch (e) {
            Logger(e.message)
        }
    }
}