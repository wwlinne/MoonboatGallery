import { Col, Row } from 'antd';
const products = [
  {
    key: '1',
    image: require('../../assets/images/img5.jpg'),
    title: 'Fresh Seafood, Ocean Bounty Delights',
    saleprice: '$40.00/LB',
    price: '$35.50/LB'
  },
  {
    key: '2',
    image: require('../../assets/images/img6.jpg'),
    title: 'Botanical Elegance, Lush Succulent Haven',
    saleprice: '$15.00/EA',
    price: '$9.90/EA'
  },
  {
    key: '3',
    image: require('../../assets/images/img7.jpg'),
    title: 'Freshly Squeezed Fruit Juice, Pure Bliss Juices',
    saleprice: '$2.00/EA',
    price: '$1.50/EA'
  },
  {
    key: '4',
    image: require('../../assets/images/img8.jpg'),
    title: 'Sushi Platter, Enjoy Sushi Symphony',
    saleprice: '$20.00/EA',
    price: '$14.99/EA'
  }
]

function SaleProducts(){
    return(
        <div className="block products">
            <h2>Selected</h2>
            <Row gutter={[24,24]}>
                {
                   products.map(product =>{
                        return(
                        <Col sm={12} lg={6} key={product.key}>
                        <div className='content'>
                        <div className='image'>
                            <img src={product.image} alt = 'product' />
                        </div>
                        <h3 className='exception'>{product.title}</h3>
                        {/* <div className='price'>
                          <span className='salePrice'>{product.saleprice}</span>
                          {product.price}
                        </div>
                        <Button type="primary">Add to bsket</Button> */}
                    </div>
                </Col>
                        )
                    })
                }
                
            </Row>
        </div>
    )
}
export default SaleProducts;