import GameBoard from './Board';

const lighBlue = [3, 4, 5, 6]; 
const yellow = [4, 5, 14, 15];  //good
const orange = [4, 14, 24, 25];
const darkBlue = [5, 15, 24, 25];//good
const green = [4, 14, 15, 25];      
const red = [5, 14, 15, 24]; //good
const purple = [4, 14, 15, 24]; //good 

const pieces = [lighBlue, yellow, orange, darkBlue, green, red, purple];


class TetrisGame {
    public board: string[][];
    public piece: number[];

    public constructor() {
        this.board = GameBoard();
        this.piece = getPiece();
    }

}

function getPiece(): number[] {
    var number = Math.round(Math.random() * 10);
    if (number >= 0 && number <= 6) {
        return pieces[number]
    } else { 
        return getPiece();
    }
}

function deployPiece(grid: string[][], tetrisPiece: number[]): string[][] {
    for (let i = 0; i < 4; i++) {
        let xCoordinate = tetrisPiece[i]%10;
        let yCoordinate = (tetrisPiece[i]-tetrisPiece[i]%10)/10; 
        grid[yCoordinate][xCoordinate] = "O";
    }
    return grid; 
}

function Game() {
    return ( 
        <menu className="Game">
            <h2>
                <center>
                {GameBoard()}
                </center>
            </h2>
        </menu>
     );
  }
   
  export default Game;