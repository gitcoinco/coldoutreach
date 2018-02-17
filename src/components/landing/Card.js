import React, { Component } from 'react';

import '../../assets/styles/css/card.css';

class Card extends Component {

  render() {
    const {title, image, alt} = this.props;
    const words = title.split(" ");
    return (
      <div class="card">
        <img src={image} alt={alt}/>
        <h2>{words.map(word => <span>{word}</span>)}</h2>
      </div>
    );
  }

}

export default Card;
