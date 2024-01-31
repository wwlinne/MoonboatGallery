import { Col, Row } from 'antd';
import bgImg1 from '../../assets/images/ad-img1.png';
import bgImg2 from '../../assets/images/ad-img2.png';

function Information(){
    return(
        <div className='block informationBlock'>
            <Row gutter={[24,24]}>
             <Col xs={24} md={12}>
                <div className='holder' 
                style={{backgroundImage: `url(${bgImg1})`,
                backgroundRepeat:'no-repeat'
                }}>
                    <h3>Everday essentials offer</h3>
                    <div className='price'>Fruit</div>
                </div>
             </Col>
             <Col xs={24} md={12}>
             <div className='holder' style={{backgroundImage: `url(${bgImg2})`,
                backgroundRepeat:'no-repeat'
                }}>
                    <h3>Same day delivery</h3>
                    <p>Free when you back to the Earth</p>
                </div>
             </Col>
            </Row>
        </div>
    )
}
export default Information;