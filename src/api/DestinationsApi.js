import React from 'react';
import { apiUrlDestinations } from '../config.js';

export default class DestinationsApi {
  static fetchData() {
    const apiurl = apiUrlDestinations;
    return fetch(apiurl, { method: 'GET' }, { 'mode': 'no-cors' })
      .then(response => {
        //console.log(response.json());
        return response.json();
      });
  }
}