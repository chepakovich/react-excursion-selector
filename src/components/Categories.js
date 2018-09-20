import React, { Component } from 'react';
import ExcursionsApi from '../api/ExcursionsApi';
import SubCategories from './SubCategories';

class Categories extends Component {
  render() {
    const data = this.props.appdata;
    return (
      <div>       
          {data.map((d) => (
            <div className="categoty">
              <h2>{d.categoryName}</h2>
              <SubCategories appdata={d.subCategories} />
            </div>
          ))}
      </div>
    );
  }
}

export default Categories;