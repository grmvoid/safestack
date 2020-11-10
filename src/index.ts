import { Chain, Miner } from './blockchain'
import logger from './logger'
import api from './api'

const chain = new Chain(2)
logger("Chain initialized")

const miner = new Miner(chain)
logger("Miner initialized")

api(miner).then(() => logger("Api initialized"))
