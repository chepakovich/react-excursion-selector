import React, { Component } from 'react';
import ExcursionsApi from '../api/ExcursionsApi';
import Categories from './Categories';

class Excursion extends Component {

  state = {
    isLoading: true,
    appdata: [],
    countryUrl: '',
    suburl: '',
    error: null
  }

  componentDidMount() {
    const url = this.props.location.pathname;
    const countryUrl = url.substring(url.indexOf('/ctry/')+6, url.indexOf('/dest/'));
    const suburl = url.substring(url.lastIndexOf('/') + 1);
    const countryName = countryUrl.replace(/_/g, ' ');
    const destination = suburl.replace(/_/g, ' ');
    this.fetchData(countryName,destination,countryUrl,suburl);
  }

  componentDidUpdate() {
    const url = this.props.location.pathname;
    const countryUrl = url.substring(url.indexOf('/ctry/')+6, url.indexOf('/dest/'));
    const suburl = url.substring(url.lastIndexOf('/') + 1);
    const countryName = countryUrl.replace(/_/g, ' ');
    const destination = suburl.replace(/_/g, ' ');
    if (this.state.suburl !== suburl) {
      this.fetchData(countryName,destination,countryUrl,suburl);
    }
  }

  fetchData(countryName,destination,countryUrl,suburl) {
    ExcursionsApi.fetchData(countryName,destination)
      .then(data =>
        this.setState({
          countryUrl: countryUrl,
          suburl: suburl,
          countryName: countryUrl.replace(/_/g, ' '),
          destinationName: suburl.replace(/_/g, ' '),
          appdata: data,
          isLoading: false, 
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    const categories = this.state.appdata;
    const result = categories.find( exc => exc.countryName === this.state.countryName );
    return (
      <div>       
        <h1>Excursions in {this.state.destinationName} ({this.state.countryName})</h1>
        <Categories appdata={categories} />
      </div>
    );
  }
}

export default Excursion;