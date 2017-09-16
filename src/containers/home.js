import React, {Component} from 'react';
import {Link} from "react-router";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import {selectUser} from '../actions/index'
import UserDetails from './user-detail';
import Menu from 'react-motion-menu'
var BurgerMenu = require('react-burger-menu').pushRotate;

class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
    }
  }

  render(){
    return(
      <div>
        <iframe style={{maxWidth: '100%', height: '100vh', marginTop: '-1px'}} scrolling='no' className='iframeChat'
        src='https://webchat.botframework.com/embed/therapybot-hackthenorth?s=iZnsMGzDq9g.cwA.YGA.n1YcNdK39lS7Tn6n3qF-ZMR0YKEj6quUUqnGlTSWruI'>
        </iframe>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        users: state.users
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({selectUser: selectUser}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Home);
