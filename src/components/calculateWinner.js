export function calculateWinner(squares) 
{
   const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
   ];

   // sets loop to lines so it can check each
   for (let i = 0; i < lines.length; i++) 
   {
      // kind sorta maping variables to the values in the array
      const [a, b, c] = lines[i];
      // checking squares[a] must be needed, perhaps it evaluates to true if not null? Not sure.
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) 
      {
         // return the keys of the winning squares
         return [a, b, c];
      }
   }
   return null;
}