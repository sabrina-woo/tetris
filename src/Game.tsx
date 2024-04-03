import Board from './Board';

const lighBlue = [3, 4, 5, 6]; 
const yellow = [4, 5, 14, 15];  //good
const orange = [4, 14, 24, 25];
const darkBlue = [5, 15, 24, 25];//good
const green = [4, 14, 15, 25];      
const red = [5, 14, 15, 24]; //good
const purple = [4, 14, 15, 24]; //good 

const colours: string[] = ['None', 'LighBlue', 'Yellow', 'Orange', 'DarkBlue', 'Green', 'Red', 'Purple']
const pieces = [lighBlue, yellow, orange, darkBlue, green, red, purple];

var board: Tile[][] = makeGrid()

export interface Tile {
    id: string, 
    hasPiece: boolean
    colour: string
}

//returns an array of 10 tiles 
function makeRow(rowNumber: number): Tile[] {
    let tileArray = [];
    for(let i = 1; i <= 10; i++) {
        let tileID: string;
        let tile: Tile;
        let columnNumberString = i.toString();
        let rowNumberString = rowNumber.toString();

        tileID = columnNumberString.concat("x", rowNumberString, "  ");
        tile = {id: tileID, hasPiece: false, colour: colours[0]}
        tileArray[i] = tile; 
    }
    return tileArray;
}
    
//returns an array 
function makeGrid(): Tile[][] {
    var board = []
    for(let i = 1; i <= 20; i++) {
        board[i] = makeRow(i);
    }
    return board;
}

//returns a random number from 1-6 that corresponds with a random tetris piece
function getPiece(): number[] {
    var number = Math.round(Math.random() * 10);
    if (number >= 0 && number <= 6) {
        return pieces[number]    
    } else { 
        return getPiece();
    }
}

//takes in a board and a tetris piece, then returns the board with a random piece on it
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
        <div className='Board'>
            <Board board={board}/>
        </div>
     );
  }
   
  export default Game;