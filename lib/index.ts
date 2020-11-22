import fs from 'fs'
import path from 'path'
import {Chain, Miner, Block} from './blockchain'
import config from './config'

export default class ChainDB {
    private _chain: Chain
    private _miner: Miner
    private _db: string

    constructor (db: string, difficulty: number) {
        try {
            fs.mkdirSync(`${config.path}/${db}`, {recursive: true})
        } catch (e) {
            if (e.code === 'EEXISTS') return
        }
        this._db = db
        this._chain = new Chain(db, difficulty)
        this._miner = new Miner(this._chain)
    }

    connect() {
        const p = path.normalize(`${config.path}/${this._db}/0`)
        try {
            fs.openSync(p, 'r')
            this._chain.loadBlocks()
        } catch (e) {
            if (e.code === 'ENOENT') this._chain.saveBlock(Block.genesis())
        }
    }

    find (key: string): Array<Block> {
        return this._chain.chain.filter(b => b.key === key)
    }

    findOne (key: string): Block {
        return this._chain.chain.filter(b => b.key === key)[0]
    }

    has (key: string): boolean {
        const has = this._chain.chain.filter(b => b.key === key)

        return has.length > 0
    }

    insert (key: string, value: string): Block {
        return this._miner.mine(key, value)
    }
}