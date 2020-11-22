# ChainDB ![ChainDB](https://github.com/FFx0q/ChainDB/workflows/ChainDB/badge.svg)
ChainDB is a database that saves data in files and memory. It is based on blockchain technology, so the data is immutable and any change in the data causes chain disturbances and data corruption. ChainDB provides only the SDK that we can implement in our project. 

## Setup
Clone this repo to your desktop and run npm install to install all the dependencies.

## API Reference

    connect(): void
Initializes connection to database.

    find(key: string): Array<Block>
Returns specfied blocks by key in chain.

    findOne(key: string): Block
Returns specified block in chain.

    has(key: string): Block
Check if exists specfied block in chain.

    insert(key: string, value: string): Block
Saves the new block and returns it.

## License
ChainDB is licensed under the MIT - see the [LICENSE](LICENSE) file for details.
