import React from 'react';
import GameControl from './GameControl';
import GameCanvas from './GameCanvas';
import GameInput from './GameInput';

export default class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="game">
                <div className="game__control game__item">
                    <GameControl></GameControl>
                </div>

                <div className="game__display game__item">
                    <GameCanvas></GameCanvas>
                    <GameInput></GameInput>
                </div>

            </div>
        );
    }
}