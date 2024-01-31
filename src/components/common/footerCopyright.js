import { FloatButton } from 'antd';
import payment from '../../assets/images/payment.png';
import useAuth from "../../hooks/useAuth"

function FooterCopyright(){
    const { email, status } = useAuth()

    return(
        <div className="footerCopyright">
            <div className="container">

                <p>Current User: {email} Status: {status}</p>
                <div className="copyright">@2024 MoonBoat by LinLin</div>
                <div className="toTop">
                    <img src={payment} alt="payment" />
                </div>
            </div>
        <FloatButton.BackTop></FloatButton.BackTop>
        </div>
    )
}
export default FooterCopyright;