import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { AdminSignout } from "../admin-signout/admin-signout";
import { useEffect } from "react";


export function AdminDefined(){

    const[cookies,setCookie,removeCookie] = useCookies();



    useEffect(()=>{

    },[]);

    return(
        <>
         {
            cookies['adminName']==undefined?
            <div>
                <Link to="/userlogin" className='btn btn-light'>User Signin</Link>
                <Link to="/adminlogin" className='btn btn-light ms-2'>Admin Dashboard</Link>
            </div> :
            <div>
                <Link to="/admindashboard" className='text-white text-decoration-none' >{cookies['adminName']}</Link>
                <AdminSignout/>
            </div>
          }
        
        </>
    )
}