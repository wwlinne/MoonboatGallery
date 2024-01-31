import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {Form, Input, Button} from 'antd'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist'
import useTitle from '../../hooks/ustTitle'

const Login = () => {
    useTitle('Visitor Login')



    const userRef = useRef()
    const errRef = useRef()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

   
    const handleSubmit = async (e) => {
       // e.preventDefault()
        try {
            const { accessToken } = await login({ email, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setEmail('')
            setPassword('')
            navigate('/pages/admin')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing email or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized, wrong email or password');
            } else {
                setErrMsg(err.data?.message);
            }
            if (errRef.current) {
                errRef.current.focus();
            }        }
    }

    const handleUserInput = (e) => setEmail(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleToggle = () => setPersist(prev => !prev)
  
    //const errClass = errMsg ? "errmsg" : "offscreen"

    if (isLoading) return <p>Loading...</p>

    const content = (
        <div className='block'>
            <div className='container'>
                <h2>Admin Login</h2>
          
                <p ref={errRef} aria-live="assertive">{errMsg}</p>

                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    autoComplete="on"
                    onFinish={handleSubmit}
                    >
                    
                       <Form.Item label="Email" name="email" rules={[{required: true,message: 'Please input your email!' }]}>
                            <Input  
                            type="text"
                            id="email"
                            ref={userRef}
                            value={email}
                            onChange={handleUserInput}
                            autoComplete="on"
                            required />
                        </Form.Item>
                             <Form.Item label="Password" name="password" rules={[{required: true,message: 'Please input your password!' }]}>
                                <Input  
                                type="password"
                                id="password"
                                onChange={handlePwdInput}
                                value={password}
                                required/>
                            </Form.Item>
                        <Form.Item  wrapperCol={{ offset: 8,span: 16,}}>
                            <Button type="primary" htmlType="submit">Sign In
                            </Button>
                            <Button type="primary" onClick={() => navigate('/pages/admin')}>
                                Back
                            </Button>
                          
                     </Form.Item>
                     <Form.Item  wrapperCol={{ offset: 8,span: 16,}}>
                        <label >
                                <input
                                    type="checkbox"
                                    id="persist"
                                    onChange={handleToggle}
                                    checked={persist}
                                />
                                    Trust This Device
                                </label>
                     </Form.Item>

                </Form>

        </div>
        </div>
    )

    return content
}
export default Login