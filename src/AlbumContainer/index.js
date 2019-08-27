import React, {Component} from 'react';
import AllAlbums from '../AllAlbums';

class AlbumContainer extends Component {
  state = {
    albums: [],
  }

  componentDidMount() {
    this.getAlbums()
  }

  getAlbums = async () => {
    try {
      const getAlbums = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/`);

      if (getAlbums.status !== 200) {
        throw Error('server 404, error!!!')
      }

      const albumsResponse = await getAlbums.json();

      this.setState({
        albums: [...albumsResponse.data]
      })

    } catch (err) {
      console.log(err, '<-- err in getAlbums');
    }
  }

  deleteAlbum = async (album) => {
    const deleteRequest = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/${album.id}`, {
      method: 'DELETE',
      credentials: 'include'
    })


    if (deleteRequest.status !== 200) {
      throw Error('delete request error');
    }
    const deleteResponse = await deleteRequest.json();

    const truncatedAlbumList = this.state.albums.filter(item => deleteResponse.data.id !== item.id)

    this.setState({
      albums: truncatedAlbumList
    })

  }
  
  render() {
    return (
      <div>
        <AllAlbums albums={this.state.albums} delete={this.deleteAlbum}/>
      </div>
    )
  }
}

export default AlbumContainer;