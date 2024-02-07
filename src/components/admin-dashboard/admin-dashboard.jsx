import { useCookies } from "react-cookie"
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


export function AdminDashboard(){

    const [cookies, setCookie, removeCookie] = useCookies('adminName');
    const [videos, setVideos] = useState([{VideoId:0, Title:'', Url:'', Comments:'', Likes:0, Dislikes:0, Category_Id:0}]);
    let navigate = useNavigate();

    function LoadVideos(){
        axios.get('http://127.0.0.1:5000/videos')
        .then(response=>{
            setVideos(response.data);
        })
    }

    useEffect(()=>{
        
        if(cookies['adminName']===undefined){
            navigate('/adminlogin')
        } else {
            LoadVideos();
        }
    },[]);

    // function handleSignoutClick(){
    //     removeCookie("adminName");
    //     navigate("/adminlogin");
    // }

    return(
        <div className="mt-5">
            <h3> {cookies['adminName']} - Dashboard</h3>
            <div className="mb-4 mt-5">
                <Link to="/addvideo" className="btn btn-success">Add New Video</Link>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Preview</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        videos.map(video=>
                            <tr key={video.VideoId}>
                                <td width="200">{video.Title}</td>
                                <td>
                                    <iframe src={video.Url} width="300" height="100"></iframe>
                                </td>
                                <td>
                                     <Link to={`/viewvideo/${video.VideoId}`} className="btn btn-primary me-2"><span className="bi bi-eye"></span></Link>
                                    <Link to={`/editvideo/${video.VideoId}`} className="btn btn-warning bi bi-pen-fill me-2"></Link>
                                    <Link to={`/deletevideo/${video.VideoId}`} className="btn btn-danger bi bi-trash-fill"></Link>
                                </td>
                            </tr>
                            )
                    }
                </tbody>
            </table>
        </div>
    )
}