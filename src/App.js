import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { async } from 'q';
import { Route, Switch } from 'react-router-dom';
import Register from './Register';

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

  register = async (data) => {
    try {
      const registerResponse = await fetch(`http://localhost:5000/user/register`, {
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
          <Route component={my404} />
        </Switch>
      </main>
    );
  }
}

export default App;
