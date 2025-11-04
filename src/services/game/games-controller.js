import { v4 } from "uuid";
import { Game } from "./game.js";

class GamesController {
    games = new Map()

    startGame(players) {
        const game = new Game(players)
        this.games.set(game.gameId, game)
    }

    getGameIdByUser(userId) {
        for (const [_, game] of this.games) {
            const hasPlayer = game.players.some((player) => player.userId === userId)

            if (hasPlayer) {
                return game.gameId
            }
        }

        return null
    }

    stopByUserId(userId) {
        const gameId = this.getGameIdByUser(userId)
        this.stop(gameId)
    }

    stop(gameId) {
        this.games.has(gameId) && this.games.delete(gameId)
        console.error('gameId ', gameId, ' stopped')
    }
}

const gamesController = new GamesController()

export default gamesController