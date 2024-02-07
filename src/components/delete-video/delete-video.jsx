import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export function DeleteVideo()
{
    const[videos,setVideos] = useState([{VideoId:0,Title:'',Url:'',Likes:0,Dislikes:0,Views:0,CategoryId:0}]);
    const params = useParams();
    const navigate = useNavigate();

    function handleDeleteClick(){
        axios({
            method: 'delete',
            url: `http://127.0.0.1:5000/deletevideo/${params.id}`
        })
        alert("Video Deleted Successfully..");
        navigate("/admin-home");

    }

    useEffect(()=>{
        axios.get(`http://127.0.0.1:2200/video/${params.id}`)
        .then(response=>{
            setVideos(response.data);
        })

        // axios({
        //     method: 'get',
        //     url: `http://127.0.0.1:5000/videos/${params.id}`
        // })
        // .then((response)=>{
        //     setVideos(response.data);
        // })
        
    },[]);

    

    return(
        <div className="container-fluid">
            <h2>Delete Video</h2>
            <iframe src={videos[0].Url} height="300" width="300"></iframe>
            <p>
                <button onClick={handleDeleteClick} className="btn btn-danger me-2">Delete</button>
                <Link to="/admindashboard" className="btn btn-warning">Back</Link>
            </p>
        </div>
    )
}