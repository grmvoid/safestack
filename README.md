# ChainVault

ChainVault is a database that saves data in files and memory. It is based on blockchain technology, so the data is immutable and any change in the data causes chain disturbances and data corruption. ChainVault provides only the SDK that we can implement in our project.

## Setup

Clone this repo to your desktop and run npm install to install all the dependencies.

## Example

```
    import ChainVault from 'chainvault'

    const db = new ChainVault('db', 4)
    db.initialize()

    const blocks = db.find();
    console.log(blocks);
```

## ToDo

- [] Setup ESLint / Prettier
- [] Prepare CI for Yarn Workspaces (Monorepo)
- [] Make better docs / JSDocs
- [] P2P Network
- [] Implement Consensus algorithm
- [] Make Unit Tests for all packages

## API Reference

    ChainVault(dbName: string, difficult: number): ChainVault

Constructor for ChainVault class.

    initialize(): void

Initializes connection to database.

    find(): Array<Block>

Returns all blocks from chain

    findOne(index: number): Block

Return one block by specified index from chain

    insert(data: object): Block

Saves the new block and returns it.

    validate(): boolean

Check validates of chain.

## License

ChainVault is licensed under the MIT - see the [LICENSE](LICENSE) file for details.
