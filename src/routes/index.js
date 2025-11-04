import { Router } from 'express'
import gameRoutes from './game.routes.js'

const router = Router();

router.use('/game', gameRoutes);

export default router;