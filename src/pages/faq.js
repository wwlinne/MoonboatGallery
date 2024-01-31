import { Collapse } from 'antd';
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const items = [
    {
      key: '1',
      label: 'Delivery and collection information',
      children: <p>{text}</p>,
    },
    {
      key: '2',
      label: 'What do I need to know about ordering online',
      children: <p>{text}</p>,
    },
    {
      key: '3',
      label: 'Returns and refunds',
      children: <p>{text}</p>,
    },
    {
        key: '4',
        label: 'Managing my account',
        children: <p>{text}</p>,
      },
      {
        key: '5',
        label: 'Techinical issues',
        children: <p>{text}</p>,
      },
      {
        key: '6',
        label: 'Terms and conditions',
        children: <p>{text}</p>,
      },
      {
        key: '7',
        label: 'Ratings and reviews',
        children: <p>{text}</p>,
      },
  ];
function AppFaq(){
    return(
        <div className='block faqPage'>
            <div className='container'>
                <h2>FAQ</h2>
                <Collapse accordion items={items} defaultActiveKey={['1']}  />

            </div>
        </div>
    )
}
export default AppFaq;