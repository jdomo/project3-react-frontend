import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
class Login extends Component {
  state = {
      username: '',
      password: ''
  }
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }
  handleSubmit = async (e) => {
    e.preventDefault();

    const login = this.props.logIn(this.state);

    login.then((data) => {
      console.log(data, '<-- data in login handlesubmit');
      if(data.status.message === 'Success'){
        this.props.history.push('/profile')
      } else {
        console.log(data, this.props)
      }
    }).catch((err) => {
      console.log(err)
    })

  }
  render(){
    console.log(this.state)
    return (
      <Grid textAlign='center' verticalAlign='middle' style={{ height: '100vh'}}>
        <Grid.Column style={{maxWidth: 450}}>
          <Header as='h2' textAlign='center'>
            Login
          </Header>
          <Form onSubmit={this.handleSubmit}>
              <Segment stacked>
              Username:
              <Form.Input fluid icon='user' iconPosition='left' placeholder='username' type='text' name='username' onChange={this.handleChange}/>
              Password:
              <Form.Input fluid icon='lock' iconPosition='left' placeholder='password' type='password' name='password' onChange={this.handleChange}/>
              <Button fluid size='large' type='submit'>Login</Button>
              <Message>
                Not a member? <Link to='/'>Register</Link>
              </Message>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
      )
  }
}

export default Login;