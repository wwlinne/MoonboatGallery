import { useGetNotesQuery } from './notesApiSlice'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import {Button} from 'antd'


const Note = ({ noteId }) => {

    const navigate = useNavigate()

    const { note } = useGetNotesQuery("notesList", {
        selectFromResult: ({ data }) => ({
            note: data?.entities[noteId]
        }),
    })


    if (note) {
        const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/notes/${noteId}`)

        return (
          
            <tr className="table__row">
                <td className=" note__status">
                    {note.completed
                        ? <span className="note__status--completed">Completed</span>
                        : <span className="note__status--open">Open</span>
                    }
                </td>
                <td className=" note__created">{created}</td>
                <td className=" note__updated">{updated}</td>
                <td className=" note__title">{note.title}</td>
                <td className=" note__username">{note.username}</td>

                <td className="">
                <Button type="primary" style={{marginRight: "10px"}} onClick={() => handleEdit()}>
                                     Edit</Button>
              
                </td>
            </tr>
          
        )

    } else return null
}
const memoizedNote = memo(Note)
export default memoizedNote