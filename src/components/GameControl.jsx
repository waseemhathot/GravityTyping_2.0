import React from 'react';
import GameButton from './GameButton';
import GameSelect from './GameSelect'

export default class GameControl extends React.Component {

    difficultyOptions = ['Easy', 'Normal', 'Hard']

    render() {
        return (
            <div className="game-control">
                <div className="game-control__item">
                    <GameButton name="Reset"></GameButton>
                </div>

                <div className="game-control__item">
                    <GameSelect options={this.difficultyOptions}></GameSelect>
                </div>
            </div>
        );
    }
}