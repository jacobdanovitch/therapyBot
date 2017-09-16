import React, {Component} from 'react';
import {Link} from "react-router";


export default class First extends Component{
  constructor(){
    super()
    this.state={

    }
  }
  render(){
    return(
        <iframe scrolling='no' className='iframeChat'
        src='https://webchat.botframework.com/embed/therapybot-hackthenorth?s=iZnsMGzDq9g.cwA.YGA.n1YcNdK39lS7Tn6n3qF-ZMR0YKEj6quUUqnGlTSWruI'> </iframe>
    );
  }
}
