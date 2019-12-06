import React from 'react';
import GameButton from './GameButton';
import GameSelect from './GameSelect'

export default function GameControl(props) {


    return (
        <div className="game-control">
            <div className="game-control__item">
                <GameButton name="Reset" onButtonClick={props.onResetClicked}></GameButton>
            </div>

            <div className="game-control__item">
                <GameSelect onSelectChange={props.onDifficultyChange} options={props.options}></GameSelect>
            </div>
        </div>
    );
}