import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Button, FormControl, FormGroup, IconButton, Input, InputAdornment, InputLabel, Paper, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import React from 'react';
import { useFormik } from 'formik';

export function UserRegister()
{
    const[userError,setUserError] = useState('');
    const[errorClass,setErrorClass] = useState('');
    const[users,setUsers] = useState({UserId:'',UserName:'',Password:'',Email:'',Mobile:''});
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = React.useState(false);
      
    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };


    useEffect(()=>{
        axios.get('http://127.0.0.1:5000/users')
        .then(response=>{
            setUsers(response.data)
        })
    },[]);

    const formik = useFormik({
        initialValues: {
            UserId: '',
            UserName: '',
            Password: '',
            Email: '',
            Mobile: '',
        },
        onSubmit: (user) =>{
            axios.post('http://127.0.0.1:5000/registeruser', user);
            alert('Registered Successfully..');
            navigate('/userlogin');
        }
    })

    function VerifyUser(e){
        for(var user of users){
            if(user.UserId==e.target.value){
                setUserError("User Id Taken - Try Another");
                setErrorClass('text-danger');
                break;
            }
            else{
                setUserError("User Id Available");
                setErrorClass('text-success');
            }
        }
    }


    // function handleIdChange(e){
    //     setUser({
    //         UserId: e.target.value,
    //         UserName: user.UserName,
    //         Password: user.Password,
    //         Email: user.Email,
    //         Mobile: user.Mobile
    //     });

    //     axios({
    //         method: 'get',
    //         url: 'http://127.0.0.1:5000/users'
    //     })
    //     .then((response)=>{
    //         for(var user of response.data){
    //             if(user.UserId===e.target.value){
    //                 setUserError('User Id Already Taken - Try Another');
    //                 setErrorClass('text-danger');
    //                 break;
    //             }
    //             else{
    //                 setUserError('User Id Available');
    //                 setErrorClass('text-success');
    //             }
    //         }
    //     })
    // }

    // function handleNameChange(e){
    //     setUser({
    //         UserId: user.UserId,
    //         UserName: e.target.value,
    //         Password: user.Password,
    //         Email: user.Email,
    //         Mobile: user.Mobile
    //     })
    // }

    // function handlePasswordChange(e){
    //     setUser({
    //         UserId: user.UserId,
    //         UserName: user.UserName,
    //         Password: e.target.value,
    //         Email: user.Email,
    //         Mobile: user.Mobile
    //     })
    // }
    // function handleEmailChange(e){
    //     setUser({
    //         UserId: user.UserId,
    //         UserName: user.UserName,
    //         Password: user.Password,
    //         Email: e.target.value,
    //         Mobile: user.Mobile
    //     })
    // }
    // function handleMobileChange(e){
    //     setUser({
    //         UserId: user.UserId,
    //         UserName: user.UserName,
    //         Password: user.Password,
    //         Email: user.Email,
    //         Mobile: e.target.value
    //     })
    // }

    // function handleSubmit(){
    //     axios({
    //         method: 'post',
    //         url: 'http://127.0.0.1:5000/registeruser',
    //         data: user
    //     })
    //     alert('Registered Successfully');
    //     navigate('/login');
    // }



    return(
        <div className="container-fluid">


        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center', height:'80ch', boxShadow:'10px solid gray'}}>
            <Paper
            sx={{backgroundColor:''}}
            >
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <Typography variant='h4' sx={{padding:'1ch'}}><span className='bi bi-person-fill'></span>Register User</Typography>
                        <TextField id="standard-basic" name='UserId' onKeyUp={VerifyUser}  type='text' onChange={formik.handleChange}  label="User Id" variant="standard"  sx={{m:1, width:'50ch',marginLeft:'5ch',marginRight:'5ch'}}/>
                        <p className={errorClass} style={{marginLeft:'40px'}}>{userError}</p>
                        <TextField id="standard-basic" name='UserName' type='text' onChange={formik.handleChange}  label="User Name" variant="standard"  sx={{m:1, width:'50ch',marginLeft:'5ch',marginRight:'5ch'}}/>
                        <FormControl sx={{ m: 1, width: '50ch',marginLeft:'5ch',marginRight:'5ch' }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            name='Password'
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
                        <TextField id="standard-basic" name='Email' type='email' onChange={formik.handleChange}  label="Email" variant="standard"  sx={{m:1, width:'50ch',marginLeft:'5ch',marginRight:'5ch'}}/>
                        <TextField id="standard-basic" name='Mobile' type='text' onChange={formik.handleChange}  label="Mobile" variant="standard"  sx={{m:1, width:'50ch',marginLeft:'5ch',marginRight:'5ch'}}/>
                        <p style={{display:'flex',justifyContent:'center',alignItems:'center',paddingTop:'5ch'}}>
                        <Button variant="contained"
                        type='submit'
                        color="primary" sx={{width:'50ch'}}>
                            Submit
                        </Button>
                        </p>
                        <p className='text-end pe-4 pt-3'>Existing User?<Link to='/login'>Login</Link></p>
                        {/* <h4 className='text-danger'>{error}</h4> */}
                    </FormGroup>
                </form>
            </Paper>
        </Box>



            {/* <h2><span className="bi bi-person-fill"></span>Register User</h2>
            <form onSubmit={handleSubmit}>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" onChange={handleIdChange} /></dd>
                    <dd className={errorClass}>{userError}</dd>
                    <dt>User Name</dt>
                    <dd><input type="text" onChange={handleNameChange} /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" onChange={handlePasswordChange}/></dd>
                    <dt>Email</dt>
                    <dd><input type="email" onChange={handleEmailChange}/></dd>
                    <dt>Mobile</dt>
                    <dd><input type="text" onChange={handleMobileChange}/></dd>
                </dl>
                <button className="btn btn-primary">Register</button>
                <p>Existing User?<Link to='/login'>Login</Link></p>
            </form> */}
        </div>
    )
}