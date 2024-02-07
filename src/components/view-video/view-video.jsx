import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";


export function ViewVideo()
{
    const params = useParams();
    const[videos,setVideos] = useState([{}]);

    useEffect(()=>{
        axios({
            method: 'get',
            url: `http://127.0.0.1:5000/videos/${params.id}`
        })
        .then(response=>{
            setVideos(response.data);
        })
        console.log(videos[0].Title);
    },[]);

    return(
        <div className="container-fluid">
            <h2 className="mt-4">{videos[0].Title}</h2>    
            <iframe src={videos[0].Url} width="400" height="300"></iframe>

           <p>
              <Link to="/admindashboard">Back To Home</Link>
            </p>
        </div>
    )
}