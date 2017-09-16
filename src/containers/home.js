import React, {Component} from 'react';
import {Link} from "react-router";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import {selectUser} from '../actions/index'
import axios from 'axios'

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
        {this.props.children}
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
