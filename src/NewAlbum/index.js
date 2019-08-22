import React, {Component} from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class NewAlbum extends Component {
  state = {
    artist: '',
    title: '',
    image: '',
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const createResponse = await fetch('http://localhost:8000/api/', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const parsedResponse = await createResponse.json();
    console.log(parsedResponse);

  }

  render() {
    console.log(this.state, '<--this.state in CreateAlbum component')
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Segment stacked>
            Add New WWAC
            <Form.Input type='text' name='artist' placeholder='artist' onChange={this.handleChange} value={this.state.artist}/>
            <Form.Input type='text' name='title' placeholder='title' onChange={this.handleChange} value={this.state.title} />
            <Form.Input type='text' name='image' placeholder='image URL' onChange={this.handleChange} value={this.state.image} />
            <Button type='submit'>Submit</Button>
          </Segment>
        </Form>
      </div>
    )
  }
}

export default NewAlbum;