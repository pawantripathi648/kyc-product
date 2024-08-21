import React from 'react';
import { Layout, Avatar } from 'antd';
import profile from  '../assets/gamer.png';
import bags from  '../assets/logo512.png';

const { Header } = Layout;

const Navbar = () => (
  <Header className="header">
    <img src={bags} alt="icon" style={{height:'25px'}}/>
    <Avatar src={profile} />
  </Header>
);

export default Navbar;
