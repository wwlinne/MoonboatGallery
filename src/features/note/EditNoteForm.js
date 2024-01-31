import { useState, useEffect } from "react"
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice"
import { useNavigate } from "react-router-dom"
import {Button, Form, Input, Select} from "antd"
import useAuth from "../../hooks/useAuth"
const {TextArea} = Input

const EditNoteForm = ({ note, users }) => {

    const { isManager, isAdmin } = useAuth()

    const [updateNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateNoteMutation()

    const [deleteNote, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteNoteMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState(note.title)
    const [text, setText] = useState(note.text)
    const [completed, setCompleted] = useState(note.completed)
    const [userId, setUserId] = useState(note.user)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/notes')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onCompletedChanged = e => setCompleted(prev => !prev)
    //const onUserIdChanged = e => setUserId(e.target.value)
    const onUserIdChanged = (input) => {
        setUserId(input);
    } 
    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
        if (canSave) {
            await updateNote({ id: note.id, user: userId, title, text, completed })
        }
    }

    const onDeleteNoteClicked = async () => {
        await deleteNote({ id: note.id })
    }

    const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const options = users.map(user => {
        return (
            <Select.Option
                key={user.id}
                value={user.id}

            > {user.name}</Select.Option >
        )
    })

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    //const validTitleClass = !title ? "form__input--incomplete" : ''
    //const validTextClass = !text ? "form__input--incomplete" : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''
   
    let deleteBtn = null
    if (isManager || isAdmin) {
        deleteBtn = (
            <Button id="delete"
            onClick={onDeleteNoteClicked}
                >Delete
        </Button>
        )
    }

    

    const content = (
        
        <div className="block">
            <div className="container">

                <h2>Edit Note #{note.ticket}</h2>
                 
                <p className={errClass}>{errContent}</p>
                <Form   name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={() => onSaveNoteClicked()}>
                         <Form.Item
                            label="Title"
                           
                            rules={[{
                                required: true,
                                message: 'Please input your title!',
                            }]}>
                            <Input   name="title" value={title} onChange={onTitleChanged}  />
                        </Form.Item>
                        <Form.Item
                            label="Text"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your message!',
                            },
                            ]}>
                            <TextArea  id="text" name="text"  value={text} onChange={onTextChanged} rows={4} />

                        </Form.Item>
                      
              
               
                <Form.Item label="Note Status:">
                    <Input
                        className="form__checkbox"
                        id="note-completed"
                        name="completed"
                        type="checkbox"
                        checked={completed}
                        onChange={onCompletedChanged}
                    />
                </Form.Item>
                <Form.Item
                                label="Assigned To:"
                                rules={[{
                                    required: true,
                                    message: 'Please select at least one user!',
                                }]}>
                                <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    placeholder="Select roles"
                                    id="note-username"
                                    name="username"
                                    onChange={onUserIdChanged}
                                    value={userId}
                                    >
                                    {options}
                                </Select>
                </Form.Item>
                    <Form.Item  wrapperCol={{offset: 8,span: 16,}}>
                        <p className="form__created">Created:<br />{created}</p>
                        <p className="form__updated">Updated:<br />{updated}</p>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 8,span: 16,}}>
                                    <Button
                                    className="icon-button"
                                        title="Save"
                                        onClick={onSaveNoteClicked}
                                        disabled={!canSave}
                                        >Submit
                                    </Button>
                                    {deleteBtn}
                        </Form.Item>
                </Form>
                </div>
            </div>

    )

    return content
}

export default EditNoteForm