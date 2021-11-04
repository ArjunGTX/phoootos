import '../styles.css';
import React from 'react';

export default function Card({image,large,medium,small}) {

    return (
        <div className='card'>
            <img src={image} alt='' />
            <div className='image-hover-container'>
                <a href={large} className='download-btn' target='_blank' rel='noreferrer'>Large <i className="fas fa-expand-alt"></i></a>
                <a href={medium} className='download-btn' target='_blank' rel='noreferrer'>Medium <i className="fas fa-expand-alt"></i></a>
                <a href={small} className='download-btn' target='_blank' rel='noreferrer'>Small <i className="fas fa-expand-alt"></i></a>
            </div>
        </div>
    )
}