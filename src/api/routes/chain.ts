import express, {Request, Response} from 'express'
import {Miner} from "../../blockchain";

export default (miner: Miner) => {
    const router = express.Router()

    router.get('/chain', async (req: Request, res: Response) => {
        res.json(miner.getChain()).status(200)
    })
    router.get('/chain/validate', async(req: Request, res: Response) => {
        res.json({ validate: miner.isChainValid()}).status(200)
    })

    return router
}