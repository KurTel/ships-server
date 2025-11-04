import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import cookieParser from 'cookie-parser';
import { authMiddleware } from "./middlewares/auth.middleware.js";

const app = express();

let secret = 'qwerty';
app.use(cookieParser(secret));
app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(express.json());

app.use(authMiddleware);
app.use('/', routes);

export default app;