import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import './App.css';
import Routes from './Routes';

function App(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      setIsAuthenticated(true);
    } catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();
    setIsAuthenticated(false);
    props.history.push('/login');
  }

  if (isAuthenticating) return null;

  return (
    <div className="App container">
      <Navbar bg='light' fluid='true' collapseOnSelect>
        <Navbar.Brand><Link to="/">Scratch</Link></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          {isAuthenticated 
          ? <Nav onClick={handleLogout}>
            <Link className='nav-link'>Logout</Link>
            </Nav>
          : <Nav>
              <Link to='/signup' className='nav-link'>Signup</Link>
              <Link to='/login' className='nav-link'>Login</Link>
            </Nav>
          }
          {/* <Nav>
            <Link to='/signup' className='nav-link'>Signup</Link>
            <Link to='/login' className='nav-link'>Login</Link>
          </Nav> */}
        </Navbar.Collapse>
      </Navbar>
      <Routes appProps={{ isAuthenticated, setIsAuthenticated }}/>
    </div>
  );
}

export default withRouter(App);
