import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import '../App.css';
import img1 from '../images/top_image_scale_1x.png'
import img2 from '../images/top_image_scale_2x.png'

function Offer() {
    const [offers, setOffers] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:8000/offers')
            .then(res => {
                if (!res.ok) {
                    throw Error('Oops! Data can\'t be fetched.')
                }
                return res.json();
            })
            .then(data => {
                setOffers(data);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
                setError(err.message);
            })
        }, 1000)
    }, [])

    const query = "(-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2), (min-resolution: 192dpi)";
    const displayImg = matchMedia(query).matches ? img2 : img1

    return (
        <div className='offer'>
        { error && <div>{ error }</div> }
        { isLoading && <div>Loading...</div> }
        {offers && <Tile 
        offers= {offers} 
        src={displayImg}
        />}
        </div>
    )
}

export default Offer
