import React from 'react';

// visual components
import {Control}  from './control';
import {Board}    from './board';
import {Timer}    from './timer';

// logic
import {calculateWinner} from './calculateWinner';
import {getBoardStatus} from './getBoardStatus';

export class Game extends React.Component 
{
   constructor(props) 
   {
      super(props);

      this.state = 
      {
         history: [{
            squares: Array(9).fill(null)
         }],
         stepNumber: 0,
         xIsNext: true
      }
   }

   handleClick(i) 
   {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];

      // .slice() makes a new copy of the array
      const squares = current.squares.slice();

      // if winner or square is not null, do not change square
      if (calculateWinner(squares) || squares[i]) 
      {
         return;
      }

      // add current player's mark to value of square
      squares[i] = this.state.xIsNext ? 'X' : 'O';

      this.setState({
         // add new slice to history
         history: history.concat([{
            squares: squares,
         }]),
         // update stepNumber
         stepNumber: history.length,
         // toggle player
         xIsNext: !this.state.xIsNext
      });
   }

   jumpTo(step) 
   {
      this.setState({
         stepNumber: step,
         // if we divide the current step by an even number like 2, 
         // odd steps will return false and even will return true, 
         // aligning with "player x" and "player o" respectively
         xIsNext: (step % 2) === 0
      });
   }

   restart() 
   {
      // basically match constructor setup
      this.setState({
         history: [{
            squares: Array(9).fill(null)
         }],
         stepNumber: 0,
         xIsNext: true
      });
   }

   undo() 
   {
      // the previous step
      const prevStep = this.state.stepNumber - 1;

      // check that prevStep isn't before the start of the game
      if(prevStep > -1) 
      {
         this.setState({
            stepNumber: prevStep,
            xIsNext: !this.state.xIsNext // reverse toggle so on the same user
         }); 
      }
   }  

   redo() 
   {
      // get the history
      const history = this.state.history;
      // how many moves have there been?
      const totalMoves = history.length - 1;
      // current stepNumber
      const thisStep = this.state.stepNumber;

      // only do if current step isn't the latest move
      if(totalMoves !== thisStep) {
         this.setState({
            stepNumber: thisStep + 1,
            xIsNext: !this.state.xIsNext // reverse toggle so on the same user
         }); 
      }
   }

   render() 
   {
      // get the current board
      const history = this.state.history;
      const current = history[this.state.stepNumber];

      // check if there's a winner or if the board is full
      const winner = calculateWinner(current.squares);
      const isBoardFull = getBoardStatus(current.squares);

      // check who's the next player
      const player = this.state.xIsNext ? '1' : '2';

      // generate the move list
      const moves = history.map((step, move) => 
      {
         // figures out the button label (no move = game start)
         const desc = move ?
            'Go to move #' + move :
            'Go to game start';

         // added to skip "game start"
         if (move > 0)
         {
            let current = "";

            // check if move is equal to the current step (presumably is the selected button)
            if (move === this.state.stepNumber) {
               current = " current";
            }

            return (
               <li key={move}>
                  <button className={"game-buttons move"+current} onClick={() => this.jumpTo(move)}>{desc}</button>
               </li>
            );
         }
         // not really necessary but removes a warning but returning a value
         else return null;
      });

      // update status message
      let status;

      if (winner) {
         // pull a winning key out of the calculateWinner result
         const cell = winner[0];
         // use one winning cell to find the winner's identity
         const winnerName = current.squares[cell] === "X" ?
         "1" : "2";
         // update status
         status = 'Congratulations Player ' + winnerName + '!';
      } 
      else if (isBoardFull){
         // the board is full but there's no winner - we have a tie!
         status = 'Darn, no one won. Try again?';
      }
      else {
         // the game is not over yet
         status = 'Your move Player ' + player;
      }

      return (    
         <div className="game">

            <div className="game-controls game-section">
               
               <Timer />

               <Control label="New Game" onClick={() => this.restart()} />
               
               <div className="control-divider"></div>

               <Control label="Undo Move" onClick={() => this.undo()}/>
               <Control label="Redo Move" onClick={() => this.redo()} />
            </div>

            <div>
               <div className="game-status game-section">
                  <p className='status'>{status}</p>
               </div>

               <div className="game-board game-section">
                  <Board 
                     winningCells = {winner}
                     squares = {current.squares}
                     onClick={(i) => this.handleClick(i)}
                  />
               </div>
            </div>

            <div className="game-history game-section">
               <div className="section-label">MOVE HISTORY</div>
               <ul className="move-list">{moves}</ul>
            </div>

         </div>
      );
   }
}