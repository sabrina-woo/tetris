var rowArray: string[][] = [];
var board: string[][];

function GameBoard() {

    function makeRow(rowNumber: number): string[] {
        let tileArray = [];
        for(let i = 1; i <= 10; i++) {
            let columnNumberString = i.toString();
            let rowNumberString = rowNumber.toString();
            tileArray[i] = columnNumberString.concat("x", rowNumberString, "  "); 
            
            if (i == 10) {
                tileArray[i] = columnNumberString.concat("x", rowNumberString, " \n");
                // tileArray[i] = i.toString().concat(" \n");
            }
        }
        return tileArray;
    }     
    
    function makeGrid(): string[][] {
            
        for(let i = 1; i <= 20; i++) {
               
                rowArray[i] = makeRow(i);
        }
        return rowArray;
    }

    function makeBoard(){
        board = makeGrid();
        board.map(board => <li>{board}</li>);
        return(<ol>{board}</ol>)
    }
    

    return ( 
        makeGrid()
     );

 
  }
  
  export default GameBoard;



