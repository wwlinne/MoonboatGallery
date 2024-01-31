import aboutBanner from '../assets/images/aboutBanner.jpg'
import { Tabs } from 'antd';

function AppAbout(){
    return(
        <div className="block aboutPage">
            <div className="container">
                <h2>About</h2>
                <div className="bannerImage">
                <img src={aboutBanner} alt='banner'/>
                </div>
                <Tabs
                    defaultActiveKey="1"
                    items={[
                    {
                        label: 'About',
                        key: '1',
                        children:'Ready for a journey to the moon? Welcome aboard Linlin\'s MoonBoat Gallery! More than just a gallery, we\'re your ticket to the stars! And while you\'re here, we\'ve got all the essentials covered, from fresh fruits to hearty hot meals. Immerse yourself in a world of mesmerizing artworks that ignite imagination and beckon exploration. Each piece tells a tale as unique as the stars themselves. So why wait? Embark on your own artistic odyssey with us today. Explore, discover, and let your creativity soar!'
                    },
                    {
                        label: 'Investors',
                        key: '2',
                        children: 'Experience the future of artistic exploration and excellence at MoonBoat Gallery. ',
                    },
                    {
                        label: 'Careers',
                        key: '3',
                        children: 'Join the LinLin\'s MoonBoat family and embark on a rewarding career journey! ',
                    }
                    ]}
  />
            </div>
        </div>
    )
}
export default AppAbout;