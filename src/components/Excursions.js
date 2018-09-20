import React, { Component } from 'react';

class Excursions extends Component {

  render() {
    const data = this.props.appdata;  
    return (
      <div>       
        {data.map((d) => (
          <div className="excursion">
            <h4>{d.excursionFullName}</h4>
            <img src={'https://'+d.excursionImages.Img16X9} alt="" />
            <p>{d.excursionShortDescription}</p>
            <div className="clear"></div>
          </div>
        ))}
      </div>
    );
  }
}

export default Excursions;
