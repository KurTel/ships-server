import { Router } from 'express'
import gameRoutes from './game.routes.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = Router();

router.use('/game', gameRoutes);

export default router;