import React, {Component} from 'react';
import axios from 'axios'
import {Link} from "react-router";
import {ReactMic} from 'react-mic';
import WebCamComponent from './webcam'

// import 'isomorphic-fetch'

export default class First extends Component{
  constructor(){
    super()
    this.state={
      recordVoice: false,
      buttonTxt: 'Start',
      token: '',
      timeForToken: 1800,
      maxRecordingTime: 15,
      timeElapsed: 0,
      error: ''
    }
  }
  componentWillMount() {
    axios({
      url: 'https://directline.botframework.com/v3/directline/tokens/generate',
      method: 'post',
      headers: {'Authorization': 'Bearer P5biGMHmc-I.cwA.NNs.x3PH-GapGinTLgJaIxrYOtUhFnRuGcRS9GbncMKG3Ew'}
    })
    .then(response => response.data)
    .then(data => this.setState({token: data.token}))
    .catch(error => this.setState({error}))
  }

  componentDidMount() {
    // timer = setInterval( () => {
    //   if (this.state.timeForToken === 0)
    //     return
    //   this.setState({
    //     timeForToken: this.state.timeForToken-1
    //   })
    // }, 1000);
  }


  onTokenReceive() {

  }

  onStop(recordedBlob){
    this.setState({timeElapsed: 0})
    console.log('recordedBlob is: ', recordedBlob);
  }

  render(){
    if (this.state.token === '') {
      return (
        <div style={{textAlign: 'center'}}>
          Loading ...
        </div>
      )
    }

    if (this.state.error !== '') {
      return (
        <p>{this.state.error}</p>
      )
    }

    return(
      <div className='container'>
        <h1>Therapeautic Chatbot</h1>
        <div><WebCamComponent /></div>
        <div className="chatbox">

        </div>
        {this.state.record?<div className='micDiv'>
          <ReactMic
            record={this.state.record}
            className="sound-wave"
            onStop={this.onStop.bind(this)}
            strokeColor="#000000"
            backgroundColor="#FF4081" />

        </div>:null}
        <div className='inputField'>
          <input type='text'/>
          <div className='sendBtn'>Send</div>
          <div className='mic' onClick={()=>{
            this.setState({record:!this.state.record})
            if (this.state.buttonTxt==='Start') {
              this.setState({buttonTxt:'Stop'})
            }
            else {
              this.setState({buttonTxt:'Start'})
            }
          }}/>
        </div>


      </div>

    );
  }
}
