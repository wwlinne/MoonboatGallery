import { Layout} from 'antd';import './App.css';
import{ Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import AppHeader from './components/common/header';
import AppHome from './pages/home';
import AppAbout from './pages/about';
import AppShop from './pages/shop';
import AppFaq from './pages/faq';
import AppContact from './pages/contact';
import APPAdmin from './pages/admin';
import UserList from "./features/user/userList";
import NoteList from "./features/note/noteList";
import Login from "./features/auth/login"
import EditUser from './features/user/EditUser'
import NewUserForm from './features/user/NewUserForm'
import EditNote from './features/note/EditNote'
import NewNote from './features/note/NewNote'
import Prefetch from './features/auth/Prefetch';
import PersistLogin from './features/auth/persistLogin';
import FooterWidgt from './components/common/footerWidget';
import FooterCopyright from './components/common/footerCopyright';
import { ROLES } from './config/roles'
import RequireAuth from './features/auth/RequireAuth';
import useTitle from './hooks/ustTitle';

const { Header, Footer, Content } = Layout;



function App() {
  useTitle('MoonBoat')
  return (
    <div className="App">
 <Layout >
      <Router>
      <Header >
        <AppHeader/>
      </Header>
      <Content >
       <Routes>

        <Route path='/' element = {<AppHome />} />
        <Route path='/pages/about' element = {<AppAbout />} />
        <Route path='/pages/shop' element = {<AppShop />} />
        <Route path='/pages/faq' element = {<AppFaq />} />
        <Route path='/pages/contact' element = {<AppContact />} />
        <Route path='/pages/admin' element = {<APPAdmin />} />
        <Route path="/users/new" element={<NewUserForm />} />
        <Route path="login" element={< Login/>} />
        <Route element={<PersistLogin />}>
        <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
        <Route element={<Prefetch />}>
        <Route path="users">
              <Route index element={<UserList />} />
              <Route path=":id" element={<EditUser />} />
            </Route>
        <Route path="notes">
              <Route index element={<NoteList />} />
              <Route path=":id" element={<EditNote />} />
              <Route path="new" element={<NewNote />} />
        </Route> 
        </Route>
        </Route>
        </Route>
       </Routes>
        </Content>
      </Router>
      <Footer >
        <FooterWidgt />
        <FooterCopyright />
      </Footer>
    </Layout>
    </div>
  );
}

export default App;
