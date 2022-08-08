# ChainDB ![ChainDB](https://github.com/macotsuu/ChainDB/workflows/ChainDB/badge.svg)

ChainDB is a database that saves data in files and memory. It is based on blockchain technology, so the data is immutable and any change in the data causes chain disturbances and data corruption. ChainDB provides only the SDK that we can implement in our project.

## Setup

Clone this repo to your desktop and run npm install to install all the dependencies.

## Example

```
    import ChainDB from 'chaindb'

    const db = new ChainDB('db', 4)
    db.initialize()

    const blocks = db.find();
    console.log(blocks);
```

## API Reference

    ChainDB(dbName: string, difficult: number): ChainDB

Constructor for ChainDB class.

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

ChainDB is licensed under the MIT - see the [LICENSE](LICENSE) file for details.
