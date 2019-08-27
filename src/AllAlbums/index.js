import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../Navbar';
import '../App.css'

const AllAlbums = (props) => {

  const albumList = props.albums.map(album => {
    return (
      <div class="box">
        <li key={album.id}>
          <a href={`/albums/${album.id}`}><img src={`${album.image}`} alt='album_cover'/></a>
          <div class="thumb-links">
            <button onClick={()=> props.delete(album)}>Delete</button>
          </div>
          <div class="thumb-links">
            <a href={`/albums/${album.id}/edit`}>Edit</a>
          </div>
        </li>
      </div>
    )
  })
    
  return (
    <div>
      <Navbar />
      <header>
        World's Worst Album Covers
      </header>
      <div class="main">
        <div class="container">
          {albumList}
        </div>
      </div>
    </div>
  )
}

export default AllAlbums;
