import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { async } from 'q';
import { Route, Switch } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import AlbumContainer from './AlbumContainer'
import NewAlbum from './NewAlbum'
import ShowAlbum from './ShowAlbum'

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
    album: {}
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

  // getAlbum = async (album) => {
  //   try {
  //     const showResponse = await fetch(`http://localhost:8000/api/${album.id}`)
  //     const parsedResponse = await showResponse.json();

  //     console.log(parsedResponse, '<-- parsedResponse in getAlbum')

  //   } catch (err) {
  //     console.log(err, '<--- err from getAlbum, App.js')
  //   }
  // }

  album = this.getAlbum

  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" render={(props) => <Register {...props} register={this.register}/> } />
          <Route exact path="/login" render={(props) => <Login {...props} logIn={this.logIn}/> } />
          <Route exact path="/profile" render={(props) =>  <Profile {...props} userInfo={this.state}/> } />
          <Route exact path="/albums" component={AlbumContainer}/>
          <Route exact path="/albums/new" render={(props) => <NewAlbum {...props} /> } />
          <Route exact path="/albums/:id" component={ShowAlbum} />
          <Route component={my404} />
        </Switch>
      </main>
    );
  }
}

export default App;
