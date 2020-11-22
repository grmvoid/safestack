import Block from './block'
import Chain from './chain'
import Logger from '../logger'

export default class Miner {
    private readonly _chain: Chain;

    constructor(chain: Chain) {
        this._chain = chain
    }

    get chain(): Chain {
        return this._chain
    }

    mine(key: string, value: string) {
        const { id, hash: prevHash } = this._chain.getLastBlock()
        const block = new Block(id + 1, prevHash, key, value) 

        do {
            block.nonce++
            block.hash = block.computeHash()
        } while (block.hash.substring(0, this._chain.difficult) != '0'.repeat(this._chain.difficult))
        
        Logger(`Block with hash: ${block.hash} was mining.`)
        this._chain.saveBlock(block)
        
        return block
    }

}