import { Application, Request, Response } from "express";
import { Miner }  from "../blockchain";

export default (app: Application, miner: Miner) => {
    app.get('/chain', async (req: Request, res: Response) => {
        res.json(miner.getChain()).status(200)
    })

    app.post('/add', async(req: Request, res: Response) => {
        const data = JSON.stringify(req.body)
        const block = miner.mine(data)

        if (block === false) {
            return res.status(409).json({code: "409", message: "Invalid block"})
        }

        res.status(201).json(block)
    })

    app.get('/block/:id', async(req: Request, res: Response) => {
        const { id } = req.params
        const block = miner.getChain().getBlock(Number.parseInt(id))

        if (!block) {
            return res.status(404).json({"code": "404", message: `Block with id ${id} not found`})
        }

        res.status(200).json(block)
    })

    app.get('/validate', async(req: Request, res: Response) => {
        const result = miner.validate()

        res.status(200).json({code: "200", validate: result})
    })
}