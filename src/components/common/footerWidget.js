import { Col, Row } from 'antd';
import { Avatar, List, Tag  } from 'antd';

const featured = [
    {
      image: require('../../assets/images/img-footer1.jpg'),
      title: 'Shine-Muscat Grape',
      cost: '£2.50',
      cate: 'fruit',
      link: 'https://www.google.com/'
    },
    {
      image: require('../../assets/images/img-footer2.jpg'),
      title: 'Fragaria Vesca',
      cost: '£3.50',
      cate: 'fruit',
      link: 'https://www.google.com/'
    },
    {
      image: require('../../assets/images/img-footer3.jpg'),
      title: 'Assorted Fruit & Vegetable',
      cost: '£2.50',
      cate: 'fruit',
      link: 'https://www.google.com/'
    },
  ];
  const top = [
    {
      image: require('../../assets/images/img-footer4.jpg'),
      title: 'Aromatic Condiments',
      cost: '£2.50',
      cate: 'Flavor',
      link: 'https://www.google.com/'
    },
    {
      image: require('../../assets/images/img-footer5.jpg'),
      title: 'Eggplant',
      cost: '£3.50',
      cate: 'vegetable',
      link: 'https://www.google.com/'
    },
    {
      image: require('../../assets/images/img-footer6.jpg'),
      title: 'Veggie Combo',
      cost: '£2.50',
      cate: 'vegetable',
      link: 'https://www.google.com/'
    },
  ];
  const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];
function FooterWidgt(){
    return(
        <div className='footerWidget'>
        <div className="container">
          <Row gutter={[24, 24]}>
                    {/* featured */}
                    <Col xs={{ span: 24 }} sm={{ span: 12 }} md={6}>
                        <h3>Featured</h3>
                        <List
                        itemLayout="horizontal"
                        dataSource={featured}
                        renderItem={item => (
                            <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={item.image} />}
                                title={<a style={{color: 'white'}} href={item.link}>{item.title}</a>}
                                description={<span style={{ color: 'rgb(175 213 242)' }}>{item.cate}</span>}
                          />
                            </List.Item>
                        )}
                        />
                    </Col>
                     {/* top related */}
                     <Col xs={{ span: 24 }} sm={{ span: 12 }} md={6}>
                     <h3>Top Rated</h3>
                        <List
                            itemLayout="horizontal"
                            dataSource={top}
                            renderItem={(item) => (
                          <List.Item>
                          <List.Item.Meta
                          avatar={<Avatar src={item.image} />}
                          title={<a style={{color: 'white'}} href={item.link}>{item.title}</a>}
                          description={<span style={{ color: 'rgb(175 213 242)' }}>{item.cate}</span>}
                                                  />
                        </List.Item>
                    )}
                />
                    </Col>
                     {/* tags */}
                     <Col sm={12} md={6}>
                        <div className='tags'>
                        <h3>Tags</h3>
                        <Tag>Frozen</Tag>
                        <Tag><a href="https://github.com/ant-design/ant-design/issues/1862">Kitchen</a></Tag>
                        <Tag closable>Drinks</Tag>
                        <Tag closable>Beer &amp; Wine</Tag>
                        <Tag>Chocolates</Tag>
                        </div>
                    </Col>
                     {/* recent posts */}
                     <Col sm={12} md={6}>
                     <h3>Recent Posts</h3>
                     <List
                            size="small"
                            className='recentPost'
                            dataSource={data}
                            renderItem={(item) => <List.Item>{item}</List.Item>}
    />
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default FooterWidgt;