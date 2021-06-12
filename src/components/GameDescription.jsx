import React from 'react';

export default function GameSelect(props) {

    return (
        <ul className="game-description">
            <li>Once you start typing, the game starts and you compete with the computer.</li>
            <li>The computer's progress is highlighted as blue, while you progress the green text.</li>
            <li>If you manage to beat it, you score will be displayed at the end.</li>
            <li>If you make a mistake, the green text will stop progressing and text wont be removed once you click space untill you correct it.</li>
        </ul>
    );
}