import React from 'react';
import { Link } from 'react-router-dom';
import Timer from './Timer';
import '../App.css'


function Tile(props) {
    const displayStatus = localStorage.getItem('secondsRemaining') === 0 ? 'none' : 'block';
    const addClass = localStorage.getItem('secondsRemaining') === 0 ? 'count-down-expired' : 'tile-container';

    return(
            props.offers.map((offer) => (
                <div className= { addClass }>
                    <img 
                    className='top-tile-img'
                    alt="Offer-image"
                    src={ props.src }
                    style={{ display: displayStatus }} />
                    <div className = 'blinkingText' style={{ display: displayStatus }}>
                        <p>Get your free £{ offer.cash_value } now</p>
                    </div>
                    
                    
                    <Timer 
                    offer={ offer.duration } 
                    className='timer'/>

                    <Link to= { offer.link } style={{ textDecoration: 'none' }}>
                        <button 
                        className='button-opt-in'
                        style={{ display: displayStatus }}>
                            Opt In
                        </button>
                    </Link>
                </div>
                ))
            );
        }

export default Tile;
