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

  deleteAlbum = async (album) => {
    const deleteRequest = await fetch('http://localhost:8000/api/' + album.id, {
      method: 'DELETE',
      credentials: 'include'
    })

    console.log(deleteRequest, '<-- deleteRequest fetch in deleteAlbum');

    if (deleteRequest.status !== 200) {
      throw Error('delete request error');
    }

    const deleteResponse = await deleteRequest.json();

    console.log(deleteResponse, '<-- deleteResponse in deleteAlbum')

    const truncatedAlbumList = this.state.albums.filter(item => deleteResponse.data.id !== item.id)

    console.log(truncatedAlbumList, '<-- truncatedAlbumList');

    this.setState({
      albums: truncatedAlbumList
    })

    console.log(this.state.albums, '<-- state.albums after delete')
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