import React, { useRef, useEffect, useState } from 'react';

function Timer(duration) {
    const STATUS = {
        started: 'started',
        stopped: 'stopped'
    }
    
    const convertToSeconds = ( hours, minutes,  seconds) => {
        return seconds + minutes * 60 + hours * 60 * 60;
    }

    const {hours,minutes,seconds} = duration.offer;
    const convertTime = convertToSeconds(hours,minutes,seconds);
    const [secondsRemaining, setSecondsRemaining] = useState(convertTime);
    const [status, setStatus] = useState(STATUS.stopped);

    const secondsToDisplay = secondsRemaining % 60;
    const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
    const minutesToDisplay = minutesRemaining % 60;
    const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60;

    const twoDigits = (num) => String(num).padStart(2, '0')

    useInterval(
        () => {
        if (secondsRemaining > 0) {
            setStatus(STATUS.started)
            setSecondsRemaining(secondsRemaining - 1)
            localStorage.setItem("secondsRemaining", secondsRemaining);
          } else {
            setStatus(STATUS.stopped)
            localStorage.setItem('secondsRemaining', secondsRemaining);
          }
        },
        [status === STATUS.started ? 1000 : null],
      )
    

    useEffect(() => {
        const savedDuration = localStorage.getItem('secondsRemaining')
        if (savedDuration) {
          setSecondsRemaining(savedDuration);
        }
      }, []);

    return (
        <div className= { status === STATUS.started ? 'tile-count-down' : 'count-down-expired' }>
            <div className='count-down-timer'>
              <h1>{ twoDigits(hoursToDisplay) } : { twoDigits(minutesToDisplay) } : { twoDigits(secondsToDisplay) }</h1>
            </div>
            <div className='count-down-subtext'>
              <span>Hours</span>
              <span>Minutes</span>
              <span>Seconds</span>
            </div>
        </div>
    )
}


function useInterval(callback, delay) {
    const savedCallback = useRef()
  
    // Remember the latest callback
    useEffect(() => {
      savedCallback.current = callback
    }, [callback])
  
    // Set up the interval
    useEffect(() => {
      function tick() {
        savedCallback.current()
      }
      if (delay !== null) {
        let id = setInterval(tick, delay)
        return () => clearInterval(id)
      }
    }, [delay])
  }


export default Timer;