import Board from './Board';
interface Tile {
    xCoordinate: number
    yCoordinate: number
    hasPiece: boolean
    colour: string
}

interface Piece {
    coordinateOne: number[]
    coordinateTwo: number[]
    coordinateThree: number[]
    coordinateFour: number[]
    colour: string
}

const lighBlue: Piece = {coordinateOne: [0, 3], coordinateTwo: [0, 4], coordinateThree: [0, 5], coordinateFour: [0, 6], colour: 'LighBlue'}
const yellow: Piece = {coordinateOne: [0, 4], coordinateTwo: [0, 5], coordinateThree: [1, 4], coordinateFour: [1, 5], colour: 'Yellow'}
const orange: Piece = {coordinateOne: [0, 5], coordinateTwo: [1, 3], coordinateThree: [1, 4], coordinateFour: [1, 5], colour: 'Orange'}
const darkBlue: Piece = {coordinateOne: [0, 3], coordinateTwo: [1, 3], coordinateThree: [1, 4], coordinateFour: [1, 5], colour: 'DarkBlue'}
const green: Piece = {coordinateOne: [0, 4], coordinateTwo: [0, 5], coordinateThree: [1, 3], coordinateFour: [1, 4], colour: 'Green'}
const red: Piece = {coordinateOne: [0, 3], coordinateTwo: [0, 4], coordinateThree: [1, 4], coordinateFour: [1, 5], colour: 'Red'}
const purple: Piece = {coordinateOne: [0, 4], coordinateTwo: [1, 3], coordinateThree: [1, 4], coordinateFour: [1, 5], colour: 'Purple'}

const pieces: Piece[] = [lighBlue, yellow, orange, darkBlue, green, red, purple];


//returns an array of 10 tiles 
function makeRow(rowNumber: number): Tile[] {
    let tileArray = [];
    for(let i = 0; i < 10; i++) {
  
        let tile: Tile;
        let columnNumber = i;

        tile = {xCoordinate: columnNumber, yCoordinate: rowNumber, hasPiece: false, colour: "None"}
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

//returns a random number from 0-6
function getPieceNumber(): number {
    const randomNumber: number = Math.random();
    const randomInteger: number = Math.floor(randomNumber * 7);

    return randomInteger
}

//takes in a board then returns the board with a random piece deployed at the top
function deployPiece(grid: Tile[][]): Tile[][] {

    let pieceNumber: number = getPieceNumber()
    let tetrisPiece: Piece = pieces[pieceNumber]

    let coordinateOne: number[] = tetrisPiece.coordinateOne;
    let tile: Tile = grid[coordinateOne[0]][coordinateOne[1]]
    tile.hasPiece = true;
    tile.colour = tetrisPiece.colour
    
    let coordinateTwo: number[] = tetrisPiece.coordinateTwo;
    tile = grid[coordinateTwo[0]][coordinateTwo[1]]
    tile.hasPiece = true;
    tile.colour = tetrisPiece.colour

    let coordinateThree: number[] = tetrisPiece.coordinateThree;
    tile = grid[coordinateThree[0]][coordinateThree[1]]
    tile.hasPiece = true;
    tile.colour = tetrisPiece.colour

    let coordinateFour: number[] = tetrisPiece.coordinateFour;
    tile = grid[coordinateFour[0]][coordinateFour[1]]
    tile.hasPiece = true;
    tile.colour = tetrisPiece.colour

    return grid;  
}

// deployPiece(board)           
function Game() {
    var board: Tile[][] = makeGrid() 
    deployPiece(board)

    let gameBoard = board.map((row) => (
        <li className = 'Row'>
            {row.map((tile) => (
            <li className = {row[row.indexOf(tile)].colour}></li>
            ))}
            </li>
    ))
    
    return ( 
        <div className='Board'>
            {/* <Board board={board}/> */}
            {gameBoard}
        </div>
     );
  }
   
  export default Game;