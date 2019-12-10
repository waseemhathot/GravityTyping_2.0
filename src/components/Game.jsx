import React from 'react';
import GameControl from './GameControl';
import GameScreen from './GameScreen';
import GameInput from './GameInput';


export default class Game extends React.Component {

    // gameText = 'It is called JSX, and it is a syntax extension to JavaScript. We recommend using it with React to describe what the UI should look like. JSX may remind you of a template language, but it comes with the full power of JavaScript.';
    gameText = 'It is called JSX, and it is a syntax extension to JavaScript.';
    gameTextWords = this.gameText.split(' ');
    computerTypingInterval; //incase player won, we need to clear it.

    constructor(props) {
        super(props);
        this.state = {
            gameRunning: false,
            playerWonGame: false,
            difficultyOptions: ['Easy', 'Normal', 'Hard'],
            chosenDifficulty: 500,
            playerPosInWord: 0,
            playerWordPos: 0,
            currInput: '',
            computerPosInWord: 0,
            computerWordPos: 0,
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
                difficultyValue = 50;
                break;
            case 'Hard':
                difficultyValue = 10;
                break;
            default:
                difficultyValue = 100;
        }

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
            computerWonGame: true,
            playerWonGame: false,
        }); 
        console.log('computer won');  
    }

    playerWonGame() {
        this.setState({
            playerWonGame: true,
            computerWonGame: false,
        });
        console.log('i won');
    }

    updateStateForSpaceInput(e) {
        if (e.target.value === this.gameTextWords[this.state.playerWordPos] + ' ') {
            
            e.target.value = '';
            this.setState({
                playerPosInWord: 0,
                currInput: '',
                playerWordPos: this.state.playerWordPos + 1,
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
                        computerPosInWord={this.state.computerPosInWord} />
                    <GameInput onPlayerInput={this.onPlayerInput} />
                </div>
            </div>
        );
    }
}