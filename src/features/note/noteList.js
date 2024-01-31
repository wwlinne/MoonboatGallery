import { useGetNotesQuery } from "./notesApiSlice"
import Note from "./Note"
import { Button } from "antd"
import {  useNavigate } from "react-router-dom"


const NotesList = () => {
    const navigate = useNavigate()
    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery(undefined, {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = notes
        let createBtn = null
        
        createBtn = (
                    <Button id="create"
                    onClick={() => navigate('/notes/new')}>
                    Create New Note
                </Button>
                )
            
        
        const tableContent = ids?.length
            ? ids.map(noteId => <Note key={noteId} noteId={noteId} />)
            : null

        content = (
            <div className="block">
                <div className="container">
                    {createBtn}
                    <table className="table table--notes">
                        <thead className="table__thead">
                            <tr>
                                <th scope="col" className=" note__status">Status</th>
                                <th scope="col" className=" note__created">Created</th>
                                <th scope="col" className=" note__updated">Updated</th>
                                <th scope="col" className=" note__title">Title</th>
                                <th scope="col" className=" note__username">Owner</th>
                                <th scope="col" className=" note__edit">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableContent}
                        </tbody>
                    </table>
                 </div>
            </div>
        )
    }
   
    return content
}
export default NotesList