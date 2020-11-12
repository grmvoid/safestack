# ChainDB ![ChainDB](https://github.com/FFx0q/ChainDB/workflows/ChainDB/badge.svg)
A database based on blockchain technology.

## Features
* REST Api
* Proof of Work Algorithm
* Validate the chain and blocks
* Storage blocks in files

## API Endpoints
    GET /chain
Get all blocks from chain.

    GET /chain/init
Initialize a database.

    GET /chain/validate
Check validity of chain.

    POST /block
Add a new block to chain. All data a stored as string.
    
    GET /block/:id
Get block by id.

    GET /block/:id/validate
Checking the correctness of the block with the given id

## Setup
Clone this repo to your desktop and run npm install to install all the dependencies.

## Usage
Once the dependencies are installed, you can run npm start to start the application. You will then be able to access it at localhost:8080

## License
ChainDB is licensed under the MIT - see the [LICENSE](LICENSE) file for details.
