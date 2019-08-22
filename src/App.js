import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { async } from 'q';
import { Route, Switch } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import NewAlbum from './NewAlbum'
import Album from './ShowAlbum'

const my404 = () => {
  return (
    <div>
      Where do you think you're going?
    </div>
  )
}


class App extends Component {
  state = {
    username: '',
    email: '',
    loading: true,
  }

  logIn = async (loginInfo) => {
    try {
      console.log('from logIn')
      const loginResponse = await fetch('http://localhost:8000/user/login', {
        method: 'POST',                                                 
        credentials: 'include',
        body: JSON.stringify(loginInfo),  
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const parsedResponse = await loginResponse.json();


      this.setState(() => {
        return {
          ...parsedResponse.data,
          loading: false
        }
      })

      return parsedResponse

    } catch (err) {
      console.log(err)
    }
  }

  register = async (data) => {
    try {
      const registerResponse = await fetch(`http://localhost:8000/user/register`, {
        method: 'POST',
        credentials: 'include',
        body: data,
        headers: {
          'enctype': 'multipart/form-data'
        }
      });

      const parsedResponse = await registerResponse.json();
      console.log(parsedResponse, '<-- parsedResponse in register, App.js');

      this.setState({
        ...parsedResponse.data,
        loading: false
      })

      return parsedResponse;
    } catch (err) {
      console.log(err, '<--- err from register, App.js');
    }
  }

  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/register" render={(props) => <Register {...props} register={this.register}/> } />
          <Route exact path="/login" render={(props) => <Login {...props} logIn={this.logIn}/> } />
          <Route exact path="/profile" render={(props) =>  <Profile {...props} userInfo={this.state}/> } />
          <Route exact path="/new" render={(props) => <NewAlbum {...props} createNew={this.createNew} /> } />
          <Route exact path="/albums/:id" render={(props) => <Album {...props} /> } />
          <Route component={my404} />
        </Switch>
      </main>
    );
  }
}

export default App;
