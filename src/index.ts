import {existsSync, mkdirSync} from 'fs'
import { Chain, Miner } from './blockchain'
import Logger from './logger'
import Api from './api'
import Config from './config'

if (!existsSync(Config.path)) mkdirSync(Config.path)

const chain = new Chain(2)
Logger("Chain initialized")

const miner = new Miner(chain)
Logger("Miner initialized")

const api = new Api(miner)
api.start()

setInterval(() => miner.getChain().saveData(), 10000)