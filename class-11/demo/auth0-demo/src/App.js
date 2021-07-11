import React, { Component } from 'react';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import User from './components/User';
// import {LoginButton,LogoutButton,User} from './components';

class App extends Component {
  render() {
    return (
      <div>
        <LoginButton />
        <LogoutButton />
        <User />
      </div>
    )
  }
}

export default App;
