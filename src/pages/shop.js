import { Col, Row, Button, Dropdown } from 'antd';
const products = [
    {
        key: '1',
        image: require('../assets/images/img1.jpg'),
        title: 'Farm-fresh strawberries',
        description: 'Bursting with sweetness, picked at peak ripeness for a delightful treat.',
        price: '$4.90/LB'
      },
      {
        key: '2',
        image: require('../assets/images/img2.jpg'),
        title: 'Handpicked-juicy pears',
        description: 'Perfectly balanced between sweetness and crispness.',
        price: '$2.80/LB'
      },
      {
        key: '3',
        image: require('../assets/images/img3.jpg'),
        title: 'Naturally-sweet grapes',
        description: 'Freshly harvested for a burst of flavor and nutrients.',
        price: '$3.70/LB'
      },
      {
        key: '4',
        image: require('../assets/images/img4.jpg'),
        title: 'Fresh Fruit Medley',
        description: 'A vibrant mix of fruits, each picked at its peak for a delightful assortment of flavors.',
        price: '$9.99/EA'
      },
      {
        key: '5',
        image: require('../assets/images/img5.jpg'),
        title: 'Fresh Seafood, Ocean Bounty Delights',
        saleprice: '$40.00/LB',
        price: '$35.50/LB'
      },
      {
        key: '6',
        image: require('../assets/images/img6.jpg'),
        title: 'Botanical Elegance, Lush Succulent Haven',
        saleprice: '$15.00/EA',
        price: '$9.90/EA'
      },
      {
        key: '7',
        image: require('../assets/images/img7.jpg'),
        title: 'Freshly Squeezed Fruit Juice, Pure Bliss Juices',
        saleprice: '$2.00/EA',
        price: '$1.50/EA'
      },
      {
        key: '8',
        image: require('../assets/images/img8.jpg'),
        title: 'Sushi Platter, Enjoy Sushi Symphony',
        saleprice: '$20.00/EA',
        price: '$14.99/EA'
      }
    ]
    const items = [
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              Featured
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
              Low to High
            </a>
          ),
        },
        {
          key: '3',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
              High to Low
            </a>
          ),
        },
      ];
      
function AppShop(){
    return(
        <div className='block products shopPage'>
        <div className='container'>
            <div className='titleHolder'>
                <h2>Gallery</h2>
                <Dropdown
                    menu={{
                    items,
                    }}
                    placement="bottom"
                >
        <Button>Sort By</Button>
      </Dropdown>
            </div>
            <Row gutter={24}>{
                products.map(product =>{
                        return(
                        <Col lg={6}key={product.key} >
                        <div className='content'>
                        <div className='image'>
                            <img src={product.image} alt = 'product' />
                        </div>
                        <h3 className='exception'>{product.title}</h3>
                       {/*  <div className='price'>{product.price}</div>
                        <Button type="primary">Add to bsket</Button> */}
                    </div>
                </Col>
                        )
                    })
}
                
            </Row>
        </div>
        </div>
    )
}
export default AppShop;