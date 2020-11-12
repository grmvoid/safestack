import express from 'express'
import routing from './routes'
import {  Miner } from '../blockchain'
import logger from '../logger'

export default class Api {
    private readonly miner: Miner
    private readonly app: express.Application

    constructor(miner: Miner) {
        this.miner = miner
        this.app = express()
    }

    start () {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))

        routing(this.miner, this.app)
        this.app.listen(8080)

        logger("Api initialized")
    }
}