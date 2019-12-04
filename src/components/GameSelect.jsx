import React from 'react';

export default function GameSelect(props) {

    const difficultyOptions = props.options;
    const options = difficultyOptions.map((opt, index) => <option key={index} value={opt}>{opt}</option>); 

    return (
        <select className="game-select" onChange={props.onChangeHandle}>
            {options}
        </select>
    );
}