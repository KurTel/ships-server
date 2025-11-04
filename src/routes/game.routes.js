import { Router } from 'express'
import connectorRoutes from './connector/connector.routes.js'
import engineRoutes from './engine/engine.routes.js'

const router = Router();

router.use('/connector', connectorRoutes);
router.use('/engine', engineRoutes);

export default router;