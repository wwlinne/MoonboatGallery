import { Col, Row } from 'antd';
const products = [
    {
      key: '1',
      image: require('../../assets/images/img1.jpg'),
      title: 'Farm-fresh strawberries',
      description: 'Bursting with sweetness, picked at peak ripeness for a delightful treat.',
      price: '$4.90/LB'
    },
    {
      key: '2',
      image: require('../../assets/images/img2.jpg'),
      title: 'Handpicked-juicy pears',
      description: 'Perfectly balanced between sweetness and crispness.',
      price: '$2.80/LB'
    },
    {
      key: '3',
      image: require('../../assets/images/img3.jpg'),
      title: 'Naturally-sweet grapes',
      description: 'Freshly harvested for a burst of flavor and nutrients.',
      price: '$3.70/LB'
    },
    {
      key: '4',
      image: require('../../assets/images/img4.jpg'),
      title: 'Fresh Fruit Medley',
      description: 'A vibrant mix of fruits, each picked at its peak for a delightful assortment of flavors.',
      price: '$9.99/EA'
    }
  ]
function RecentProducts(){
    return(
        <div className="block products">
            <h2>Recents</h2>
            <Row gutter={[24,24]}>
                {
                   products.map(product =>{
                        return(
                        <Col xs={24} sm={12} lg={6} key={product.key}>
                        <div className='content'>
                        <div className='image'>
                            <img src={product.image} alt = 'product' />
                        </div>
                        <h3 className='exception'>{product.title}</h3>
                        <p >{product.description}</p>
                       {/*  <div className='price'>{product.price}</div>
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
export default RecentProducts;