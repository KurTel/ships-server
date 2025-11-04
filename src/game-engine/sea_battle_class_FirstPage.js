import { Player } from "./sea_battle_class_Player.js";
import { Game } from "./sea_battle_class_Game.js";
import readlineSync from "readline-sync";

function main() {
    const game = new FirstPage();
}

class FirstPage {
    player_1 = null;
    player_2 = null;

    constructor() {
        this.chooseOpponent();
        this.beginGame();
    }

    chooseOpponent() {
        // let chooseText = prompt('Играть с человеком');
        let chooseText= readlineSync.question('Играть с человеком?: ')

        if(chooseText == '' || chooseText == 'да') {
            this.getNamePlayer_1();
            this.getNamePlayer_2();
        } else {
            this.getNamePlayer_1();
            this.player_2 = new Player('mr.Robot', true);
        }
    }

    getNamePlayer_1() {
        // let playerName = prompt('Введите имя первого игрока');
        let playerName= readlineSync.question('Введите имя первого игрока: ')

        if(playerName == null || playerName == "") {
            playerName = 'Игрок_1';
        }
        this.player_1 = new Player(playerName);
    }

    getNamePlayer_2() {
        // let playerName = prompt('Введите имя второго игрока');
        let playerName= readlineSync.question('Введите имя второго игрока: ')

        if(playerName == null || playerName == "") { 
            playerName = 'Игрок_2';
        }
        this.player_2 = new Player(playerName);
    }

    beginGame() {
        if(!this.player_1 || !this.player_2) { return }
        const game = new Game(this.player_1, this.player_2);
    }
}


main()