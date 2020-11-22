import { createHash } from 'crypto'

class BlockHeader {
    public id: number
    public timestamp: string;
    public hash: string;
    public prevHash: string;
    public nonce: number;

    constructor (id: number, prevHash: string) {
        this.id = id
        this.timestamp = Date.now().toString()
        this.prevHash = prevHash
        this.nonce = 0
    }
}

export default class Block extends BlockHeader {
    public key: string
    public data: string

    constructor (id: number, prevHash: string, key: string, data: string) {
        super(id, prevHash)

        this.key = key
        this.data = data

        this.hash = this.computeHash()
    }

    static genesis(): Block {
        return new this(0, "", "genesis", "Genesis Block")
    }

    computeHash(): string {
        const {id, timestamp, prevHash, hash, nonce, key ,data} = this
        return createHash('sha256').update(`${id}${timestamp}${prevHash}${hash}${nonce}${key}${data}`).digest('hex');
    }
}

