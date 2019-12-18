import React from 'react';
import ReactHtmlParser from 'react-html-parser';

export default function GameSmartText(props) {

    const coloredText = colorText(props.text, props.playerWordPos, props.playerPosInWord,
        props.computerWordPos, props.computerPosInWord);
    
    return (
        <div className="game-smart-text">{ReactHtmlParser(coloredText)}</div>
    );
}


function colorText(text, playerWordPos, playerPosInWord, computerWordPos, computerPosInWord) {

    const words = text.split(' ');
    let coloredText = '<span><span class="progress-color">';
    for(let i = 0; i < words.length; i++) {

        const currWord = words[i];
        if (i === playerWordPos && i !== computerWordPos) {
            coloredText += `${currWord.slice(0,playerPosInWord)}</span>${currWord.slice(playerPosInWord)}`;
        }
        else if (i !== playerWordPos && i === computerWordPos) {
            coloredText += `<span class="cmp-progress-color">${currWord.slice(0,computerPosInWord)}`
            + `</span>${currWord.slice(computerPosInWord)}`;
        }
        else if (i === playerWordPos && i === computerWordPos) { 
            if (playerPosInWord > computerPosInWord) {
                coloredText += `<span class="cmp-progress-color">${currWord.slice(0,computerPosInWord)}</span>`
                + `${currWord.slice(computerPosInWord, playerPosInWord)}</span>`
                + currWord.slice(playerPosInWord);
            }
            else if(playerPosInWord < computerPosInWord) {
                coloredText += `${currWord.slice(0,playerPosInWord)}</span>`
                + `<span class="cmp-progress-color">${currWord.slice(playerPosInWord, computerPosInWord )}</span>`
                + currWord.slice(computerPosInWord);
            }
            else {
                coloredText += '<span class="cmp-progress-color">'
                + `${currWord.slice(0,computerPosInWord)}</span></span>`
                + `${currWord.slice(computerPosInWord)}`;
            }
        }
        else {
            coloredText += currWord;
        }

        i === words.length - 1 ? coloredText += '' : coloredText += ' ';
    }
    
    coloredText += '</span>';
    return coloredText;
}
