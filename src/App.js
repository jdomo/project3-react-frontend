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
    albums: []
  }

  componentDidMount(){
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      this.setState({
        ...user,
        loading: false,
        albums: []
      })
    }
    this.getUserAlbums();
  }

  logIn = async (loginInfo) => {
    try {
      const loginResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/login`, {
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
      const registerResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/register`, {
        method: 'POST',
        credentials: 'include',
        body: data,
        headers: {
          'enctype': 'multipart/form-data'
        }
      });

      const parsedResponse = await registerResponse.json();
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
      const getAlbums = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/`);

      if (getAlbums.status !== 200) {
        throw Error('server 404, error!!!')
      }

      const albumsResponse = await getAlbums.json();

      const user = JSON.parse(localStorage.getItem("user"))

      const userAlbums = albumsResponse.data.filter(item => 
        item.created_by.id === this.state.id
      )

      this.setState({
        albums: [...userAlbums]
      })

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
          <Route exact path="/profile" render={(props) =>  <Profile {...props} userInfo={this.state}/> } />
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
