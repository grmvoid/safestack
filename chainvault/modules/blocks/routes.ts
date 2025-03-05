import { Router } from 'express';
import { Miner } from '../../blockchain';
import blockchain from '../blockchain';

const router = Router();

router.get('/', async (req, res) => {
  res.json(blockchain.chain());
});

router.post('/', async (req, res) => {
  const { block } = req.body;

  if (block) {
    const miner = new Miner(4);

    const pBlock = blockchain.getLastBlock();
    const nBlock = miner.mine(pBlock, req.body.block);

    blockchain.saveBlock(nBlock);

    res.json({ message: `Block was mining with hash: ${nBlock.hash}` });

    return res.end();
  }

  res.json({ status: 'Missing `block` property.' });
});

export default router;
