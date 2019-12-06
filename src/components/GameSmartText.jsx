import React from 'react';

export default function GameSmartText(props) {

    const coloredText = colorText(props.text, props.currWordPos, props.playerPosInWord);

    return (
        <div className="game-smart-text">{coloredText}</div>
    );
}


function colorText(text, wordIndex, posInWord) {

    const words = text.split(' ');
    const coloredText = words.map((word, index) => {

        let modifiedWord;
        if (wordIndex === index) {
            modifiedWord = <span>
                <span className="progress-color">{words[wordIndex].slice(0, posInWord)}</span>
                {words[wordIndex].slice(posInWord)}
            </span>
        } 
        else if (index < wordIndex) {
            modifiedWord = <span className="progress-color">{words[index]}</span>
        }
        else{
            modifiedWord = <span>{word}</span>
        }

        if(index === words.length - 1) {
            return <span key={index}>{modifiedWord}</span>
        }

        return <span key={index}>{modifiedWord}&nbsp;</span>
    });

    return coloredText;
}
