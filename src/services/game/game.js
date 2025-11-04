import { v4 } from 'uuid'

export class Game {
    gameId = v4()
    players = []

    constructor(players) {
        console.error({players})
        this.players = Object.values(players)
    }
}