import React, {Component} from 'react';

class ShowAlbum extends Component {
  state = {
    album: {}
  }

  getAlbum = async (albumID) => {
    try {
      const showResponse = await fetch('http://localhost:8000/api/' + albumID)
      const parsedResponse = await showResponse.json();

      console.log(parsedResponse, '<-- parsedResponse in getAlbum')

      this.setState({
        album: parsedResponse.data
      })

    } catch (err) {
      console.log(err, '<--- err from getAlbum, App.js')
    }
  }

  componentDidMount() {
    this.getAlbum(this.props.match.params.id)
  }

  render() {
    console.log(this.state, '<--this.state in ShowAlbum')
    return (
      <div>
        <ul>
          <li>Artist: {this.state.album.artist}</li>
          <li>Title: {this.state.album.title}</li>
          <li><img src={`${this.state.album.image}`} alt='album_cover' /></li>
        </ul>
      </div>
    )
  }

}

export default ShowAlbum;