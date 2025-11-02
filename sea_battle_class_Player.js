import { Board } from "./sea_battle_class_Board.js";
import { Ship } from "./sea_battle_class_Ship.js";

export class Player {
    name = '';
    isComputer = false;
    scoreWin = 0;
    scoreLost = 0;

    constructor(name, isComputer = false) {
        this.name = name;
        this.isComputer = isComputer;
        this.gameBoard = new Board(this.name);
    }

    scoreGame(player) {
        this.scoreWin++;
        player.scoreLost++;
    }

    autoPlaceShipOnBoard() {
        let shipsToGame = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

        for(let i = 0; i < shipsToGame.length; i++) {
            let size = shipsToGame[i];
            let placed = false;

            while(!placed) {
                let ship = new Ship(size);
                let row = Math.floor(Math.random() * 10);
                let col = Math.floor(Math.random() * 10);
                let isHorizontal = Math.random() > 0.4;
                
                if(this.gameBoard.placeBoard(ship, row, col, isHorizontal)) {
                    placed = true;
                }
            }
        }
    }

    manualPlaceShipOnBoard() {
        if(this.isComputer) { return; }
    }
}