import React, {Component} from 'react'
import Webcam from 'react-webcam'
import axios from 'axios'

export default class WebCamComponent extends Component {
  constructor(props) {
    super(props)
    this.state={
      imgName:''
    }
    this.setRef = (webcam) => {
      this.webcam = webcam;
    }
  }
  componentDidMount(){
    setTimeout(()=>this.capture(), 1000)
  }
  capture(){
    // let image = this.webcam.getScreenshot()
    // let body = new FormData();
    // let tmp = image.slice(image.length-5, image.length)
    // this.setState({imgName:tmp})
    // body.append('photo', {uri: image,name: tmp +'.jpg',type: 'image/jpeg'});
    // body.append('Content-Type', 'image/jpeg');

    // fetch('http://localhost:3000/image',{ method: 'POST',headers:{
    //      "Content-Type": "multipart/form-data",
    //      } , body :body} )
    //   .then((res) => {
    //     if (res.status == 200){
    //       console.log(res)
    //     }
    //     else{
    //     }
    //     console.log(res)
    //   })
    //   .catch((e) => console.log(e))
      return fetch('https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize', {
        method: 'POST',
        headers:{
          "Ocp-Apim-Subscription-Key":"29e53f1e359e4e24bd8f10a3055d5419",
          "Content-Type":"application/json",
        },
        body: JSON.stringify({
          url: "http://percyteng.me/images/photos/13.JPG",
        }),
      })
      .then(res => res.json())
      .then(data => {
        if (data){
          var max=0
          var maxMood = ''
          for (let key in data[0].scores){
            if (data[0]['scores'][key] > max){
              maxMood = key
              max = data[0]['scores'][key]
            }
          }
          this.props.setMood(maxMood)
        }
      })
      .catch(err => console.log(err))
    }
  render() {
    return (
      <div>
        <Webcam
          style={{position: 'absolute', right: '5%', opacity: '0'}}
          ref={this.setRef}
          audio={false}
          height={100}
          width={125}
          screenshotFormat="image/jpeg"
        />
{/*        <button className='animated fadeIn' onClick={this.capture.bind(this)} style={{marginBottom:'10px'}}>Capture Photo</button>
*/}       </div>
    )
  }
}
