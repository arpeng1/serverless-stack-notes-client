import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppliedRoute from './components/AppliedRoute';
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import NotFound from './containers/NotFound';
import NewNote from './containers/NewNote';
import Notes from './containers/Notes';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';

function Routes({appProps}) {
  return (
    <Switch>
      <UnauthenticatedRoute path='/login' exact component={Login} appProps={appProps} />
      <UnauthenticatedRoute path='/signup' exact component={Signup} appProps={appProps} />
      <AuthenticatedRoute path='/notes/new' exact component={NewNote} appProps={appProps} />
      <AuthenticatedRoute path='/notes/:id' exact component={Notes} appProps={appProps} />
      <AppliedRoute path='/' exact component={Home} appProps={appProps} />
      {/* <AppliedRoute path='/login' exact component={Login} appProps={appProps} />  */}
      {/* <AppliedRoute path='/signup' exact component={Signup} appProps={appProps} />  */}
      {/* <AppliedRoute path='/notes/new' exact component={NewNote} appProps={appProps} /> 
      <AppliedRoute path='/notes/:id' exact component={Notes} appProps={appProps} />  */}
      {/* <Route path='/' exact component={Home} />
      <Route path='/login' exact component={Login} /> */}
      <Route component={NotFound} />
    </Switch>
  )
}

export default Routes;