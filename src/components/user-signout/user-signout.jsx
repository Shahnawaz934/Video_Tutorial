import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function UserSignOut()
{
    const[cookies,setCookie,removeCookie] = useCookies();
    const navigate = useNavigate();

    function handleSignout(){
        removeCookie("userName");
        navigate("/userlogin");
    }

    return(
        <>
            <button onClick={handleSignout} className="btn btn-danger ms-2">Sign Out</button>
        </>
    )
}