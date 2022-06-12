import React, { useEffect, useState } from 'react'
import { useReactMediaRecorder } from "react-media-recorder";
import './Camera.css'
import Switch from '@mui/material/Switch';
import Status from './Status';
 
const Camera = () =>{

  const[mic, setMic]=useState(true);
  const[camera, setCamera]=useState(false);
  const[active, setActive] = useState(false);

  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    clearBlobUrl
  } = useReactMediaRecorder({ video: true, audio: mic });

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

  const getLocalStream = ()=> {
    // navigator.mediaDevices.getUserMedia({video: true, audio:true}).then( stream => {
    //     window.localStream = stream;
    //     // window.localAudio.srcObject = stream;
    //     // window.localAudio.autoplay = true;
    // }).catch( err => {
    //     alert("Please allow your mic and camera to record.")
    //     getLocalStream();
    // });
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

export default Camera