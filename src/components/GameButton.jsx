import React from 'react';

export default function GameButton(props) {

    return (
        <button className="game-button" type="button">{props.name}</button>
    );
}