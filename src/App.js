import React from 'react';
import './App.css';
import {Route} from 'react-router-dom'
import Register from './components/Register'

function App() {
  return (
    <div className="App">
      <Register/>
      {/* <Route exact path='/' component={}/>
      <Route path='/login' component={}/>
      <Route path='/about' component={}/> */}
    </div>
  );
}

export default App;
