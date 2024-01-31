import { useNavigate } from 'react-router-dom'
import {Button} from 'antd'
import { useGetUsersQuery } from './usersApiSlice'
import { memo } from 'react'

const User = ({ userId }) => {
    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        }),
    })

    const navigate = useNavigate()

    if (user) {
        const handleEdit = () => navigate(`/users/${userId}`)

        const userRolesString = user.roles.toString().replaceAll(',', ', ')

        const cellStatus = user.active ? '' : 'table__cell--inactive'

        return (
            <tr className="table__row user">
                <td className={`table__cell ${cellStatus}`}>{user.name}</td>
                <td className={`table__cell ${cellStatus}`}>{user.email}</td>
                <td className={`table__cell ${cellStatus}`}>{user.phone}</td>
                <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
                <td className={`table__cell ${cellStatus}`}>
               <Button type="primary" style={{marginRight: "10px"}} onClick={() => handleEdit()}>
                                     Edit</Button>
               </td>
            </tr>
        )

    } else return null
}
const memoizedUser = memo(User)

export default memoizedUser