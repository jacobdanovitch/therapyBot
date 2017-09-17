import React, {Component} from 'react'
import Webcam from 'react-webcam'

export default class WebCamComponent extends Component {
  constructor(props) {
    super(props)
    this.setRef = (webcam) => {
      this.webcam = webcam;
    }

    this.capture = () => {
      let screenshot = this.webcam.getScreenshot()
      // fetch('http://localhost:3000', {
        
      // })
    }
  }

  render() {
    return (
      <div>
        <Webcam
          style={{position: 'absolute', right: '5%'}}
          ref={this.setRef}
          audio={false}
          height={100}
          width={125}
          screenshotFormat="image/jpeg"
        />
        <button onClick={this.capture}>Capture Photo</button>
       </div>
    )
  }
}
