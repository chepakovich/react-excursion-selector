import React, { Component } from 'react';
import ExcursionsApi from '../api/ExcursionsApi';

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
    let output=[], key1, key2, key3;
    for (key1 in categories) {
      output.push(<h2>{categories[key1].categoryName}</h2>);
      for (key2 in categories[key1].subCategories) {
        output.push(<h3><b>{categories[key1].subCategories[key2].subCategoryName}</b></h3>);
        for (key3 in categories[key1].subCategories[key2].excursions) {
          if (categories[key1].subCategories[key2].excursions[key3].excursionImages != null) {
            output.push(
            <div className="excursion">
              <h4>{categories[key1].subCategories[key2].excursions[key3].excursionName}</h4>
              <img src={'https://'+categories[key1].subCategories[key2].excursions[key3].excursionImages.Img16X9} alt="" />
              <p>{categories[key1].subCategories[key2].excursions[key3].excursionShortDescription}</p>
              <div className="clear"></div>
            </div>
            );
          }
        }

      }
    }

    //console.log(output);
    const result = this.state.appdata.find( exc => exc.countryName === this.state.countryName );
      if (result) {
        console.log(result.destinations);
      }
    return (
      <div>       
        <h1>Excursions in {this.state.destinationName} ({this.state.countryName})</h1>
        {output}
      </div>
    );
  }

}

export default Excursion;