import React, {Component} from 'react'
import Home from './home'
import HomePage from '../components/homePage'
import Second from '../components/second_component'
import {Router, Route,IndexRoute, browserHistory} from "react-router"

export default class App extends Component{
  render(){

    return(
      <Router history = {browserHistory}>
        <Route path = "/" component = {Home}>
          <IndexRoute component = {HomePage}/>
          <Route path= "/second(/:param)" component = {Second}>
          </Route>
        </Route>
      </Router>
    );
  }
}
