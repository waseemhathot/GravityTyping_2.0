import React from 'react';
import GameSmartText from './GameSmartText';

export default function GameScreen(props) {
    return (
        <div className="game-screen">
            <GameSmartText text={props.text}
            playerPos={props.playerPos}
            cmpPos={props.cmpPos} />   
        </div>
    );
}