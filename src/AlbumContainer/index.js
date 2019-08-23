import React, {Component} from 'react';
import AllAlbums from '../AllAlbums';

class AlbumContainer extends Component {
  state = {
    albums: [],
  }

  componentDidMount() {
    console.log('hi from AllAlbums in componentDidMount')
    this.getAlbums()
  }

  getAlbums = async () => {
    try {
      const getAlbums = await fetch('http://localhost:8000/api/');
      console.log(getAlbums, '<-- albums response in getAlbums')

      if (getAlbums.status !== 200) {
        throw Error('server 404, error!!!')
      }

      const albumsResponse = await getAlbums.json();
      console.log(albumsResponse, '<-- albumsResponse')

      this.setState({
        albums: [...albumsResponse.data]
      })

      console.log(this.state.albums, '<--- albums in albumsContainer, allAlbums state')

    } catch (err) {
      console.log(err, '<-- err in getAlbums');
    }
  }
  
  render() {
    return (
      <div>
        <AllAlbums albums={this.state.albums} />
      </div>
    )
  }
}

export default AlbumContainer;