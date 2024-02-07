import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { Button } from '@mui/material'; 
import { VideosMain } from './components/videos-main/videos-main';
import { UserRegister } from './components/user-register/user-register';
import { UserLogin } from './components/user-login/user-login';
import { UserDashboard } from './components/user-dashboard/user-dashboard';
import { AdminLogin } from './components/admin-login/admin-login';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';
import { ViewVideo } from './components/view-video/view-video';
import { EditVideo } from './components/edit-video/edit-video'
import { DeleteVideo } from './components/delete-video/delete-video';
import { AddVideo } from './components/add-video/add-video';
//import { AdminSignInOut } from './components/signinout-button/signinout-button';
import { AdminSignout } from './components/admin-signout/admin-signout';
import { UserSignOut } from './components/user-signout/user-signout';
import { UserDefined } from './components/user-defined/user-defined';
import { AdminDefined } from './components/admin-defined/admin-defined';

function App() {
  const[cookies,setCookie,removeCookie] = useCookies();
  return (
    <div className="container-fluid">
      <div className='container-fluid bg-dark text-light' style={{height:'80ch'}}>
      <BrowserRouter>
        <header className='p-2 d-flex justify-content-between'>
          <div>
            <span className='h3 p-2 rounded rounded-2' ><Link  style={{color:'white',textDecoration:'none'}} to='/'>Video Tutorial</Link></span>
            
          </div>
          <div>
            {
              (cookies['userName'])?<UserDefined/>:<AdminDefined/>
            }
          </div>
          {/* <div>
            <Link to='/userlogin' className='btn btn-light me-2'>User Signin</Link>
            <Link to='/adminlogin' className='btn btn-light'><span className='bi bi-person-fill'>Admin Dashboard</span></Link>
          </div> */}
        </header>
        <section>
          <Routes>
            <Route path='/'  element={<VideosMain/>} />
            <Route path='uregister' element={<UserRegister/>} />
            <Route path='userlogin' element={<UserLogin/>} />
            <Route path='userdashboard' element={<UserDashboard/>} />
            <Route path='adminlogin' element={<AdminLogin/>} />
            <Route path='admindashboard' element={<AdminDashboard/>} />
            <Route path='viewvideo/:id' element={<ViewVideo/>}/>
            <Route path='editvideo/:id' element={<EditVideo/>}/>
            <Route path='deletevideo/:id' element={<DeleteVideo/>}/>
            <Route path='addvideo' element={<AddVideo/>} />
            <Route path='admin-defined' element={<AdminDefined/>}/>
            {/* <Route path='signinout-button' element={<AdminSignInOut/>} /> */}
            <Route path='admin-signout' element={<AdminSignout/>}/>
            <Route path='user-signout' element={<UserSignOut/>}/>
            <Route path='user-defined' element={<UserDefined/>}/>
            
          </Routes>
        </section>
      </BrowserRouter>
    </div>
    </div>
  );
}

export default App;
