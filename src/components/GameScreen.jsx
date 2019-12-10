import React from 'react';
import GameSmartText from './GameSmartText';

export default function GameScreen(props) {
    return (
        <div className="game-screen">
            <GameSmartText text={props.text}
            playerWordPos={props.playerWordPos}
            playerPosInWord={props.playerPosInWord}
            computerWordPos={props.computerWordPos}
            computerPosInWord={props.computerPosInWord} />   
        </div>
    );
}