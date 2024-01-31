import { Col, Row } from 'antd';
import { Carousel } from 'antd';

import img1 from '../../assets/images/banner-img1.jpg';
import img2 from '../../assets/images/banner-img2.jpg';
import img3 from '../../assets/images/banner-img3.jpg';


function Hero(){
    return(
    <div className='heroBlock'>
    <Row  gutter={[24,24]}>
    {/** carousel */}
      <Col xs={24} lg={18}>
        <Carousel autoplay>
          <div>
            <img src={img1} alt="banner 1"/>
        </div>
          <div>
            <img src={img2} alt="banner 2"/>
          </div>
          <div>
            <img src={img3} alt="banner 3"/>
          </div>

        </Carousel>
      </Col >
    {/** info block */}
    <Col xs={24}lg={6}>
      <div className='heroBlocks'>
        <div className='holder'>
          <div className='icon'>
            <i class="fa-solid fa-rocket"></i>
          </div>
          <div className='content'>
            <h3>Moonboat </h3>
            <p>Your Voyage to the Moon and Beyond</p>
          </div>
        </div>
        <div className='holder'>
          <div className='icon'>
            <i class="fa-solid fa-camera"></i>
          </div>
          <div className='content'>
            <h3>Where Art Speaks</h3>
            <p>Discover, Engage, Inspire</p>
          </div>
        </div>
        <div className='holder'>
          <div className='icon'>
            <i class="fa-solid fa-headset"></i>
          </div>
          <div className='content'>
            <h3>Online Support</h3>
            <p>Excepteur sint occaecat cupidatat</p>
          </div>
       </div>
      </div>
    </Col>
    </Row>
   </div>
    )
}
export default Hero;