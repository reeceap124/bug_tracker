import React from 'react';
import './App.css';
import {Route} from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Dash from './components/dash/Dash'

function App() {
  return (
    <div className="App">
      <Route path='/register' component={Register}/>
      <Route path='/login' component={Login}/>
      <Route path='/dash' component={Dash}/>
    </div>
  );
}

export default App;
