export class Board {
    grid = [];
    size = 10;
    ships = [];
    shipsIsSank = [];
    namePlayer = null;

    constructor(player) {
        this.namePlayer = player;
        this.createGrid();
    }

    updateBoard() {
        this.createGrid();
        this.ships = [];
        this.shipsIsSank = [];
    }

    createGrid() {
        for(let row = 0; row < this.size; row++) { //row строка
            this.grid[row] = [];
            for(let col = 0; col < this.size; col++) { //coll столбец
                this.grid[row][col] = {
                    hasShip: false,
                    hit: false
                };
            }
        }
    }

    drawBoardInConsole() {    
        let coordsX = ['а', 'б', 'в', 'г', 'д', 'е', 'ж', 'з', 'и', 'к' ];  
        let stroka= `${this.namePlayer}\n`;
        for (let row = -1; row < this.size; row++) {
            for (let col = -1; col < this.size; col++) {
                let cell = '___';
                if(row < 0 && col >= 0) {
                    cell = `_${coordsX[col]}_`
                }
                if(row >= 0  && col < 0) {
                    cell = `_${row+1}_`
                }
                if(row == this.size-1  && col < 0) {
                    cell = `${row+1}_`
                }
                if(row >=0 && col >= 0) {
                    if(this.grid[row][col].hit) {
                        cell = '_*_'
                    }
                    if(this.grid[row][col].hit && this.grid[row][col].hasShip) {
                        cell = '_X_'
                    }
                }
                stroka += cell;
                stroka += '|';
            }
            stroka += '\n'
        }
        console.log(stroka);
    }

    drawShipInConsole() {   
        let coordsX = ['а', 'б', 'в', 'г', 'д', 'е', 'ж', 'з', 'и', 'к' ];
        let stroka= `${this.namePlayer}\n`;
        for (let row = -1; row < this.size; row++) {
            for (let col = -1; col < this.size; col++) {
                let cell = '___';
                if(row < 0 && col >= 0) {
                    cell = `_${coordsX[col]}_`
                }
                if(row >= 0  && col < 0) {
                    cell = `_${row+1}_`
                }
                if(row == this.size-1  && col < 0) {
                    cell = `${row+1}_`
                }
                if(row >=0 && col >= 0) {
                    if(this.grid[row][col].hasShip) {
                        cell = '_0_'
                    }
                    if(this.grid[row][col].hit) {
                        cell = '_*_'
                    }
                    if(this.grid[row][col].hit && this.grid[row][col].hasShip) {
                        cell = '_X_'
                    }
                }
                stroka += cell;
                stroka += '|';

            }
            stroka += '\n'
        }
        console.log(stroka);
    }

   canPlaceBoard(ship, rowStart, colStart, isHorizontal) {
        if(isHorizontal) {
            if(colStart + ship.size >= this.size) { return false }
        } else {
            if(rowStart + ship.size >= this.size) { return false }
        }

        for(let i = 0; i < ship.size; i++) {
            let checkRow = isHorizontal ? rowStart : rowStart + i
            let checkCol = isHorizontal ? colStart + i : colStart

            for(let row = checkRow - 1; row <= checkRow + 1; row++) {
                for(let col = checkCol - 1; col <= checkCol + 1; col++) {
                    if(row >= 0 && row < this.size
                    && col >= 0 && col < this.size) {
                        if(this.grid[row][col].hasShip) {
                            return false;
                        }
                    }
                }   
            }
        }
        return true;
    }
    
    placeBoard(ship, rowStart, colStart, isHorizontal) {
        if(!this.canPlaceBoard(ship, rowStart, colStart, isHorizontal)) { return false }
        
        ship.placeShip(rowStart, colStart, isHorizontal);
        this.ships.push(ship);

        ship.positions.forEach(position => {
            this.grid[position.row][position.col].hasShip = true;
        })
        return true
    }           

    hitMissAroundSankShip(ship) {
        for(let i = 0; i < ship.size; i++) {
            for(let row = ship.positions[i].row - 1; row <= ship.positions[i].row + 1; row++) {
                for(let col = ship.positions[i].col - 1; col <= ship.positions[i].col + 1; col++) {
                    if(row >= 0 && row < this.size && col >= 0 && col < this.size) {
                        this.grid[row][col].hit = true;
                    }
                }
            }
        }
    }

    getResultShot(rowHit, colHit) {
        if(this.grid[rowHit][colHit].hit) { return { shot: false }; }
        
        this.grid[rowHit][colHit].hit = true;
        
        if(this.grid[rowHit][colHit].hasShip) {
            for(let i = 0; i < this.ships.length; i++) {
                if(this.ships[i].isHere(rowHit, colHit)) {
                    let isSank = false;
                    if(this.ships[i].isSank()) {
                        this.shipsIsSank.push(this.ships[i]);
                        this.hitMissAroundSankShip(this.ships[i]);
                        isSank = true;
                    }
                    return {
                        shot: true,
                        hit: true,
                        isSank: isSank
                    };
                }
            }
        }
        
        return {
            shot: true,
            hit: false
        };
    }

    isAllShipSank() {
        for(let i = 0; i < this.ships.length; i++) {    
            if(!this.ships[i].isShipSank) {
                return false;
            }
        }
        return true 
    }
    
    getPossibleEmptyCell() {
        let possibleEmptyCell = [];
        for(let row = 0; row < this.size; row++) {
            for(let col = 0; col < this.size; col++) {  
                if(!this.grid[row][col].hit) {
                    possibleEmptyCell.push({ row: row, col: col })
                }
            }
        }
        return possibleEmptyCell
    }

    findHitsOnShip() {
        let hitsOnShip = [];
        for(let row = 0; row < this.size; row++) {
            for(let col = 0; col < this.size; col++) {  
                if(this.grid[row][col].hit
                && this.grid[row][col].hasShip) {
                    for(let i = 0; i < this.ships.length; i++) {
                        if(this.ships[i].isHere(row, col)
                        && !this.ships[i].isShipSank) { 
                            hitsOnShip.push({ row: row, col: col })
                        }
                    }
                }
            }
        }
        return hitsOnShip
    }


    isCanShotAtCell(row, col) {
        return row >= 0 && row < this.size
        && col >= 0 && col < this.size
        && !this.grid[row][col].hit 
         
    }

}