import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// function RegisterLink(){
//     return(
//         <div>
//             <Link to="/uregister" className="btn btn-light mt-3">Account Not Found - Register</Link>
//         </div>
//     )
// }


export function VideosMain(){

    const [users,setUsers] = useState([{UserId:'',UserName:'',Password:'',Email:'',Mobile:''}]);
    const [userEmail, setUserEmail] = useState();
    const [userError,setUserError] = useState('');

    const navigate = useNavigate('');



    useEffect(()=>{
        axios.get('http://127.0.0.1:5000/users')
        .then(response =>{
            setUsers(response.data);
        })
    },[]);


    function handleEmailChange(e){
       setUserEmail(e.target.value);
    }

    function handleGetStartedClick(){
        var user = users.find(item =>
            item.Email==userEmail
        );
        if(user){
            navigate('/userlogin');
        }
        else{
            navigate('/uregister');
        }
        // if(user==undefined){
        //     setUserError(<RegisterLink/>)
        // }
    }

    return(
        <div className="container-fluid">
            <main className="d-flex justify-content-center mt-4 ">
                <div>
                    <h1>Watch Videos Any Where</h1>
                    <p className="text-center mt-4 mb-4">Please register for more technology videos</p>
                    <div className="input-group">
                        <input onChange={handleEmailChange} type="email" className="form-control" placeholder="your email address" />
                        <Button onClick={handleGetStartedClick} variant="contained" color="error">Get Started</Button>
                    </div>
                    <p className="text-danger">{userError}</p>
                </div>
            </main>
        </div>
    )
}