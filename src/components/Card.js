import '../styles.css';
import React from 'react';

export default function Card({image,large,medium,small}) {

    return (
        <div className='card'>
            <img src={image} alt='' />
            <div className='image-hover-container'>
                <a href={large} className='download-btn'>Large</a>
                <a href={medium} className='download-btn'>Medium</a>
                <a href={small} className='download-btn'>Small</a>
            </div>
        </div>
    )
}