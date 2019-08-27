import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Card, Icon} from 'semantic-ui-react';
import Navbar from '../Navbar'
import '../App.css'

const Profile = (props) => {

  const albumList = props.userInfo.albums.map(item => {
    return (
    <div class="box">
      <img src={`${item.image}`} alt='album cover'/>
    </div>
    )
  })

  console.log(props.userInfo, '<-- userInfo from props in Profile')
  console.log(albumList, '<-- albumList in profile')
  return (
    <div>
      <Navbar />
      <header>
        {props.userInfo.username}'s Albums
      </header>
      <div class="main">
        <div class="container">
          {albumList}
        </div>
      </div>
    </div>
  )
}
export default Profile;