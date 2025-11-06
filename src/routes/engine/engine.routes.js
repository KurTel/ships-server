import { Router } from 'express'
import gemaConnector from '../../services/game/game-connector.js'
import gamesController from '../../services/game/games-controller.js'

const router = Router();

router.post('/stop', (req, res) => {
    gamesController.stopByUserId(req.userId)
    res.json({});
});

export default router;