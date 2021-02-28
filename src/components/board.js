import React from 'react';

// visual components
import {Square} from './square';

export class Board extends React.Component 
{
   renderSquare(i) 
   {
      let winner = "";

      // check if there were winning cells
      if(this.props.winningCells) 
      {
         // pull the keys that were winners
         const [a,b,c] = this.props.winningCells;
         // check if this cell is anyone of the winners
         if(a === i || b === i || c === i) winner = " winner";
      }

      return (
         <Square 
            className={"square square"+i+winner}
            value={this.props.squares[i]} 
            onClick={() => this.props.onClick(i)}
         />
      );
   }

   createGrid() 
   {
      // counter for keeping track of what square we're on
      let squareCount = 0;

      // array for parent (grid rows)
      let rows = [];

      // loop the rows (3/grid)
      for (let i = 0; i < 3; i++) 
      {
         // array for children (grid squares)
         let squares = [];

         // inner loop for squares (3/row)
         for (let j = 0; j < 3; j++)
         {
            // add square to row; requires parent JSX element, or use a Fragment to avoid adding unnecessary elements to the DOM
            squares.push(<React.Fragment key={squareCount}>{this.renderSquare(squareCount)}</React.Fragment>);
            squareCount++;
         }

         // push row with child squares to parent array
         rows.push(<div key={i} className="board-row">{squares}</div>)
      }

      return rows;
   }

   render() 
   {
      return (
         <div>
            {this.createGrid()}
         </div>
      );
   }
}