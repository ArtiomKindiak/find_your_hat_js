const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
    constructor(array){
        this.field = array;
        this.indexForY = this._findStartPosition(pathCharacter)[0];
        this.indexForX = this._findStartPosition(pathCharacter)[1];
        this.state = true; 
    }
    // this method seeks for the starting position which contains pathCharacter;
    _findStartPosition(pathCharacter){
        let position = [];
        for(let arr of this.field){
            if(arr.indexOf(pathCharacter) !== -1){
                position = [this.field.indexOf(arr), arr.indexOf(pathCharacter)];
                return position
            }
        }
    }
    // prints the board for the game;
    printBoard(){
        for (let i = 0; i < this.field.length; i++){
            console.log(this.field[i].join(''));
        }
    }
    // checks the progress of the game and stops the game if user win, lose or out of the board;
    checkState(){
        if((this.field[this.indexForY][this.indexForX] === fieldCharacter) || 
        (this.field[this.indexForY][this.indexForX] === pathCharacter)){
        } else if (this.field[this.indexForY][this.indexForX] === hat){
            this.state = false;
            console.log('You won!');
        } else if(this.field[this.indexForY][this.indexForX] === hole){
            this.state = false;
            console.log('You lost');
        } else {
            this.state = false;
            console.log('You are out of the board!');
        }
    }
    // asks the user to make a move;
    move(userInput){
        if(userInput === 'u'){
            this.indexForY--;
            this.checkState()
            this.field[this.indexForY][this.indexForX] = pathCharacter;
        } else if(userInput === 'd'){
            this.indexForY++;
            this.checkState()
            this.field[this.indexForY][this.indexForX] = pathCharacter;
        } else if(userInput === 'r'){
            this.indexForX++;
            this.checkState()
            this.field[this.indexForY][this.indexForX] = pathCharacter;
        } else if(userInput === 'l'){
            this.indexForX--;
            this.checkState()
            this.field[this.indexForY][this.indexForX] = pathCharacter;
        } else {
            console.log('Invalid input! Use: U, D, L, R');
        }
    }
    // method to run the game using while loop;
    runGame(){
        this.printBoard();
        try{
            while (this.state){
                let userInput = prompt('Which way? ').toLowerCase();
                if(userInput === 'stop'){
                    this.state = false;
                } else {
                    this.move(userInput);
                    if (this.state){
                        console.clear();
                        this.printBoard();
                    }
                }
            }
        } catch(error){
            
        }
    }
    // static method to generate random gameboard;
    static generateField(height, width, percentage=40){
        const field = [];
        for (let y = 0; y < height; y++){
            field[y] = [];
            for (let x = 0; x < width; x++){
                field[y][x] = fieldCharacter;
            }
        }
        percentage = Math.round(height * width * percentage / 100)
        for (let p = 0; p < percentage; p++){
            field[Math.floor(Math.random() * height)][Math.floor(Math.random() * width)] = hole
        }
        field[Math.floor(Math.random() * (height - 1)) + 1][Math.floor(Math.random() * (width - 1)) + 1] = hat;
        field[0][0] = pathCharacter;
        return field;
    }
}

let testArray = [['*', '░', '░'],
                ['O', 'O', '░'],
                ['░', '░', '░'],
                ['░', 'O', 'O'],
                ['░', 'O', '░'],
                ['░', '░', '░'],
                ['░', 'O', '^'],];


let anotherArray = Field.generateField(5, 30, 60);
const game = new Field(testArray);
game.runGame()