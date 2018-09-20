import React, { Component } from 'react';
import DestinationsApi from '../api/DestinationsApi';
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';

class Destination extends Component {

  state = {
    isLoading: true,
    appdata: [],
    suburl: '',
    error: null
  }

  componentDidMount() {
    const url = this.props.location.pathname;
    const suburl = url.substring(url.lastIndexOf('/') + 1)
    this.fetchData(suburl);
  }

  componentDidUpdate() {
    const url = this.props.location.pathname;
    const suburl = url.substring(url.lastIndexOf('/') + 1);
    if (this.state.suburl !== suburl) {
      this.fetchData(suburl);
    }
  }

  fetchData(suburl) {
    DestinationsApi.fetchData(suburl)
      .then(data =>
        this.setState({
          suburl: suburl,
          countryName: suburl.replace(/_/g, ' '),
          appdata: data,
          isLoading: false,
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    const result = this.state.appdata.find( dest => dest.countryName === this.state.countryName );
    return (
      <DropdownMenu triggerType='text' trigger={`Select Destination in ${this.state.countryName}`}>
        {this.state.error ? <p>{this.state.error.message}</p> : null}
        {!this.state.isLoading ? (
          result.destinations.map(destination => {
            const destinationUrl = destination.replace(/ /g, '_');
          return (
            <MenuItem text={destination} location={`/ctry/${this.state.suburl}/dest/${destinationUrl}`} />          
          );
        })      
      ) : (
        <p>Loading...</p>
      )}       
    </DropdownMenu>
    );
  }

}

export default Destination;

