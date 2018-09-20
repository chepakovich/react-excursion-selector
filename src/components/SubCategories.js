import React, { Component } from 'react';
import Excursions from './Excursions';

class SubCatogories extends Component {
  render() {
    const data = this.props.appdata;   
    return (
      <div>       
          {data.map((d) => (
            <div className="subcategoty">
              <h3>{d.subCategoryName}</h3>            
              <Excursions appdata={d.excursions} />
            </div>
          ))}
      </div>
    );
  }
}

export default SubCatogories;
