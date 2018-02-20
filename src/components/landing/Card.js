import React, { Component } from 'react';

import '../../assets/styles/css/card.css';

class Card extends Component {

  render() {
    const {id, title, image, alt} = this.props;
    const words = title.split(" ");
    return (
      <div>
        <div class="card" id={id}>
          <img src={image} alt={alt}/>
          <h2>{words.map(word => <span>{word}</span>)}</h2>
        </div>
      </div>
    );
  }

}

export default Card;
