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
import EditAlbum from './EditAlbum'

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

  componentDidMount(){
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(user, '<-- user in App componentDidMount')
    if(user){
      this.setState({
        ...user,
        loading: false,
      })
    }
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
      localStorage.setItem("user", JSON.stringify(parsedResponse.data))


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
      localStorage.setItem("user", JSON.stringify(parsedResponse.data))
      this.setState({
        ...parsedResponse.data,
        loading: false
      })

      return parsedResponse;
    } catch (err) {
      console.log(err, '<--- err from register, App.js');
    }
  }

  getUserAlbums = async () => {
    try {
      const getAlbums = await fetch('http://localhost:8000/api/');
      console.log(getAlbums, '<-- albums response in getAlbums')

      if (getAlbums.status !== 200) {
        throw Error('server 404, error!!!')
      }

      const albumsResponse = await getAlbums.json();
      console.log(albumsResponse, '<-- albumsResponse')

      const user = JSON.parse(localStorage.getItem("user"))
      console.log(user, '<-- user in getUserAlbums')

      const userAlbums = albumsResponse.data.filter(item => 
        item.created_by.id == user.id
      )

      console.log(userAlbums, '<---userAlbums')

      this.setState({
        albums: [...albumsResponse.data]
      })

      console.log(this.state.albums, '<--- albums in user profile state')

    } catch (err) {
      console.log(err, '<-- err in getAlbums');
    }
  }

  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" render={(props) => <Register {...props} register={this.register}/> } />
          <Route exact path="/login" render={(props) => <Login {...props} logIn={this.logIn}/> } />
          <Route exact path="/profile" render={(props) =>  <Profile {...props} userInfo={this.state} getUserAlbums={this.getUserAlbums}/> } />
          <Route exact path="/albums" component={AlbumContainer}/>
          <Route exact path="/albums/new" render={(props) => <NewAlbum {...props} /> } />
          <Route exact path="/albums/:id/edit" render={(props) => <EditAlbum {...props} /> } />
          <Route exact path="/albums/:id" component={ShowAlbum} />
          <Route component={my404} />
        </Switch>
      </main>
    );
  }
}

export default App;
