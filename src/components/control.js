import React from 'react';

export function Control(props) 
{
	return (
		<button className="game-buttons controls" onClick={props.onClick}>
			{props.label}
		</button>
	);
}