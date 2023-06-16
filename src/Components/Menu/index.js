import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../Menu/Menu.css'
import { NavLink } from 'react-router-dom';



const Menu = () => {

  return (
  
  <div className='menu__container'>
      <Navbar className='menu'>
        <div className='img__profile'>
          <img id='user__avatar' 
          src='https://cdn1.iconfinder.com/data/icons/vibrancie-action/30/action_081-account-user-profile-avatar-512.png' 
          alt='Bootstrap 5'/>
        </div>
        <Navbar.Brand  as='h1' id='title__app'> <NavLink className='route__title' to='/dashboard'>Orange Tracker</NavLink></Navbar.Brand>
      <Nav>
          <Nav.Link><NavLink className='routes' to='/dashboard'>Dashboard</NavLink></Nav.Link> 
          <Nav.Link><NavLink className='routes' to='/expenses'>Expenses</NavLink></Nav.Link> 
          <Nav.Link><NavLink className='routes' to='/incomes'>Incomes</NavLink></Nav.Link> 
          <Nav.Link><NavLink className='routes' to='/viewTransactions'>View Transactions</NavLink></Nav.Link> 
          <Nav.Link><NavLink className='routes' to='/'>Sing Out</NavLink></Nav.Link> 
      </Nav>
      </Navbar>
  </div>
  )
}

export default Menu
