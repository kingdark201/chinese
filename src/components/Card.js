import React, { useRef, useState, useEffect, useCallback } from 'react';
import HanziWriter from 'hanzi-writer';
import './style.scss';
import CardExample from './CardExample';
import onReadHanzi from '../utils/core';

function Card({ hanzi = '', pinyin, mean, onClickOk, onClickNo, isSelectedOk, isSelectedNo, hanziExp, pinyinExp, meanExp }) {
    const cardRefs = useRef([]);
    const hanziCharacters = hanzi;
    const [mode, setMode] = useState('default');
    const [example, setExample] = useState(false);

    const initializeWriter = useCallback((index, showOutline) => {
        const character = hanziCharacters[index];
        if (cardRefs.current[index].writer) {
            cardRefs.current[index].writer.hideCharacter();
        }

        cardRefs.current[index].writer = HanziWriter.create(cardRefs.current[index], character, {
            width: 100,
            height: 100,
            padding: 5,
            strokeColor: '#000',
            showOutline,
        });
    }, [hanziCharacters]);

    useEffect(() => {
        hanziCharacters.split('').forEach((_, index) => {
            if (mode === 'rewrite') {
                initializeWriter(index, true);
                cardRefs.current[index].writer.loopCharacterAnimation();
            } else if (mode === 'write') {
                initializeWriter(index, true);
                cardRefs.current[index].writer.quiz();
            }
        });
    }, [mode, hanziCharacters, initializeWriter]);

    const handleRewrite = () => {
        if (mode === 'rewrite') {
            setMode('default');
        } else {
            setMode('default');
            setTimeout(() => setMode('rewrite'), 0);
        }
    };

    const handleWrite = () => {
        if (mode === 'write') {
            setMode('default');
        } else {
            setMode('default');
            setTimeout(() => setMode('write'), 0);
        }
    };

    return (
        <div style={{ width: '100%' }} className='animate__animated animate__fadeInUp'>
            <div className={`card_hsk ${isSelectedOk ? 'selected_ok' : isSelectedNo ? 'selected_no' : ''}`}>
                <button className='rewrite' onClick={handleRewrite}>
                    <i className="bi bi-eye-fill"></i>
                </button>
                <button className='write' onClick={handleWrite}>
                    <i className="bi bi-pencil-fill"></i>
                </button>
                <button className='example_btn' onClick={() => setExample(!example)}>
                    <i className="bi bi-info-circle"></i>
                </button>

                <button className='check_success' onClick={onClickOk}><i className="bi bi-clipboard-check"></i></button>
                <button className='check_defeat' onClick={onClickNo}><i className="bi bi-bookmark-x"></i></button>
                <button className='read_hanzi' onClick={() => onReadHanzi(hanzi)}>🔊</button>

                <span className='card_pinyin'>{pinyin}</span>

                <div className='card_vocabulary'>
                    {hanziCharacters && hanziCharacters.split('').map((character, index) => (
                        <div
                            key={index}
                            ref={(el) => (cardRefs.current[index] = el)}
                            className='character_container'
                        >
                            {mode === 'default' && character}
                        </div>
                    ))}
                </div>

                <p className='card_mean'>{mean}</p>
            </div>
            {example && (
                <CardExample hanzi={hanzi} hanziExp={hanziExp} pinyinExp={pinyinExp} meanExp={meanExp} closeBtn={() => setExample(false)} />
            )}
        </div>
    );
}

export default Card;
