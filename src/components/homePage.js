import React, {Component} from 'react';
import axios from 'axios'
import {Link} from "react-router";
import {ReactMic} from 'react-mic';
// import 'isomorphic-fetch'
export default class HomePage extends Component{
  constructor(){
    super()
    this.state={
      recordVoice: false,
      buttonTxt: 'Start',
      token: '',
      timeForToken: 1800,
      maxRecordingTime: 15,
      timeElapsed: 0,
      inputTxt:'',
      error: '',
      messages:[{
        message:'Welcome to your private therapy',
        user:'your therapy bot'
      }],
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
  }


  onTokenReceive() {

  }

  onStop(recordedBlob){
    this.setState({timeElapsed: 0})
    console.log('recordedBlob is: ', recordedBlob);
  }
  // renderMessages(){
  //   this.state.messages.map((ele, key)=>{
  //     return(
  //       <div key={key}>{ele.message}</div>
  //     )
  //   })
  // }
  handleKeyPress(event){
    if(event.key == 'Enter'){
      this.sendMsg()
    }
  }
  sendMsg(){
    let tmp = this.state.messages.slice()
    tmp.push({message:this.state.inputTxt, user: 'you'})
    this.setState({messages:tmp, inputTxt:''})
    document.getElementById('inputTxt').value=''
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
        <p>{error}</p>
      )
    }

    return(
      <div className='container'>
        <h1>Therapeautic Chatbot</h1>
        <div className="chatbox">
          {this.state.messages.map((ele, key)=>(
              <div key={key} style={{marginLeft:'20px', marginTop:'10px', marginRight:'20px',
              textAlign: ele.user==='you'?'right':'left'}}>{ele.user} : {ele.message}</div>
          ))}
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
          <input id='inputTxt' onKeyPress={this.handleKeyPress.bind(this)}
          onChange={(txt)=>this.setState({inputTxt: txt.target.value})} type='text'/>
          <div onClick={this.sendMsg.bind(this)} className='sendBtn'>Send</div>
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
