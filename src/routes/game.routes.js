import { Router } from 'express'
import connectorRoutes from './connector/connector.routes.js'

const router = Router();

router.use('/connector', connectorRoutes);

export default router;