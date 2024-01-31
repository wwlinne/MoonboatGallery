import{ NavLink,Route, Routes  } from 'react-router-dom';
import { Card, Row, Col } from 'antd';
import UserList from "../features/user/userList";
import NoteList from "../features/note/noteList";
import NewUserForm from '../features/user/NewUserForm';



export default function APPAccount(){

    return(
        <div className='block '>
            <div className='container'>
            <h2>Admin Panel</h2>
            <div className='card'>
                <Row gutter={[24,24]}>
                <Col xs={24 } sm={24} md={8} lg={8}>
                    <Card
                        title="CREATE"
                        bordered={false}
                        style={{width: 300,
                        }}
                    >
                        <p><NavLink to='/users/new'>Create New Account</NavLink></p>
                        <p>Create a new account today to unlock exclusive features tailored to elevate your artistic journey. </p>
                    </Card>
                    </Col>
            
                  
                    <Col xs={24 } sm={24} md={8} lg={8}>
                    <Card
                        title="INFO"
                        bordered={false}
                        style={{width: 300,
                        }}
                    >
                        <p><NavLink to='/notes'>There Has Clouds</NavLink></p>
                        <p>Hi, I'm LinLin. If you'd like to get in touch with me, please leave your message at Contact. </p>
                    </Card>
                    </Col>
                    <Col xs={24 } sm={24} md={8} lg={8}>
                    <Card
                        title="CHECK"
                        bordered={false}
                        style={{width: 300,
                        }}
                    >
                         <p><NavLink to='/users'>Manage User Accounts</NavLink></p>
                        <p>Administrate user profiles and settings with ease. Only Admin Role can delete user account.</p>
                    </Card>
                    </Col>
                   
                </Row>
           

                <Routes>
                    <Route path="/users" element={<UserList />} />
                    <Route path="/users/new" element={< NewUserForm/>} />
                    <Route path="/notes" element={<NoteList />} />
                </Routes>
            </div>
        </div>
        </div>
        
    )
}