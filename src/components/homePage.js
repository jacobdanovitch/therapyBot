import React, {Component} from 'react';
import axios from 'axios'
import {Link} from "react-router";
import {ReactMic} from 'react-mic';
import WebCamComponent from './webcam'
import 'isomorphic-fetch'
var toWav = require('audiobuffer-to-wav')
var audioContext = new (window.AudioContext || window.webkitAudioContext)()

export default class HomePage extends Component{
  constructor(){
    super()
    this.state={
      recordVoice: false,
      buttonTxt: 'Start',
      token: '',
      inputTxt:'',
      activityId:'',
      conversationId:'',
      voiceToken:'',
      error: '',
      audioFile:null,
      messages:[{
        message:'Welcome to your private therapy',
        user:'Therapy bot'
      }],
    }
  }
  getMessage(){
    return fetch('https://directline.botframework.com/v3/directline/conversations/'+this.state.conversationId+'/activities?'+this.state.activityId, {
        method: 'GET',
        headers: {
        'Authorization': 'Bearer '+this.state.token
        },
    })
    .then((response) => {
      if (response.status != 200){
          return
      }
      else{
          return response.json();
      }
    })
    .then((responseJson)=>{
      let tmp = this.state.messages.slice()
      tmp.push({message:responseJson.activities[1].text, user: 'Therapy Bot'})
      this.setState({messages:tmp, inputTxt:''})
      document.getElementById('inputTxt').value=''

    })
    .catch((error) => {
        console.error(error);
    });
  }
  startActivity(){
    console.log(this.state.inputTxt)
    console.log(this.state.conversationId)
    console.log(this.state.token)
    let url = 'https://directline.botframework.com/v3/directline/conversations/'+this.state.conversationId+'/activities'
    console.log(url)
    return fetch(url, {
        method: 'POST',
        headers: {
        'Authorization': 'Bearer '+this.state.token,
        'Content-Type':'application/json'
        },
        body:JSON.stringify({
            type: "message",
            from: {
                id: "you"
            },
            text: this.state.inputTxt
        })
      })
    .then((response) => {
      console.log(response)
      if (response.status != 200){
          return
      }
      else{
          return response.json();
      }
    })
    .then((responseJson)=>{
      console.log(responseJson)
      this.setState({activityId:responseJson.id})
      this.getMessage()
    })
    .catch((error) => {
        console.error(error);
    });
  }
  getToken(){
    return fetch('https://api.cognitive.microsoft.com/sts/v1.0/issueToken', {
        method: 'POST',
        headers: {
        'Ocp-Apim-Subscription-Key':'bd717f3e21ad4bca9243b83772e1f6c1',
        },
    })
    .then((response) => {
      if (response.status != 200){
          return
      }
      else{
          return response.text();
      }
    })
    .then((responseTxt)=>{
      if (responseTxt)
        this.setState({voiceToken:responseTxt})
    })
    .catch((error) => {
        console.error(error);
    });
  }
  componentWillMount() {
    this.getToken()
    axios({
      url: 'https://directline.botframework.com/v3/directline/tokens/generate',
      method: 'post',
      headers: {'Authorization': 'Bearer P5biGMHmc-I.cwA.NNs.x3PH-GapGinTLgJaIxrYOtUhFnRuGcRS9GbncMKG3Ew'}
    })
    .then(response => response.data)
    .then(data => this.setState({token: data.token, conversationId: data.conversationId}))
    .catch(error => this.setState({error}))
  }

  onStop(recordedBlob){
    let body = new FormData();
    let finalResult = ''
    body.append('fname', 'communication.wav')

    audioContext.decodeAudioData(recordedBlob, function (buffer) {
      var wav = bufferToWav(buffer)
      var blob = new window.Blob([ new DataView(wav) ], {
        type: 'audio/wav'
      })
      body.append('name', blob)
      // var url = window.URL.createObjectURL(blob)
      // anchor.href = url
      // anchor.download = 'audio.wav'
      // window.URL.revokeObjectURL(url)
    }, function () {
      throw new Error('Could not decode audio data.')
    })

    fetch('https://speech.platform.bing.com/speech/recognition/interactive/cognitiveservices/v1?language=en-US',
      {
        method: 'POST',
        headers:{
         "Authorization":'Bearer ' + this.state.voiceToken
         } ,
         body :body
       }
     ).then(response=>{
       if (response.status != 200){
           return
       }
       else{
           return response.json();
       }
     }).then(responseJson=>{
       console.log(responseJson)
     })
  }

  handleKeyPress(event){
    if(event.key == 'Enter'){
      this.sendMsg()
    }
  }
  sendMsg(){
    if(this.state.inputTxt.trim().length > 0){
      let tmp = this.state.messages.slice()
      tmp.push({message:this.state.inputTxt, user: 'you'})
      this.setState({messages:tmp}, ()=>this.startActivity())

    }
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
        <div><WebCamComponent/></div>
        <div className="chatbox">
          {this.state.messages.map((ele, key)=>(
              <div key={key} style={{marginLeft:'20px', marginTop:'10px', marginRight:'20px',
              textAlign: ele.user==='you'?'right':'left'}}>{ele.user} : {ele.message}</div>
          ))}
        </div>

        <div className='inputField'>
          <input id='inputTxt' onKeyPress={this.handleKeyPress.bind(this)}
          onChange={(txt)=>this.setState({inputTxt: txt.target.value})} type='text'/>
          <div onClick={this.sendMsg.bind(this)} className='sendBtn'>Send</div>
          <div className='mic' onClick={()=>{
            this.setState({record:!this.state.record})

          }}/>
        </div>
        <div className='micDiv' style={{opacity:this.state.record?1:0}}>
          <ReactMic
            record={this.state.record}
            className="sound-wave"
            onStop={this.onStop.bind(this)}
            strokeColor="#000000"
            backgroundColor="#f75172" />

        </div>
      </div>

    );
  }
}
