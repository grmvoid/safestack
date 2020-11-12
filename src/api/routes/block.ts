import express, {Request, Response} from 'express'
import {Miner} from "../../blockchain";

export default (miner: Miner) => {
    const router = express.Router()

    router.post('/block', async(req: Request, res: Response) => {
        const data = JSON.stringify(req.body)
        const block = miner.mine(data)

        if (block === false) {
            return res.status(409).json({code: "409", message: "Invalid block"})
        }

        res.status(201).json(block)
    })

    router.get('/block/:id', async(req: Request, res: Response) => {
        const { id } = req.params
        const block = miner.getChain().getBlock(Number.parseInt(id))

        if (!block) {
            return res.status(404).json({"code": "404", message: `Block with id ${id} not found`})
        }

        res.status(200).json(block)
    })

    router.get('/block/:id/validate', async (req: Request, res:Response) => {
        const block = miner.getChain().getBlock(Number.parseInt(req.params.id))

        res.status(200).json({validate: miner.isBlockValid(block)})
    })

    return router
}