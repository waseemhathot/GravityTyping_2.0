import React from 'react';

export default function GameInput(props) {
    return (
        <div className="game-input">
            <input className="game-input__input" type="text" autoCapitalize="none" onInput={props.onPlayerInput} />
        </div>
    );
}