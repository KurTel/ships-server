import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import cookieParser from 'cookie-parser';
import { authMiddleware } from "./middlewares/auth.middleware.js";

const app = express();

let secret = 'qwerty';
app.use(cookieParser(secret));
app.use(cors({
    origin: function(origin, callback) {
        // Разрешаем запросы без origin (например, из Postman)
        if (!origin) return callback(null, true);

        const allowedOrigins = [
            'index.html',
        ];

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json());

app.use(authMiddleware);
app.use('/', routes);

export default app;