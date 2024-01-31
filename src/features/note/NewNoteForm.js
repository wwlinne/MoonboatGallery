import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewNoteMutation } from "./notesApiSlice"
import {Form, Button, Input, Select} from 'antd'
const { TextArea } = Input;

const NewNoteForm = ({ users }) => {

    const [addNewNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewNoteMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [userId, setUserId] = useState(users[0].id)

   
    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/notes')
        }
    }, [isSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    //const onUserIdChanged = e => setUserId(e.target.value)
    //here should use input instead of e
    const onUserIdChanged = (input) => {
        setUserId(input);
    } 
    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
       // e.preventDefault()
        if (canSave) {
            await addNewNote({ user: userId, title, text })
        }
    }

    const options = users.map(user => {
        return (
            <Select.Option
                key={user.id}
                value={user.id}
            > {user.name}</Select.Option >
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    //const validTitleClass = !title ? "form__input--incomplete" : ''
    //const validTextClass = !text ? "form__input--incomplete" : ''

    const content = (
            <div className="block">
            <div className="container">
                <h2>Create New Note</h2>
                <p className={errClass}>{error?.data?.message}</p>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={() => onSaveNoteClicked()}>
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[{
                                required: true,
                                message: 'Please input your title!',
                            }]}>
                            <Input   value={title} onChange={onTitleChanged}  />
                        </Form.Item>
                        <Form.Item
                            name="text"
                            label="Text"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your message!',
                            },
                            ]}>
                            <TextArea  id="text" name="text"  value={text} onChange={onTextChanged} rows={4} />

                        </Form.Item>
                        <Form.Item
                                label="Assigned To:"
                                name="username"
                                rules={[{
                                    required: true,
                                    message: 'Please select at least one user!',
                                }]}>
                                <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    placeholder="Select roles"
                                    id="username"
                                    name="username"
                                    onChange={onUserIdChanged}
                                    value={userId}
                                    >
                                    {options}
                                </Select>
                            </Form.Item>

                         <Form.Item wrapperCol={{offset: 8,span: 16,}}>
                        <Button type="primary" htmlType="submit"    disabled={!canSave}>
                            Submit
                        </Button>
                        <Button type="primary" onClick={() => navigate('/pages/admin')}>
                            Back
                        </Button>
                    </Form.Item>
                </Form>
    
            </div>
            </div>

    )

    return content
}

export default NewNoteForm