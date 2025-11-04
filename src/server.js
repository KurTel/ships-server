import app from './app.js';
// import { config } from './config/index.js';

// const PORT = config.port || 3000;
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});