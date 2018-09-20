import React from 'react';
import { apiUrlExcursions } from '../config.js';

export default class ExcursionsApi {
  static fetchData(countryName,destination) {
    const apiurl = apiUrlExcursions+countryName+'/'+destination;
    return fetch(apiurl, { method: 'GET' }, { 'mode': 'no-cors' })
      .then(response => {
        //console.log(response.json());
        return response.json();
      });
  }
}
