
const lighBlue = [3, 4, 5, 6]; 
const yellow = [4, 5, 14, 15];  //good
const orange = [4, 14, 24, 25];
const darkBlue = [5, 15, 24, 25];//good
const green = [4, 14, 15, 25];      
const red = [5, 14, 15, 24]; //good
const purple = [4, 14, 15, 24]; //good          
var rowArray: string[][] = [];


const pieces = [lighBlue, yellow, orange, darkBlue, green, red, purple];

function makeRow(): string[] {
    let tileArray = [];
    for( let i = 0; i < 10; i++) {
        tileArray[i] = "⬚"; 
        
        if (i == 9) {
            tileArray[i] = "⬚ \n";
        }
    }
    return tileArray;
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

function makeGrid(): string[][] {
        
    for(let i = 0; i < 20; i++) {
           
            rowArray[i] = makeRow();
    }
    return rowArray;
}

function GameBoard() {
    let tetrisPiece = getPiece();
 
    return ( 
        <menu className="Board">
            <h1>  
                <center>
                   {deployPiece(makeGrid(), tetrisPiece)}
                   {tetrisPiece}    
                </center>
            </h1>
        </menu>
     );
  }
  
  export default GameBoard;


