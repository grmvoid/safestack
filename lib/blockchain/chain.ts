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