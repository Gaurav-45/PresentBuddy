import React, { useEffect, useRef, useState  } from 'react'
import './Status.css'

const fromTime = new Date(0, 0, 0, 0, 0, 0, 0);

const Status = ({status, media}) => {
    const [timer, setTimer] = useState(0)
    const countRef = useRef(null);

    const handleStart = () => {
        countRef.current = setInterval(() => {
          setTimer((timer) => timer + 1)
        }, 1000)
    }

    const handlePause = () => {
        clearInterval(countRef.current)
    }

    const handleReset = () => {
        clearInterval(countRef.current)
        setTimer(0)
    }  

    const formatTime = () => {
        const getSeconds = `0${(timer % 60)}`.slice(-2)
        const minutes = `${Math.floor(timer / 60)}`
        const getMinutes = `0${minutes % 60}`.slice(-2)
        const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)
    
        return `${getHours} : ${getMinutes} : ${getSeconds}`
    }

    useEffect(()=>{
        if(status==='acquiring_media') handleReset();
        if(status==='recording') handleStart();
        if(status==='stopped') handlePause(); 
    },[status])
    
  return (
    <div>
        {status==='idle'?
            <div className="text status">
                <h3>The recording has not started yet</h3>
                <p>To start recording the {media} click on Start recording button</p>
            </div>:<></>
        }

        {status==='acquiring_media'?
            <div className="text status">
                <h3>Recording starting...</h3>
                <p>To stop recording the {media} click on Stop recording button</p>
            </div>:<></>
        }
        
        {status==='recording'?
            <div className="text status">
                <h3>Recording started</h3>
                <p>To stop recording the {media} click on Stop recording button</p>
                <h4 className='timer'>Time elapsed</h4>
                <h4 className='timer'>{formatTime()}</h4>
            </div>:<></>
        }

        {status==='stopped'?
            <div className="text status">
                <h3>Recording completed</h3>
                <p>You can download the recorded {media} by clicking Download button at the bottom</p>
                <h4 className='timer'>Time elapsed</h4>
                <h4 className='timer'>{formatTime()}</h4>
            </div>:<></>
        }
    </div>
  )
}

export default Status