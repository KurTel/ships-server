import { v4 } from 'uuid';

/**
 * Middleware для анонимной идентификации пользователей.
 * Проверяет cookie userId, если нет — создаёт новую.
 */
export const authMiddleware = (req, res, next) => {
    console.error('req.method = ', req.method)
    if (req.method === 'OPTIONS') {
        // ⚡ Пропускаем preflight без проверки авторизации
        return next();
    }
    // Проверяем, есть ли уже userId
    let userId = req.cookies?.userId;

    if (!userId) {
        // Генерируем уникальный id
        userId = v4();


        // FIXME настроить правильно!!!
        // Устанавливаем cookie с этим id
        res.cookie('userId', userId, {
            httpOnly: true, // Нельзя прочитать из JS (безопасно)
            // secure: false,  // true, если HTTPS (на проде)
            // sameSite: 'none', // защита от CSRF
            maxAge: 1000 * 60 * 60 * 24 * 30 // 30 дней
        });

        console.log('Новый пользователь, выдан userId:', userId);
    }

    // Сохраняем userId в req, чтобы использовать в других местах
    req.userId = userId;

    next();
};