import { useState, useEffect } from "react"
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { ROLES } from "../../config/roles"
import {Button, Form, Input, Select} from "antd"
import useAuth from "../../hooks/useAuth"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,20}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^[0-9]{10,11}$/


const EditUserForm = ({ user }) => {

    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation()

    const navigate = useNavigate()

    const [name, setName] = useState(user.name)
    const [validName, setValidName] = useState(false)
    
    const [email, setEmail] = useState(user.email || '');
    const [validEmail, setValidEmail] = useState(false)

    const [phone, setPhone] = useState(user.phone || '');
    const [validPhone, setValidPhone] = useState(false)

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)

    const [roles, setRoles] = useState(user.roles)
    const [active, setActive] = useState(user.active)

    useEffect(() => {
        setValidName(USER_REGEX.test(name))
    }, [name])
    useEffect(() => {
            setValidEmail(EMAIL_REGEX.test(email))
        }, [email])

    useEffect(() => {
            setValidPhone(PHONE_REGEX.test(phone))
        }, [phone])
    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
            setName('')
            setEmail('')
            setPhone('')
            setPassword('')
            setRoles([])
            navigate('/users')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onNameChanged = e => setName(e.target.value)
    const handleEmailChange = e => setEmail(e.target.value);
    const handlePhoneChange = e => setPhone(e.target.value);
    const onPasswordChanged = e => setPassword(e.target.value)
  
    
     const onRolesChanged = (input) => {
        setRoles(input);
    } 
    

    const onActiveChanged = () => setActive(prev => !prev)

    const onSaveUserClicked = async (e) => {
        if (password) {
            await updateUser({ id: user.id, name, email, phone, password, roles, active })
        } else {
            await updateUser({ id: user.id, name, email, phone, roles, active })
        }
    }

    const onDeleteUserClicked = async () => {
        await deleteUser({ id: user.id })
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <Select.Option
                key={role}
                value={role}

            > {role}</Select.Option >
        )
    })

    let canSave
    if (password) {
        canSave = [roles.length, validName, validEmail, validPhone, validPassword].every(Boolean) && !isLoading
    } else {
        canSave = [roles.length, validName, validEmail, validPhone].every(Boolean) && !isLoading
    }

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    //const validUserClass = !validName ? 'form__input--incomplete' : ''
    //const validPwdClass = password && !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''
    const { isAdmin } = useAuth()
    let deleteBtn = null
    if (isAdmin) {
            deleteBtn = (
                <Button id="delete"
                onClick={onDeleteUserClicked}
                    >Delete
            </Button>
            )
        }
    

    const content = (

        <>
          <div className="block">
          <div className="container">

                    <h2>Edit User</h2>
                 
            <p className={errClass}>{errContent}</p>

            <Form 
             name="basic"
             labelCol={{ span: 8 }}
             wrapperCol={{ span: 16 }}
             style={{ maxWidth: 600 }}
             initialValues={{ remember: true }}
             autoComplete="on"
             className="form" 
             onSubmit={e => e.preventDefault()}>
                <Form.Item
                        label="Email"
                        rules={[{
                            required: true,
                            message: 'Please input your email!',
                            pattern: EMAIL_REGEX,
                        }]}
                    >
                        <Input onChange={handleEmailChange} autoComplete='off' id="email" name="email" value={email} />
                    </Form.Item>
                <Form.Item
                        label="name"
                        
                        rules={[{
                            required: true,
                            message: 'Please input your name!',
                            pattern: USER_REGEX,
                        }]}
                    >
                        <Input onChange={onNameChanged} autoComplete='off' id="name" name="name" value={name}/>
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        rules={[{
                            message: 'Please input your password!',
                            pattern: PWD_REGEX,
                        }]}
                    >
                        <Input.Password onChange={onPasswordChanged} />
                    </Form.Item>
                <Form.Item
                        label="Phone"
                        rules={[{
                            required: true,
                            message: 'Please input your phone number!',
                            pattern: PHONE_REGEX,
                        }]}
                    >
                        <Input onChange={handlePhoneChange} autoComplete='off' id="phone" name="phone" value={phone} />
                    </Form.Item>
                  
                <Form.Item label="Active:">
               
                    <Input
                        className="form__checkbox"
                        id="user-active"
                        name="user-active"
                        type="checkbox"
                        checked={active}
                        onChange={onActiveChanged}
                    />
               
                </Form.Item>
                <Form.Item label ="Assigned Roles">
                
                
                 <Select
                    id="roles"
                    name="roles"
                    className={`form__select ${validRolesClass}`}
                    mode="multiple"
                    value={roles}
                    onChange={onRolesChanged} // Updated to pass values directly
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
            <Button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveUserClicked}
                            disabled={!canSave}
                        >Submit
                        </Button>
                       {deleteBtn}
                        </Form.Item>
        </Form>
        </div>
        </div>

        </>
    )
    return content
}
export default EditUserForm