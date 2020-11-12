import fs from 'fs'
import Block from './block'
import Config from '../config'
import Logger from '../logger'

export default class Chain {
    private _chain: Array<Block> = [];
    private readonly _difficult: number;

    constructor (difficult: number) {
        this._difficult = difficult;
        this.loadData()
    }

    get chain (): Array<Block> {
        return this._chain
    }

    get difficult(): number {
        return this._difficult
    }

    init () {
        const genesis = Block.genesis()
        const block = this.getBlock(0)

        if (block.id === 0 && block.data === "Genesis Block" ) {
            return {message: 'Chain already initialized.'}
        }

        this.addBlock(genesis)
        return { message: 'Chain successful initialized.' }
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
        this.chain.forEach(async block => {
            const fullPath = `${Config.path}/${block.id}`

            fs.access(fullPath, fs.constants.F_OK, err => {
                if (err) {
                    fs.writeFile(`${Config.path}/${block.id}`, JSON.stringify(block), e => {
                        if (e) {
                            return Logger(`${e.message}`)
                        }
                    })
                }
            })
        })
    }

    loadData(): void {
        fs.readdir(Config.path, (e, files) => {
            if (e) return Logger(e.message)

            files.forEach(file => {
                const fullPath = `${Config.path}/${file}`

                fs.readFile(fullPath, 'utf-8', (err, data) => {
                    if (err) return Logger(err.message)

                    const block: Block = JSON.parse(data)
                    this.addBlock(block)
                })
            })
        })
    }
}