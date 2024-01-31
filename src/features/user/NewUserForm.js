import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { ROLES } from "../../config/roles"
import { Button, Form, Input, Select } from 'antd';
const { Option } = Select;

const USER_REGEX = /^[A-z0-9]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{6,20}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^[0-9]{10}$/

const NewUserForm = () => {

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [validName, setValidName] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [phone, setPhone] = useState('')
    const [validPhone, setValidPhone] = useState(false)
    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [roles, setRoles] = useState(["Employee"])

    useEffect(() => {
        setValidName(USER_REGEX.test(name))
    }, [name])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        setValidPhone(PHONE_REGEX.test(phone))
    }, [phone])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email))
    }, [email])

    useEffect(() => {
        if (isSuccess) {
            setName('')
            setPassword('')
            setPhone('')
            setEmail('')
            setRoles([])
            navigate('/pages/admin')
        }
    }, [isSuccess, navigate])

    const handleNameChange = e => setName(e.target.value);

    const handlePasswordChange = e => setPassword(e.target.value);

    const handlePhoneChange = e => setPhone(e.target.value);

    const handleEmailChange = e => setEmail(e.target.value);

    const onRolesChanged = values => setRoles(values);

    const onSaveUserClicked = async () => {
        try {
            if (validName && validPassword && validPhone && validEmail && roles.length) {
                await addNewUser({ name, password, phone, email, roles });
            }
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };
    

    const options = Object.values(ROLES).map(role => (
        <Option key={role} value={role}>{role}</Option>
    ));

    const errClass = isError ? "errmsg" : "offscreen";
    //const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : '';

    return (
        <div className="block">
            <div className="container">
                <h2>Create New Account</h2>
                <p className={errClass}>{error?.data?.message}</p>

                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    autoComplete="on"
                    onFinish={() => onSaveUserClicked()}>
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
                            message: 'Please input your username! eg:user123',
                            pattern: USER_REGEX,
                        }]}>
                        <Input onChange={handleNameChange} autoComplete='on' />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{
                            required: true,
                            message: 'Please input your password! At least 6.',
                            pattern: PWD_REGEX,
                        }]}>
                        <Input.Password onChange={handlePasswordChange} />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[{
                            required: true,
                            message: 'Please input your phone number! 10 or 11.',
                            pattern: PHONE_REGEX,
                        }]}>
                        <Input onChange={handlePhoneChange} autoComplete='on' />
                    </Form.Item>
                  
                    <Form.Item
                        label="Assigned Roles"
                        name="roles"
                        rules={[{
                            required: true,
                            message: 'Please select at least one role! Different roles implement different functions.',
                        }]}>
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Select roles"
                            onChange={onRolesChanged}
                            value={roles}
                        >
                            {options}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" disabled={isLoading}>
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </Button>
                        <Button type="primary" onClick={() => navigate('/pages/admin')}>
                            Back
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
export default NewUserForm;
