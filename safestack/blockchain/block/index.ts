import { createHash } from "crypto";

export default class Block {
    public index: number;
    public timestamp: string;
    public hash: string;
    public previousHash: string;
    public nonce: number;
    public data: object;

    constructor(
        index: number,
        timestamp: string,
        previousHash: string,
        data: object
    ) {
        this.index = index;
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.data = data;
        this.nonce = 0;
        this.hash = this.computeHash();
    }

    computeHash(): string {
        const stringify = JSON.stringify(this.data);

        return createHash("sha256")
            .update(
                `${this.index}${this.timestamp}${this.previousHash}${this.nonce}${stringify}`
            )
            .digest("hex");
    }

    static genesis(): Block {
        return new Block(0, Date.now().toString(), "", {});
    }
}
