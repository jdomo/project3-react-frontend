import React from 'react';

const AllAlbums = (props) => {

  const albumList = props.albums.map(album => {
      return (
        <li key={album._id}>
          <span>
            <img src={`${album.image}`} alt='album_cover'/>
          </span>
        </li>
      )
  })

  return (
    <div>
      {albumList}
    </div>
  )
}

export default AllAlbums;
