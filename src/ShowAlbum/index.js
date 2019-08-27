import React, {Component} from 'react';
import '../App.css'
import Navbar from '../Navbar'

class ShowAlbum extends Component {
  state = {
    album: {}
  }

  getAlbum = async (albumID) => {
    try {
      const showResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/${albumID}`)
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
        <Navbar />
        <div class="main">
          <div class="container" id="show-page">
            <div class="box show-page">
            </div>
            <div class="box show-page">
              <p class="album-info">
                {this.state.album.title}, by {this.state.album.artist}
              </p>
              <p>
                <a href="/albums">Back to all albums</a>
              </p>
              <img src={`${this.state.album.image}`} alt='album_cover'/>
            </div>
            <div>
              
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default ShowAlbum;