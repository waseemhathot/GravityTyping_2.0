import React from 'react';
import GameSmartText from './GameSmartText';

export default function GameScreen(props) {
    return (
        <div className="game-screen">
            <GameSmartText text={props.text}
            currWordPos={props.currWordPos}
            playerPosInWord={props.playerPosInWord}
            cmpPos={props.cmpPos} />   
        </div>
    );
}