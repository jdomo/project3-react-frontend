import React from 'react';

const AllAlbums = (props) => {

  const albumList = props.albums.map(album => {
    return (
      <li key={album.id}>
        <span>
          <a href={`/albums/${album.id}`}><img src={`${album.image}`} alt='album_cover'/></a>
          <button onClick={()=> props.delete(album)}>Delete</button>
          <button onClick={()=> props.showModal.bind(null, album)}>Edit</button>
        </span>
      </li>
    )
  })
    
  return (
    <div>
      <a href="/albums/new">Add New WWAC!</a>
      {albumList}
    </div>
  )
}

export default AllAlbums;
