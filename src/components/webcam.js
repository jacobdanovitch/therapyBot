import React, {Component} from 'react'
import Webcam from 'react-webcam'
import axios from 'axios'

export default class WebCamComponent extends Component {
  constructor(props) {
    super(props)
    this.setRef = (webcam) => {
      this.webcam = webcam;
    }

    this.capture = () => {
      let image = this.webcam.getScreenshot()
      console.log(image)
      let body = new FormData()
      body.append('image', {name: image, type:'image/jpeg'})
      body.append('Content-Type', 'image/jpeg')

      fetch('http://localhost:3000/image', {
        method: 'POST',
        body,
      })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
    }
  }

  render() {
    return (
      <div>
        <Webcam
          style={{position: 'absolute', right: '5%', opacity: '0'}}
          ref={this.setRef}
          audio={true}
          height={100}
          width={125}
          screenshotFormat="image/jpeg"
        />
        <button onClick={this.capture}>Capture Photo</button>
       </div>
    )
  }
}