import { Link } from "react-router-dom";
import axios from "axios";
import { Formik, useFormik } from "formik";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Box, Button, FormControl, FormGroup, IconButton, Input, InputAdornment, InputLabel, Paper, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import React from "react";

export function AdminLogin(){

    let navigate = useNavigate();
    const [users, setUsers] = useState([{UserId:'', Password:''}]);
    const [userError, setUserError] = useState('');

    const [cookies, setCookie, removeCookie] = useCookies('adminName');

    const [showPassword, setShowPassword] = React.useState(false);
      
    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };


    const formik = useFormik({
        initialValues : {
            UserId: '',
            Password:''
        },
        onSubmit: (values)=>{
            var user = users.find(item=> item.UserId===values.UserId);
            if(user.Password===values.Password){
                setCookie("adminName", user.UserId);
                navigate("/admindashboard");
            } else {
                setUserError("Invalid Credentials");
            }
        }
    })

    useEffect(()=>{
        axios.get('http://127.0.0.1:5000/admin')
        .then((response)=>{
            setUsers(response.data);
        })
    },[]);



    return(
        <div>

        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center', height:'60ch', boxShadow:'10px solid gray'}}>
        <Paper>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup>
                <Typography variant='h4' sx={{padding:'1ch'}}><span className='bi bi-person-fill'></span>Admin Login</Typography>
              <TextField id="standard-basic" name='UserId' type='text' onChange={formik.handleChange}   label="User Id" variant="standard"  sx={{m:1, width:'50ch',marginLeft:'5ch',marginRight:'5ch'}}/>
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
                  <h3 className='text-danger text-center'>{userError}</h3>
              </FormGroup>
            </form>
        </Paper>
      </Box>


            {/* <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Admin Id</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="UserId"/></dd>
                    <dt>Password</dt>
                    <dd><input type="password" onChange={formik.handleChange} name="Password" /></dd>
                </dl>
                <button className="btn btn-primary">Login</button>
                <p className="h3 text-danger">{userError}</p>
            </form> */}
        </div>
    )
}