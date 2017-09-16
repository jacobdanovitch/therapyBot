import React, {Component} from 'react';
import {Link} from "react-router";

export default class Second extends Component{
  render(){
    return(
      <div>
        <h1>but I did not expect it to be a joke</h1>
        <h2>{this.props.params.param}</h2>
        <h3>{this.props.location.query.date}</h3>
        <Link to = ""> Home </Link>

      </div>
    );
  }
}
