import React from 'react';

const AllAlbums = (props) => {

  const albumList = props.albums.map(album => {
      return (
        <li key={album.id}>
          <span>
            <img src={`${album.image}`} alt='album_cover'/>
            <button onClick={()=> props.delete(album)}>Delete</button>
            <button onClick={()=> props.showModal.bind(null, album)}>Edit</button>
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
