import Block from './block'
import Chain from './chain'
import Logger from '../logger'

export default class Miner {
    private readonly chain: Chain;

    constructor(chain: Chain) {
        this.chain = chain
    }

    getChain(): Chain {
        return this.chain
    }

    mine(data: string) {
        const block = this.generateNewBlock(data)

        if (!this.isBlockValid(block)) {
            Logger(`Block is invalid`)

            return false
        }
        Logger(`Mining new block#${block.id} with hash: ${block.hash}`)
        this.chain.addBlock(block)

        return block
    }

    validate(): boolean {
        const chain = this.chain.chain
        let index = 1

        if (chain[0].hash === Block.genesis().hash) return true
        while (index <= chain.length) {
            console.log(index)

            let block = this.chain.getBlock(index)
            if (!this.isBlockValid(block)) return false

            index++
        }
        return true
    }


    private isBlockValid(block: Block): boolean {
        const prevBlock = this.chain.chain[block.id - 1]
        const { hash } = block;
        block.computeHash()

        if (block.id - 1 !== prevBlock.id) return false
        if (block.prevHash !== prevBlock.hash) return false

        return block.hash === hash;
    }
    private generateNewBlock(data: string): Block {
        const { id, hash: prevHash } = this.chain.getLastBlock()
        const timestamp = Date.now().toString()
        const block = new Block(id + 1, timestamp, prevHash, data)

        do {
            block.nonce++
            block.hash = block.computeHash()
        } while (block.hash.substring(0, this.chain.difficult) != '0'.repeat(this.chain.difficult))

        return block
    }
}