import express from 'express'
import handler from './handler'
import {  Miner } from '../blockchain'

export default async (miner: Miner) => {
    const app = express()

    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))

    await handler(app, miner)

    app.listen(8080)
}