import React from 'react';
import ReactHtmlParser from 'react-html-parser';

export default function GameSmartText(props) {

    const coloredText = colorText(props.text, props.currWordPos, props.playerPosInWord);
    
    return (
        <div className="game-smart-text">{ReactHtmlParser(coloredText)}</div>
    );
}


function colorText(text, wordIndex, posInWord) {

    const words = text.split(' ');

    let coloredText = '<span><span class="progress-color">';
    words.map((word, index) => {

        if (wordIndex === index) {
            coloredText += words[wordIndex].slice(0, posInWord) + '</span>' + words[wordIndex].slice(posInWord);
           
        } else{
            coloredText += word;
        }

        if(index !== words.length - 1) {
            coloredText += ' ';
        } else {
            coloredText +='</span>';
        }

        return word;
    });

    return coloredText;
}
