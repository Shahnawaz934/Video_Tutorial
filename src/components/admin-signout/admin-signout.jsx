import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function AdminSignout()
{
    const[cookies,setCookie,removeCookie] = useCookies();
    const navigate = useNavigate();

    function handleSignout(){
        removeCookie("adminName");
        navigate("/adminlogin");
    }

    return(
        <>
            <button onClick={handleSignout} className="btn btn-danger ms-2">Sign Out</button>
        </>
    )
}