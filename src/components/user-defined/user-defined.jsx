import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { UserSignOut } from "../user-signout/user-signout"; 
import { useEffect } from "react";


export function UserDefined(){

    const[cookies,setCookie,removeCookie] = useCookies();



    useEffect(()=>{

    },[]);

    return(
        <>
         {
            cookies['userName']==undefined?
            <div>
                <Link to="/userlogin" className='btn btn-light'>User Signin</Link>
                <Link to="/adminlogin" className='btn btn-light ms-2'>Admin Dashboard</Link>
            </div> :
            <div>
                <Link to="/userdashboard" className='text-white text-decoration-none' >{cookies['userName']}</Link>
                <UserSignOut/>
            </div>
          }
        
        </>
    )
}