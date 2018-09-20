import React, { Component } from 'react';
import DestinationsApi from '../api/DestinationsApi';
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';


class Country extends Component {

  state = {
    isLoading: true,
    appdata: [],
    suburl: '',
    error: null,
    countrySelected: '',
    destination: '',
  }

  componentDidMount() {
    const suburl = '';
    this.fetchData(suburl);
  }

  componentDidUpdate() {
    const suburl = '';
    if (this.state.suburl !== suburl) {
      this.fetchData(suburl);
    }
    
  }

  fetchData(suburl) {
    DestinationsApi.fetchData(suburl)
      .then(data =>
        this.setState({
          appdata: data,
          suburl: suburl,
          isLoading: false,
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    return (
      <DropdownMenu triggerType='text' trigger='Select Country'>
        {this.state.error ? <p>{this.state.error.message}</p> : null}
        {!this.state.isLoading ? (
          this.state.appdata.map(dataline => {
            const { countryName } = dataline;
            const countryUrl = countryName.replace(/ /g, '_');
            return (
              <MenuItem text={countryName} location={`/ctry/${countryUrl}`} />          
            );
          })
          
        ) : (
          <p>Loading...</p>
        )}       
      </DropdownMenu>
    )
  }

}

export default Country;


/*
<option value={countryName}>{countryName}</option>

*/