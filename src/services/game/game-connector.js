import { v4 } from 'uuid';
import gamesController from "./games-controller.js";

const waitingUsersMap = new Map();

export const GameConnectorResponse = {
    'AlreadyWait': 'AlreadyWait',
    'Wait': 'Wait',
    'NoWait': 'NoWait'
}

class GameConnector {
    constructor() {
        setInterval(() => {
            this.userConnector()
        }, 2000)
    }

    userConnector() {
        if (waitingUsersMap.size > 1) {
            let players = {}
            for (const [userId, state] of waitingUsersMap) {
                if (!state?.gameId) {
                    players[userId] = state
                }

                if (Object.keys(players).length > 1) {
                    gamesController.startGame(players)

                    for (const userId of Object.keys(players)) {
                        waitingUsersMap.delete(userId)
                    }

                    players = {}
                }
            }
        }
    }

    find(userId, name) {
        const gameId = gamesController.getGameIdByUser(userId)
        if (gameId) {
            return { state: { gameId, userId } }
        }

        !waitingUsersMap.has(userId) && waitingUsersMap.set(userId, { userId, name })

        return { state: { userId, name }}
    }

    check(userId) {
        console.error({waitingUsersMap})
        const gameId = gamesController.getGameIdByUser(userId)
        if (gameId) {
            return { state: { gameId, userId } }
        }

        const userState = waitingUsersMap.get(userId)
        if (userState) {
            return { state: userState }
        }

        return { state: {} }
    }

    stop(userId) {
        const hasUserId = waitingUsersMap.has(userId)
        if (hasUserId) {
            waitingUsersMap.delete(userId)
            return { state: 'ok' }
        }

        return { state: 'error', message: 'Not waiting' }
    }
}

const gemaConnector = new GameConnector()

export default gemaConnector