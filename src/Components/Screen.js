import React, { useEffect, useState } from 'react'
import './Screen.css'
import Switch from '@mui/material/Switch';
import Reactpip from 'react-picture-in-picture'
import { useReactMediaRecorder } from "react-media-recorder";
import Status from './Status';

const Screen = () => {

  const[mic, setMic]=useState(true);
  const[camera, setCamera]=useState(false);
  const[active, setActive] = useState(false);

  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    clearBlobUrl
  } = useReactMediaRecorder({ screen: true, audio: mic });

  const handleChange = (e) => {
    setMic(e.target.checked);
  };

  const downloadRecording = () => {
    const pathName = `screen_recording.mp4`;
    try {
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        // for IE
        window.navigator.msSaveOrOpenBlob(mediaBlobUrl, pathName);
      } else {
        // for Chrome
        const link = document.createElement("a");
        link.href = mediaBlobUrl;
        link.download = pathName;
        console.log(link)
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='screen'>
        <div className="settings">
            <div className='center'>
                <div className='mic'>
                    <label>Mic</label>
                    <Switch
                        checked={mic}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </div>
                <div 
                  className={status!=='recording'?"screen-btn":"screen-btn disable"} 
                  onClick={status!=='recording'?startRecording:()=>null}
                >
                  Start recording
                </div>
                <div 
                  className={status==='recording'?"screen-btn stop":"screen-btn stop disable"} 
                  onClick={status==='recording'?stopRecording:()=>null}
                >
                  Stop recording
                </div>
            </div>
        </div>
        <div className="preview">
          <div>
            {console.log(mediaBlobUrl)}
            <Status status={status} media={"screen"}/>
            <video src={mediaBlobUrl} controls autoPlay loop className='preview-video'/>
              <div
                onClick={status==='stopped'?downloadRecording:()=>null}
                className={status==='stopped'?"download-btn":"download-btn disable"}
              >
                Download
              </div>
          </div>
        </div>
    </div>
  )
}

export default Screen