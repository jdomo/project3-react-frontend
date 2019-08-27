import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../Navbar';
import '../App.css'

const AllAlbums = (props) => {

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user, '<-- user in AllAlbums');

  const albumList = props.albums.map(album => {
    return (
      <div class="box">
        <li key={album.id}>
          <a href={`/albums/${album.id}`}><img src={`${album.image}`} alt='album_cover'/></a>
          {
            user.id === album.created_by.id
            &&  
              <div>
                <div class="thumb-links">
                  <button onClick={()=> props.delete(album)}>Delete</button>
                </div>
                <div class="thumb-links">
                  <a href={`/albums/${album.id}/edit`}>Edit</a>
                </div> 
              </div>
          }
      </li>
      </div>
    )
  })

    
  return (
    <div>
      <Navbar />
      <header id="wwac-header">
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
