import React from 'react';
import './App.css';
import {Route} from 'react-router-dom'
import {PrivateRoute} from './util/PrivateRoute'
import Register from './components/Register'
import Login from './components/Login'
import Dash from './components/dash/Dash'

function App(props) {
  // console.log('PROPS', props)
  return (
    
    <div className="App">
      <Route exact path='/' render={props => props.history.push('/register')}/>
      <Route path='/register' component={Register}/>
      <Route path='/login' component={Login}/>
      <PrivateRoute path='/dash' component={Dash}/>
    </div>
  );
}

export default App;
