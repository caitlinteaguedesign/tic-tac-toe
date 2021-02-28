export function getBoardStatus(squares) 
{
	for (var i in squares) 
	{
		if(squares[i] == null) 
		{ 
			// once return is called the function will stop
			return false;
		}
	}
	// won't go through unless no square in the for returns "null"
	return true;
}