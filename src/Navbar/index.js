import React from 'react';
import '../App.css'
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <nav className="navbar">
      <div class="left">
      <a href='/albums'><span id="home-link">WWAC</span></a>
      </div>
      <div class="middle">
        <ul class="nav-links">
          <li class="nav-item"><a href='/albums/new'>Add new</a></li>
          <li class="nav-item"><a href='/profile'>My Profile</a></li>
          <li class="nav-item"><a href='/'>Register</a></li>
        </ul>
      </div>
      <div class="right">
      </div>
    </nav>
  )
}


export default Navbar;