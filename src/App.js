import React from 'react';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';

import Home from './components/Home';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import Chat from './components/Chat';
import Posters from './components/Posters';


function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">> hem</Link>
            </li>
            <li>
              <Link to="/posters">> posters</Link>
            </li>
            <li>
              <Link to="/login">> logga in/ut</Link>
            </li>
            <li>
              <Link to="/register">> skapa användare</Link>
            </li>
            <li>
              <Link to="/chat">> chatt</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact strict path="/">
              <Header />
              <Home />
          </Route>
          <Route exact strict path="/posters" component={Posters}/>
          <Route exact strict path="/login" component={Login}/>
          <Route exact strict path="/register" component={Register}/>
          <Route exact strict path="/chat" component={Chat}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
