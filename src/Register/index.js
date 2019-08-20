import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Register extends Component { 
  state = {
    username: '',
    password: '',
    email: ''
  }

  render() {
    return (
      <form>
        <input type="text" name="username" placeholder="username"/>
        <input type="password" name="password" placeholder="password"/>
        <input type="email" name="email" placeholder="email"/>
        <input type="submit" value="Register"/>
      </form>
    )
  }
}

export default Register;
