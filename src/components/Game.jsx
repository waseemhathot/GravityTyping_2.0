import React from 'react';
import GameControl from './GameControl';
import GameScreen from './GameScreen';
import GameInput from './GameInput';


export default class Game extends React.Component {

    gameText = 'Hi I am waseem'
    gameTextWords = this.gameText.split(' ');

    constructor(props) {
        super(props);
        this.state = {
            gameRunning: false,
            difficultyOptions: ['Easy', 'Normal', 'Hard'],
            chosenDifficulty: 0.25,
            playerPosInWord: 0,
            currWordPos: 0,
            currInput: '',
        }

        this.onResetClickedHandle = this.onResetClickedHandle.bind(this);
        this.onDifficultyChange = this.onDifficultyChange.bind(this);
        this.onPlayerInput = this.onPlayerInput.bind(this);
    }

    onResetClickedHandle() {
        this.setState({
            gameRunning: false,
        })
    }

    onDifficultyChange(e) {
        let difficultyValue = 0;
        switch (e.target.value) {
            case 'Normal':
                difficultyValue = 0.5;
                break;
            case 'Hard':
                difficultyValue = 1;
                break;
            default:
                difficultyValue = 0.25;
        }

        this.setState({
            chosenDifficulty: difficultyValue,
        });
    }

    onPlayerInput(e) {

        const keyCode = e.target.value.charCodeAt(e.target.value.length - 1);
        if (keyCode === 32) {

            if (e.target.value === this.gameTextWords[this.state.currWordPos] + ' ') {
                e.target.value = '';
                this.setState({
                    playerPosInWord: 0,
                    currInput: '',
                    currWordPos: this.state.currWordPos + 1,
                });

                if (this.state.currWordPos === this.gameTextWords.length - 1) {
                    this.setState({
                        playerPosInWord: 0,
                        currInput: '',
                        currWordPos: 0,
                    })
                }

            }
        }
        else {
            const wordAtCurrIndex = this.gameTextWords[this.state.currWordPos].slice(0, this.state.playerPosInWord + 1);
            const newInput = e.target.value;

            if (newInput.length < this.state.playerPosInWord) {
                this.setState({
                    playerPosInWord: newInput.length,
                    currInput: newInput,
                });
            }
            else {
                if (newInput === wordAtCurrIndex) {
                    this.setState({
                        playerPosInWord: this.state.playerPosInWord + 1,
                        currInput: newInput,
                    });
                }
            }
        }
    }

    render() {
        return (
            <div className="game">
                <div className="game__control game__item">
                    <GameControl options={this.state.difficultyOptions}
                        onResetClicked={this.onResetClickedHandle}
                        onDifficultyChange={this.onDifficultyChange} />
                </div>

                <div className="game__display game__item">
                    <GameScreen text={this.gameText}
                        currWordPos={this.state.currWordPos}
                        playerPosInWord={this.state.playerPosInWord} />
                    <GameInput onPlayerInput={this.onPlayerInput} />
                </div>
            </div>
        );
    }
}