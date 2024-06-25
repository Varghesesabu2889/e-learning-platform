import React from 'react';

import {
  MDBCarousel,
  MDBCarouselItem,
} from 'mdb-react-ui-kit';
import Carousel1 from '../../assets/caro1.png'
import Carousel2 from '../../assets/caro2.png'
import Carousel3 from '../../assets/caro3.png'


const Carousel = () => {
  return (
    <MDBCarousel className='mt-3'>
      <MDBCarouselItem itemId={1}>
        <img src={Carousel1} className='d-block w-100' alt='...' style={{height:"580px"}} />
      </MDBCarouselItem>
      <MDBCarouselItem itemId={2}>
        <img src={Carousel2} className='d-block w-100' alt='...' style={{height:"580px"}} />
      </MDBCarouselItem>
      <MDBCarouselItem itemId={3}>
        <img src={Carousel3} className='d-block w-100' alt='...' style={{height:"580px"}} />
      </MDBCarouselItem>
    </MDBCarousel>
  );
}

export default Carousel;