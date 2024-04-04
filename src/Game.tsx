import Board from './Board';


const lighBlue = [[0, 3], [0, 4], [0, 5], [0, 6]];
const yellow = [[0, 4], [0, 5], [1, 4], [1, 5]];          
const orange = [[0, 4], [1, 4], [2, 4], [2, 5]];
const darkBlue = [[0, 5], [1, 5], [2, 4], [2, 5]];   
const green = [[0, 4], [1, 4], [1, 5], [2, 5]];
const red = [[0, 5], [1, 4], [1, 5], [2, 4]];
const purple = [[0, 4], [1, 4], [1, 5], [2, 4]];

const colours: string[] = ['LighBlue', 'Yellow', 'Orange', 'DarkBlue', 'Green', 'Red', 'Purple', 'None']
const pieces = [lighBlue, yellow, orange, darkBlue, green, red, purple];

var board: Tile[][] = makeGrid() 

export interface Tile {
    id: string,           // tile's ID is their gridcoodinate
    hasPiece: boolean
    colour: string
}

//returns an array of 10 tiles 
function makeRow(rowNumber: number): Tile[] {
    let tileArray = [];
    for(let i = 0; i < 10; i++) {
        let tileID: string;
        let tile: Tile;
        let columnNumberString = i.toString();
        let rowNumberString = rowNumber.toString();

        tileID = columnNumberString.concat("x", rowNumberString, "  ");
        tile = {id: tileID, hasPiece: false, colour: colours[7]}
        tileArray[i] = tile; 
    }
    return tileArray;
}
    
//returns an array of 20 rows
function makeGrid(): Tile[][] {
    var board = []
    for(let i = 0; i < 20; i++) {
        board[i] = makeRow(i);
    }
    return board;
}

//returns a random number from 1-6
function getPieceNumber(): number {
    const randomNumber: number = Math.random();
    const randomInteger: number = Math.floor(randomNumber * 7);

    return randomInteger
}

//takes in a board then returns the board with a random piece deployed at the top it
function deployPiece(grid: Tile[][]): Tile[][] {

    let pieceNumber: number = getPieceNumber()
    let tetrisPiece: number[][] = pieces[pieceNumber]

    for (let i = 0; i < 4; i++) {
        
        let xCoordinate: number = tetrisPiece[i][0];
        let yCoordinate: number = tetrisPiece[i][1]; 
     
        let tile: Tile = grid[xCoordinate][yCoordinate]

 
        tile.hasPiece = true;
        tile.colour = colours[pieceNumber]

    }
    return grid;  
}

deployPiece(board)           
function Game() {

    
    return ( 
        <div className='Board'>
            <Board board={board}/>
        </div>
     );
  }
   
  export default Game;