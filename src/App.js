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
import Posters from './components/Posters';
import View from './components/View';
import MyPage from './components/MyPage';


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
              <Link to="/login">> logga in</Link>
            </li>
            <li>
              <Link to="/register">> skapa användare</Link>
            </li>
            <li>
              <Link to="/mypage">> min sida</Link>
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
          <Route exact strict path="/view/:id" component={View}/>
          <Route exact strict path="/mypage" component={MyPage}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
