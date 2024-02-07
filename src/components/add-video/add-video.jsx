import { Formik, useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

export function AddVideo()
{
    const[categories,setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/categories'
        })
        .then((response)=>{
            response.data.unshift({CategoryId: -1,CategoryName:'Choose Category'})
            setCategories(response.data);
        })
    },[]);

    const formik = useFormik({
        initialValues: {
            VideoId: 0,
            Title: '',
            Url: '',
            Likes: 0,
            Dislikes: 0,
            Views: 0,
            CategoryId: 0
        },
        onSubmit: (values)=>{
            
            axios({
                method: 'post',
                url: 'http://127.0.0.1:5000/addvideo',
                data: values
            })
            alert('Video Added Succesfully..');
            navigate("/admindashboard");
        }
        
    })

    return(
        <div className="container-fluid">
            <h3 className="mt-4">Add New Video</h3>
            <form onSubmit={formik.handleSubmit} className="w-50">
                <dl>
                    <dt>Video Id</dt>
                    <dd><input type="number" className="form-control"  onChange={formik.handleChange} name="VideoId" /></dd>
                    <dt>Title</dt>
                    <dd><input type="text" className="form-control" onChange={formik.handleChange} name="Title"/></dd>
                    <dt>Url</dt>
                    <dd><input type="text" className="form-control" onChange={formik.handleChange} name="Url"/></dd>
                    <dt>Likes</dt>
                    <dd><input type="number" className="form-control"  onChange={formik.handleChange} name="Likes"/></dd>
                    <dt>Dislikes</dt>
                    <dd><input type="number" className="form-control" onChange={formik.handleChange} name="Dislikes"/></dd>
                    <dt>Views</dt>
                    <dd><input type="number" className="form-control" onChange={formik.handleChange} name="Views"/></dd>
                    <dt>Category Id</dt>
                    <dd> 
                        <select onChange={formik.handleChange} className="form-control"  name="CategoryId" >
                            {
                                categories.map(category=>
                                    <option value={category.CategoryId} key={category.CategoryId}>
                                        {category.CategoryName.toUpperCase()}
                                        </option>
                                    )
                            }
                        </select>
                    </dd>
                </dl>
                <button className="btn btn-primary">Add video</button>
            </form>
            <p>
            <Link to='/admindashboard'>Back To Home</Link>
            </p>
        </div>
    )
}