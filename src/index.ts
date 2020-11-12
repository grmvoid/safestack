import { Chain, Miner } from './blockchain'
import logger from './logger'
import Api from './api'

const chain = new Chain(2)
logger("Chain initialized")

const miner = new Miner(chain)
logger("Miner initialized")

const api = new Api(miner)
api.start()
