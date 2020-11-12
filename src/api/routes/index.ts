import { Application } from 'express'
import { Miner } from '../../blockchain'
import block from './block'
import chain from './chain'


export default (miner: Miner, app: Application) => {
    app.use(block(miner))
    app.use(chain(miner))
}