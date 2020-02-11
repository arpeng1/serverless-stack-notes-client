import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './App.css';
import Routes from './Routes';

function App(props) {
  return (
    <div className="App container">
      <Navbar bg='light' fluid='true' collapseOnSelect>
        <Navbar.Brand><Link to="/">Scratch</Link></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Nav>
            <Link to='/signup' className='nav-link'>Signup</Link>
            <Link to='/login' className='nav-link'>Login</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
    </div>
  );
}

export default App;
