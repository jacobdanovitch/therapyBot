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
      <iframe scrolling='no' className='iframeChat'
      src='https://webchat.botframework.com/embed/therapybot-hackthenorth?s=iZnsMGzDq9g.cwA.YGA.n1YcNdK39lS7Tn6n3qF-ZMR0YKEj6quUUqnGlTSWruI'> </iframe>
    );
  }
}
const style = {
  menuItem:{
    color:'#fffce1',
    textDecoration: 'none',
  },
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '36px',
    top: '36px'
  },
  bmBurgerBars: {
    background: '#373a47'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  },
  links:{
    color:"#fff"
  },
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
