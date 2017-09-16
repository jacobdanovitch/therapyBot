import React, {Component} from 'react';
import {Link} from "react-router";
import { ReactMic } from 'react-mic';


export default class First extends Component{
  constructor(){
    super()
    this.state={
      record: false,
      buttonTxt: 'Start'
    }
  }

  onStop(recordedBlob){
    console.log('recordedBlob is: ', recordedBlob);
  }
  render(){
    return(
      <div className='container'>
        <ReactMic
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop.bind(this)}
          strokeColor="#000000"
          backgroundColor="#FF4081" />
        <div className='mic' onClick={()=>{
          this.setState({record:!this.state.record})
          if (this.state.buttonTxt==='Start')
            this.setState({buttonTxt:'Stop'})
          else
            this.setState({buttonTxt:'Start'})
        }}/>
        <p>{this.state.buttonTxt}</p>
      </div>

    );
  }
}
