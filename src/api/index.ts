import express from 'express'
import {  Miner } from '../blockchain'
import logger from '../logger'
import config from '../config'
import routing from './routes'

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
        this.app.listen(config.port)

        logger("Api initialized")
    }
}