import { useState, useEffect } from "react"
import { useAddNewContactMutation } from '../features/contact/contactApiSlice';
import { useNavigate } from "react-router-dom"
import { Button, Form, Input } from 'antd';
const { TextArea } = Input;



const USER_REGEX = /^[A-z]{3,20}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^[0-9]{10}$/


   
function AppContact(){
    const [addNewContact, {
        isSuccess,
    }] = useAddNewContactMutation()

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [validName, setValidName] = useState(false)
    const [phone, setPhone] = useState('')
    const [validPhone, setValidPhone] = useState(false)
    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [message, setMsg] = useState('')


    useEffect(() => {
        setValidName(USER_REGEX.test(name))
    }, [name])

   
    useEffect(() => {
        setValidPhone(PHONE_REGEX.test(phone))
    }, [phone])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email))
    }, [email])

    useEffect(() => {
        setMsg(message);
    }, [message]);

    useEffect(() => {
        if (isSuccess) {
            setName('')
            setPhone('')
            setEmail('')
            setMsg('')
            navigate('/')
        }
    }, [isSuccess, navigate])

    const handleNameChange = e => setName(e.target.value);

    const handlePhoneChange = e => setPhone(e.target.value);

    const handleEmailChange = e => setEmail(e.target.value);

    const handleMsgChange = e => setMsg(e.target.value);

    const onSaveContactClicked = async () => {
        try {
            if (validName  && validPhone && validEmail ) {
                await addNewContact({ name, phone, email, message });
            }
        } catch (error) {
            console.error('Error saving contact:', error);
        }
    };
    
    //const errClass = isError ? "errmsg" : "offscreen";

    return(
        <div className='block contactPage'>
            <div className='container'>
                <h2>Contact</h2>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    autoComplete="on"
                    onFinish={() => onSaveContactClicked()}>
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[{
                            required: true,
                            message: 'Please input your email!',
                            pattern: EMAIL_REGEX,
                        }]}>
                        <Input onChange={handleEmailChange} autoComplete='on' />
                    </Form.Item>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{
                            required: true,
                            message: 'Please input your username!',
                            pattern: USER_REGEX,
                        }]}>
                        <Input onChange={handleNameChange} autoComplete='on' />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[{
                            required: true,
                            message: 'Please input your phone number!',
                            pattern: PHONE_REGEX,
                        }]}>
                        <Input onChange={handlePhoneChange} autoComplete='on' />
                    </Form.Item>

                    <Form.Item
                     name="message"
                     label="Message"
                     rules={[
                     {
                         required: true,
                         message: 'Please input your message!',
                     },
                     ]}>
                    <TextArea onChange={handleMsgChange} rows={4} />

                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 8,span: 16, }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
export default AppContact;