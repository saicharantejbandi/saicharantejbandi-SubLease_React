import React, { Component } from 'react'

import ReactBnbGallery from 'react-bnb-gallery'

const photos = [{
  photo: "https://twistedsifter.files.wordpress.com/2010/03/the-rockefeller-center-new-york-city-vertical-panorama.jpg?w=343&h=994",
  caption: "",  
  subcaption: "",
  thumbnail: "https://source.unsplash.com/aZjw7xI3QAA/100x67",
}, {
  photo: "https://source.unsplash.com/c77MgFOt7e0/1144x763",
  caption: "La Habana, Cuba",
  subcaption: "Photo by Gerardo Sanchez on Unsplash",
  thumbnail: "https://source.unsplash.com/c77MgFOt7e0/100x67",
}, {
  photo: "https://source.unsplash.com/QdBHnkBdu4g/1144x763",
  caption: "Woman smoking a tobacco",
  subcaption: "Photo by Hannah Cauhepe on Unsplash",
  thumbnail: "https://source.unsplash.com/QdBHnkBdu4g/100x67",
}];

const photo=["https://twistedsifter.files.wordpress.com/2010/03/the-rockefeller-center-new-york-city-vertical-panorama.jpg?w=343&h=994",
"https://source.unsplash.com/c77MgFOt7e0/1144x763",];
class Example extends Component {
  constructor() {
    super(...arguments);
    this.state = { galleryOpened: false };
    this.toggleGallery = this.toggleGallery.bind(this);
  }

  toggleGallery() {
    this.setState(prevState => ({
      galleryOpened: !prevState.galleryOpened
    }));
  }

  render () {
    return (
        <div>
      <button onClick={this.toggleGallery}>Open photo gallery</button>
      <ReactBnbGallery
      photos={this.props.images}
        show={this.state.galleryOpened}
        
        onClose={this.toggleGallery}
        showThumbnails={false} />
        </div>
    );
  }
}

export default Example;


