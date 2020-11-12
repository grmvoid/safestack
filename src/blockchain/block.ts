import { createHash } from 'crypto'

export default class Block {
    public id: number;
    public timestamp: string;
    public hash: string;
    public prevHash: string;
    public data: string;
    public nonce: number;

    constructor (id: number, timestamp: string, prevHash: string, data: string)
    {
        this.id = id;
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.data = data;
        this.nonce = 0;
        this.hash = this.computeHash()
    }

    static genesis (): Block {
        return new this(0, Date.now().toString(), "", "Genesis Block");
    }

    computeHash(): string {
        const hash = createHash('sha256')
        return hash.update(`${this.id}${this.timestamp}${this.prevHash}${this.data}${this.nonce}`).digest('hex');
    }
}

