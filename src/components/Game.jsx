import React from 'react';

import GameDescription from './GameDescription'
import GameControl from './GameControl';
import GameScreen from './GameScreen';
import GameInput from './GameInput';
import moment from 'moment';


export default class Game extends React.Component {

    gameText = 'It is called JSX, and it is a syntax extension to JavaScript. We recommend using it with React to describe what the UI should look like. JSX may remind you of a template language, but it comes with the full power of JavaScript.';
    gameTextWords = this.gameText.split(' ');
    computerTypingInterval; //in case player won, we need to clear it.
    gameStartingTime = moment();
    secondsInMin = 60;

    constructor(props) {
        super(props);
        this.state = {
            gameRunning: false,
            gameOver: false,
            playerWon: false,
            difficultyOptions: ['Easy', 'Normal', 'Hard'],
            chosenDifficulty: 400,
            playerPosInWord: 0,
            playerWordPos: 0,
            currInput: '',
            computerPosInWord: 0,
            computerWordPos: 0,
            wpm: 0,
        }

        this.onResetClickedHandle = this.onResetClickedHandle.bind(this);
        this.onDifficultyChange = this.onDifficultyChange.bind(this);
        this.onPlayerInput = this.onPlayerInput.bind(this);
    }

    onResetClickedHandle() {
        this.endGame();
        this.setState({
            gameOver: false,
            playerWon: false,
        })
    }

    onDifficultyChange(e) {
        let difficultyValue = 0;
        switch (e.target.value) {
            case 'Normal':
                this.onResetClickedHandle();
                difficultyValue = 200;
                break;
            case 'Hard':
                this.onResetClickedHandle();
                difficultyValue = 150;
                break;
            default:
                this.onResetClickedHandle()
                difficultyValue = 300;
        };

        this.setState({
            chosenDifficulty: difficultyValue,
        });
    }

    onPlayerInput(e) {
        if (!this.state.gameRunning) {
            this.startGame();
        }

        const keyCode = e.target.value.charCodeAt(e.target.value.length - 1);
        keyCode === 32 ? this.updateStateForSpaceInput(e) : this.updateStateForInput(e);
    }

    startGame() {
        this.setState({
            gameRunning: true,
        });
        this.startComputerTypingInterval();
        this.gameStartingTime = moment();
    }

    startComputerTypingInterval() {

        this.computerTypingInterval = setInterval(() => {

            if (this.state.computerPosInWord ===
                this.gameTextWords[this.state.computerWordPos].length) {

                if (this.state.computerWordPos === this.gameTextWords.length - 1) {
                    this.endGame();
                    this.computerWonGame();
                }
                else {
                    this.setState({
                        computerWordPos: this.state.computerWordPos + 1,
                        computerPosInWord: 0,
                    });
                }
            }
            else {
                this.setState({
                    computerPosInWord: this.state.computerPosInWord + 1,
                });
            }
        }, this.state.chosenDifficulty);
    }

    endGame() {
        clearInterval(this.computerTypingInterval);
        this.setState({
            gameRunning: false,
            playerPosInWord: 0,
            playerWordPos: 0,
            computerPosInWord: 0,
            computerWordPos: 0,
        })
    }

    computerWonGame() {
        this.setState({
            gameOver: true,
        });
    }

    playerWonGame() {
        this.setState({
            gameOver: true,
            playerWon: true,
        });
    }

    updateStateForSpaceInput(e) {
        if (e.target.value === this.gameTextWords[this.state.playerWordPos] + ' ') {

            const timePassedInSeconds = moment().diff(this.gameStartingTime, 'seconds');

            e.target.value = '';
            this.setState({
                playerPosInWord: 0,
                currInput: '',
                playerWordPos: this.state.playerWordPos + 1,
                wpm: Math.round((this.state.playerWordPos + 2) / (timePassedInSeconds / this.secondsInMin)),
            });
        }
    }

    updateStateForInput(e) { //for input that is a space

        const wordAtCurrIndex = this.gameTextWords[this.state.playerWordPos].slice(0, this.state.playerPosInWord + 1);
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

                const lastWordIndex = this.gameTextWords.length - 1;
                const lastCharInWordIndex = this.gameTextWords[this.state.playerWordPos].length - 1;
                if (this.state.playerWordPos === lastWordIndex && this.state.playerPosInWord === lastCharInWordIndex) {
                    e.target.value = '';
                    this.endGame();
                    this.playerWonGame();
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
                        playerWordPos={this.state.playerWordPos}
                        playerPosInWord={this.state.playerPosInWord}
                        computerWordPos={this.state.computerWordPos}
                        computerPosInWord={this.state.computerPosInWord}
                        gameOver={this.state.gameOver}
                        playerWon={this.state.playerWon}
                        wpm={this.state.wpm}
                    />

                    <GameInput onPlayerInput={this.onPlayerInput} />

                    <GameDescription></GameDescription>

                </div>
            </div>
        );
    }
}