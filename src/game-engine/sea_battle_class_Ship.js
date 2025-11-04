export class Ship {
    size = null;
    hits = 0;
    isShipSank = false;
    positions = [];

    constructor(size) {
        this.size = size;
    }

    placeShip(rowStart, colStart, isHorizontal) { 
        this.positions = [];
        for(let i = 0; i < this.size; i++) {
            if(isHorizontal) {
                this.positions.push({
                    row: rowStart,
                    col: colStart + i
                });
            } else {
                this.positions.push({
                    row: rowStart + i,
                    col: colStart
                });
            }
        }
    }

    isSank() {
        this.hits++;
        if(this.hits == this.size) {
            this.isShipSank = true;
        } else {
            this.isShipSank = false;
        }
        return this.isShipSank;
    }

    isHere(row, col) {
        for(let i = 0; i < this.positions.length; i++) {
            if(this.positions[i].row == row
            && this.positions[i].col == col) {
                return true;
            }
        }
        return false;
    }
}