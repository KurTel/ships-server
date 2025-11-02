
class Game {
  player_1 = null;
    player_2 = null;
    current_player = null;
    win = false;

    constructor(player_1, player_2) {
        this.player_1 = player_1;
        this.player_2 = player_2;
        this.current_player = this.player_1;
        this.setupGame();
        this.makeMove();
    }

     setupGame() {
        this.player_1.autoPlaceShipOnBoard();
        this.player_2.autoPlaceShipOnBoard();
        this.drawInConsole();
    }

    drawInConsole() {
        if(this.player_2.isComputer) {
            console.clear();
            console.log(`Поле для игрока ${this.player_1.name} \n
              Win: ${this.player_1.scoreWin} Lost: ${this.player_1.scoreLost}`);
            this.player_1.gameBoard.drawShipInConsole();
            this.player_2.gameBoard.drawBoardInConsole();
        } else {
            let player = this.current_player == this.player_1 ? this.player_2 : this.player_1;
            console.clear();
            console.log(`Поле для игрока ${this.current_player.name} \n
              Win: ${this.current_player.scoreWin} Lost: ${this.current_player.scoreLost}`);
            this.current_player.gameBoard.drawShipInConsole();
            player.gameBoard.drawBoardInConsole();
        }
    }

    getGameAgain() {
        let gameAgain = prompt('Начать новую игру?');
        if(gameAgain == 'да' || gameAgain == 'да') {
            this.player_1.gameBoard.updateBoard();
            this.player_2.gameBoard.updateBoard();
            this.setupGame();
            if(this.win) {
                this.current_player = this.player_1;
            }
            this.win = false;
            this.makeMove();
        }
    }

    makeMove() {
        let player = this.current_player == this.player_1 ? this.player_2 : this.player_1;

        if(this.current_player.isComputer) {
            let coordMakeShot = this.getComputerMoveHit(player.gameBoard);
            let result = player.gameBoard.getResultShot(coordMakeShot.row, coordMakeShot.col);
            this.drawInConsole();
            this.identifyShot(result);
        } else {
            setTimeout(() => {
                this.makeShotCoord(player);
            }, 550);
        }
    }

    makeShotCoord(player) {
        let playerHandCoord = prompt('Введите букву и число');
console.log(playerHandCoord);

        if(playerHandCoord == null || playerHandCoord == '') { 
            this.makeShotCoord(player); 
        }
        let coordsX = ['а', 'б', 'в', 'г', 'д', 'е', 'ж', 'з', 'и', 'к' ];
        let col = coordsX.indexOf(playerHandCoord[0].toLowerCase());
console.log(col);
        let row = playerHandCoord.length < 3 ? 
            Number(playerHandCoord[1]) - 1 : 
            Number(playerHandCoord[1] + playerHandCoord[2]) - 1;
console.log(row);
        let result = player.gameBoard.getResultShot(row, col);
        this.identifyShot(result);
        this.drawInConsole();
    }

   getComputerMoveHit(anotherBoard) {
        let hitsOnShip = anotherBoard.findHitsOnShip();
        let emptyCellForShot = [];

        if(hitsOnShip.length == 0) {
            let possibleEmptyCell = anotherBoard.getPossibleEmptyCell();
            let index = Math.floor(Math.random() * possibleEmptyCell.length);
            let result = { row: possibleEmptyCell[index].row, col: possibleEmptyCell[index].col }
            return result;
        }


        if(hitsOnShip.length == 1) {
            if(anotherBoard.isCanShotAtCell(hitsOnShip[0].row, hitsOnShip[0].col - 1)) {
                emptyCellForShot.push({ row: hitsOnShip[0].row, col: hitsOnShip[0].col - 1 })
            }
            if(anotherBoard.isCanShotAtCell(hitsOnShip[0].row, hitsOnShip[0].col + 1)) {
                emptyCellForShot.push({ row: hitsOnShip[0].row, col: hitsOnShip[0].col + 1 })
            }
            if(anotherBoard.isCanShotAtCell(hitsOnShip[0].row - 1, hitsOnShip[0].col)) {
                emptyCellForShot.push({ row: hitsOnShip[0].row - 1, col: hitsOnShip[0].col })
            }
            if(anotherBoard.isCanShotAtCell(hitsOnShip[0].row + 1, hitsOnShip[0].col)) {
                emptyCellForShot.push({ row: hitsOnShip[0].row + 1, col: hitsOnShip[0].col })
            }
        }

        if(hitsOnShip.length > 1 ) {    
            if(hitsOnShip[0].row == hitsOnShip[hitsOnShip.length - 1].row) {
                if(anotherBoard.isCanShotAtCell(hitsOnShip[0].row, hitsOnShip[0].col - 1)) {
                    emptyCellForShot.push({ row: hitsOnShip[0].row, col: hitsOnShip[0].col - 1 })
                }
                if(anotherBoard.isCanShotAtCell(hitsOnShip[hitsOnShip.length - 1].row, hitsOnShip[hitsOnShip.length - 1].col + 1)) {
                    emptyCellForShot.push({ row: hitsOnShip[hitsOnShip.length - 1].row, col: hitsOnShip[hitsOnShip.length - 1].col + 1 })
                }
            } else {
                if(anotherBoard.isCanShotAtCell(hitsOnShip[0].row - 1, hitsOnShip[0].col)) {
                    emptyCellForShot.push({ row: hitsOnShip[0].row - 1, col: hitsOnShip[0].col })
                }
                if(anotherBoard.isCanShotAtCell(hitsOnShip[hitsOnShip.length - 1].row + 1, hitsOnShip[hitsOnShip.length - 1].col)) {
                    emptyCellForShot.push({ row: hitsOnShip[hitsOnShip.length - 1].row + 1, col: hitsOnShip[hitsOnShip.length - 1].col })
                }
            }
        }

        if(emptyCellForShot.length > 0 ) {
            let index = Math.floor(Math.random() * emptyCellForShot.length);
            let result = { row: emptyCellForShot[index].row, col: emptyCellForShot[index].col }
            return result;
        }
    }
    identifyShot(result) {
        if(result.shot) {
            if(result.hit) {
                setTimeout(() => {
                    let player = this.current_player == this.player_1 ? 
                        this.player_2 : this.player_1;
                    if(player.gameBoard.isAllShipSank()) {
                        this.win = true;
                        this.current_player.scoreWin++;
                        this.drawWinInConsole();
                        this.getGameAgain();
                    } else {
                        this.makeMove();
                        this.drawInConsole();
                    }
                }, 1500);
            } else {
                setTimeout(() => {
                    this.current_player = this.current_player == this.player_1 ? 
                        this.player_2 : this.player_1;
                    this.makeMove();
                    if(this.player_2.isComputer) {
                        this.drawInConsole();
                    } else {
                        this.drawInConsole();
                        console.clear();
                        console.log('СМЕНА ИГРОКА');
                        setTimeout(() => {
                            this.drawInConsole();
                        }, 500);
                    }
                }, 1500);
            }
        } else {
            this.makeMove();
        }
    }

    drawWinInConsole() {
        console.clear();
        console.log(`Игрок ${this.current_player.name} - ПОБЕДИЛ`);
    }
}