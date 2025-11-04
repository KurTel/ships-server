import { Router } from 'express'
import gemaConnector from '../../services/game/game-connector.js'

const router = Router();

router.get('/find', (req, res) => {
    const receivedData = req.body;
    console.log('Received POST data:', receivedData);
    const data = gemaConnector.find(req.userId, req.body?.name)
    res.json({ data } );
});

router.get('/check', (req, res) => {
    const data = gemaConnector.check(req.userId)
    res.json({ data } );
});

router.get('/stop', (req, res) => {
    gemaConnector.stop(req.userId)
    res.json({} );
});

export default router;