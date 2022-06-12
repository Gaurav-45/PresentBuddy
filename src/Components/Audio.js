import React, { useEffect, useState } from 'react'
import './Audio.css'
import { useReactMediaRecorder } from "react-media-recorder";
import Status from './Status';

const Audio = () => {

  const[camera, setCamera]=useState(false);
  const[active, setActive] = useState(false);

  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    mediaBlobUrl,
    clearBlobUrl
  } = useReactMediaRecorder({ audio: true});

  const downloadRecording = () => {
    const pathName = `screen_recording.mp3`;
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

  const getLocalStream = ()=> {
    navigator.getUserMedia({audio:true,video:true}, function(stream) {
      stream.getTracks().forEach(x=>x.stop());
    }, err=>{
      alert("Please allow your mic and camera to record");
      getLocalStream();
    });
  }

  useEffect(()=>{
    getLocalStream()
  }, [])
  

  return (
    <div className='audio'>
        <div className="settings">
            <div className='center'>
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
            {/* <p>{status}</p> */}
            <Status status={status} media={"screen"}/>
            <audio src={mediaBlobUrl} controls autoPlay loop className='preview-video'/>
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

export default Audio