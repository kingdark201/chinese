import React from 'react'
import './style.scss'
import {onReadHanzi} from '../utils/core';

function CardExample({ hanzi, hanziExp, pinyinExp, meanExp, closeBtn }) {
    return (
        <div className='card_example'>
            <div className='animate__animated animate__bounceIn'>
                <h1 className='hanzi_example'>{hanzi}</h1>
                <button className='close_btn' onClick={closeBtn}><i className="bi bi-x-circle-fill"></i></button>
                <button className='read_hanziexp' onClick={() => onReadHanzi(hanziExp)}>🔊</button>
                <p className='example'>{hanziExp}</p>
                <p className='pinyin_example'>{pinyinExp}</p>
                <p className='mean_example'>{meanExp}</p>
            </div>
        </div>
    )
}

export default CardExample
