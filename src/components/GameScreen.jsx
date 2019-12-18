import React from 'react';
import GameSmartText from './GameSmartText';

export default function GameScreen(props) {

    const gameSmartText = <GameSmartText text={props.text}
        playerWordPos={props.playerWordPos}
        playerPosInWord={props.playerPosInWord}
        computerWordPos={props.computerWordPos}
        computerPosInWord={props.computerPosInWord} />;

    const playerLostText = `Game Over, Try again. Fail again. Fail better!`;
    const playerWonText = `You have won the game, with WPM: ${props.wpm}`
    const GameOverText = props.playerWon ? playerWonText : playerLostText;

    return (
        <div className="game-screen">
            {props.gameOver ? GameOverText : gameSmartText}
        </div>
    );
}