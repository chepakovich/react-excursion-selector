import React, { Component } from 'react';
import Country from './Country';

class Home extends Component {



  render() {

    return (
      <div className="main">
        <h1>Home page</h1>
        <Country />
      </div>
    );
  }
  
}

export default Home;