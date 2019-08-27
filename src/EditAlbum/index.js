import React, {Component} from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment} from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import { thisExpression } from '@babel/types';

class EditAlbum extends Component {
  state = {
    albumToEdit: {},
    submitted: false
  }

  handleChange = (e) => {
    this.setState({
      albumToEdit: {
        ...this.state.albumToEdit,
        [e.target.name]: e.target.value
      }
    });
  }

  getAlbum = async (albumID) => {
    try {
      const showResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/${albumID}`)
      const parsedResponse = await showResponse.json();

      console.log(parsedResponse, '<-- parsedResponse in editAlbum')

      this.setState({
        // album: parsedResponse.data
        albumToEdit: parsedResponse.data
      })

    } catch (err) {
      console.log(err, '<--- err from editAlbum, App.js')
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    // this.props.history.push('/albums') //bad practice
    
    const editRequest = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/${this.state.albumToEdit.id}`, {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify(this.state.albumToEdit),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (editRequest.status !== 200) {
      throw Error('editRequest not working');
    }

    const editResponse = await editRequest.json()
    
    console.log(editResponse, '<--- editResponse in handleSubmit in editAlbum');
    
    this.setState({
      submitted: true
    })
  }

  componentDidMount() {
    this.getAlbum(this.props.match.params.id);
    console.log('hi from componentDidMount in editAlbum');
  }

  render() {
    console.log(this.state, '<--this.state in EditAlbum component')
    return (
      <div>
        {
          this.state.submitted
            ? <Redirect to='/albums'/>
            : null
        }
        <Form onSubmit={this.handleSubmit}>
          <Segment stacked>
            Edit WWAC Info
            <Form.Input type='text' name='artist' placeholder='artist' onChange={this.handleChange} value={this.state.albumToEdit.artist}/>
            <Form.Input type='text' name='title' placeholder='title' onChange={this.handleChange} value={this.state.albumToEdit.title} />
            <Form.Input type='text' name='image' placeholder='image URL' onChange={this.handleChange} value={this.state.albumToEdit.image} />
            <Button type='submit'>Submit</Button>
          </Segment>
        </Form>
      </div>
    )
  }
}

export default EditAlbum;