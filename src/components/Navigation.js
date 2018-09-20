import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Home from './Home';
import Country from './Country';
import Destination from './Destination';
import Excursion from './Excursion';


class Navigation extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <div className="wrapper">
              <ul>
                <li><Link to='/'>Home</Link></li>

              </ul>
            </div>
          </nav>
          <div className="clear"></div>
          
          <div className="wrapper">
            <Switch>
              <Route path='/ctry/*/dest/' component={Excursion} />
              <Route path='/ctry/' component={Destination} />
              <Route exact path='/' component={Country} />

              <Route render={({ location }) => (
                <div className='ui inverted red segment'>
                <h3>
                    Error! No matches for {location.pathname}
                </h3>
                </div>
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default Navigation;