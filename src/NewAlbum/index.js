import React, {Component} from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class NewAlbum extends Component {
  state = {
    currentUser: {
      username: '',
      logged: false,
    },
    artist: '',
    title: '',
    image: {},
    createdBy: '',
  }

  handleChange = (e) => {
    if (e.target.name !== 'image') {
      this.setState({[e.target.name]: e.target.value});
    } else {
      console.log(e.target.files[0], '<--- uploaded album cover')
      this.setState({image: e.target.files[0]})
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const albumData = new FormData();

    albumData.append('artist', this.state.artist);
    albumData.append('title', this.state.title);
    albumData.append('image', this.state.image);
    albumData.append('createdBy', this.state.createdBy);

    console.log(albumData.entries(), '<-- albumData from CreateAlbum');

    const createCall = this.props.createNew(albumData);

    createCall.then(albumData => {
      console.log(albumData, '<--albumData from CreateAlbum')
    })
  }

  render() {
    console.log(this.state, '<--this.state in CreateAlbum component')
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          Add New WWAC
          <input type='text' name='artist' placeholder='artist' onChange={this.handleChange} />
          <input type='text' name='title' placeholder='title' onChange={this.handleChange} />
          <input type='text' name='wwac' placeholder='artist' onChange={this.handleChange} />
          <input type='submit'/>
        </form>
      </div>
    )
  }
}

export default NewAlbum;