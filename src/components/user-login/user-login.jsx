

import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useFormik } from 'formik';
import { useState,useEffect } from 'react';
import   React from 'react';
import { useCookies } from 'react-cookie';
import { Box, Button, FormControl, FormGroup, IconButton, Input, InputAdornment, InputLabel, Paper, TextField, Typography } from '@mui/material';
// import { Box, Button, FormControl, FormGroup, IconButton, Input, InputAdornment, InputLabel, Paper, TextField, Typography } from '@mui/material'  
import { Visibility, VisibilityOff } from '@mui/icons-material';



export function UserLogin()
{
  // const [users, setUsers] =  useState

  const [users, setUsers] = useState([{UserId:'', UserName:'', Password:'', Email:'', Mobile:''}]);
  const [userError, setUserError] = useState('');

    const navigate = useNavigate();
    const[cookies,setCookie,removeCookie] = useCookies(['userName']);



    const [showPassword, setShowPassword] = React.useState(false);
      
    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

   

    const formik = useFormik({
        initialValues:{
            UserId: '',
            Password: ''
        },
        onSubmit: (values)=>{
            var user = users.find(item=> item.UserId===values.UserId);
            
            if(user.Password===values.Password){
                setCookie("userName",user.UserName);
                navigate("/userdashboard");
                
            }
            else{
                setUserError("Invalid Credentials");
            }
        }
    });

    useEffect(()=>{
        axios.get('http://127.0.0.1:5000/users')
        .then((response)=>{
            setUsers(response.data);
            
        })
        // var user='';
        //   alert(user = users.find(item=> item.UserId==="Tom_Hank"));
        //   alert(user.UserId);
    },[]);
      

    // function handleIdChange(e)
    // {
    //     setUser({
    //         UserId: e.target.value,
    //         Password: user.Password
    //     });
    // }

    // function handlePwdChange(e)
    // {
    //     setUser({
    //         UserId: user.UserId,
    //         Password: e.target.value
    //     });
    // }

    // function handleSubmit(e)
    // {
    //     e.preventDefault();
    //     axios({
    //         method: 'get',
    //         url: 'http://127.0.0.1:5000/users'
    //     })
    //     .then((response)=>{
    //         for(var vuser of response.data){
    //             if(vuser.UserId===user.UserId && vuser.Password===user.Password){
    //                 setCookie("user-id", user.UserId);
    //                 navigate("/videos");
    //                 break;
    //             }
    //             else{
    //                 setError("Invalid Credentials");
    //             }
    //         }
    //     })
    // }

    return(
    // <div style={{display:'flex',justifyContent:'center',alignItems:'center', height:'400px',backgroundColor:'black'}}>
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center', height:'60ch', boxShadow:'10px solid gray'}}>
          <Paper>
            <form onSubmit={formik.handleSubmit}>
              <FormGroup>
                  <Typography variant='h4' sx={{padding:'1ch'}}><span className='bi bi-person-fill'></span>User Login</Typography>
                    <TextField id="standard-basic" name='UserId' type='text' required onChange={formik.handleChange}   label="User Id" variant="standard"  sx={{m:1, width:'50ch',marginLeft:'5ch',marginRight:'5ch'}}/>
                    <FormControl sx={{ m: 1, width: '50ch',marginLeft:'5ch',marginRight:'5ch' }} variant="standard">
                      <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                      <Input
                        id="standard-adornment-password"
                        name='Password'
                        required
                        onChange={formik.handleChange}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                    <p style={{display:'flex',justifyContent:'center',alignItems:'center',paddingTop:'5ch'}}>
                    <Button variant="contained"
                    type='submit'
                    color="primary" sx={{width:'50ch'}}>
                        Submit
                    </Button>
                    </p>
                    <p>
                    <h6 className='text-danger text-center'>{userError}</h6>
                    </p>
                    <div className='text-end pe-4 pb-4'>
                    <Link to='/uregister'>New User? Register</Link>
                    </div>
                </FormGroup>
              </form>
          </Paper>
        </Box>
    // </div>

    
        // <div className="container-fluid">
        //     <h2>User Login</h2>
        //     <form onSubmit={handleSubmit}>
        //         <dl>
        //             <dt>User Id</dt>
        //             <dd><input type="text" onChange={handleIdChange} className="form-control"/></dd>
        //             <dt>Password</dt>
        //             <dd><input type="Password" onChange={handlePwdChange} className="form-control"/></dd>
        //         </dl>
        //         <button  className="btn btn-primary w-100">Login</button>
        //         <div>
        //             <Link to='/register'>New User? Register</Link>
        //         </div>
        //         <h4 className='text-danger'>{error}</h4>
        //     </form>
        // </div>
       
    )
}