import { useEffect, useState } from "react"
import axios from "axios";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardHeader } from "@mui/material";


export function UserDashboard()
{
    const[videos,setVideos] = useState([{UserId:0,Title:'',Url:'',Likes:0,Dislikes:0,Views:0,CategoryId:0}]);
    const[categories,setCategories] = useState([]);
    
    const[users,setUsers] = useState([{UserId:'', UserName:'', Password:'', Email:'', Mobile:''}])

   // let [like,setLike] = useState([{Likes:0}]),
     //[isLike,setIsLike] = useState(false);

    const navigate = useNavigate();
    const[cookies,setCookie,removeCookie] = useCookies('userName');


    function LoadVideos(url){
        axios({
            method: 'get',
            url: url
        })
        .then(response=>{
            setVideos(response.data);
            //alert(response.data);
        })
    }

    function GetCategories(){
        axios.get('http://127.0.0.1:5000/categories')
        .then(response =>{
            //then(response.data)
             response.data.unshift({"CategoryName":"all"});
            setCategories(response.data);
        })
    }

    function handleCategoryChange(e){
        console.log(e.target.value)
        if(e.target.value==="ALL"){
            LoadVideos("http://127.0.0.1:5000/videos")
        }
        else{
            LoadVideos(`http://127.0.0.1:5000/getvideos/${e.target.value}`)
           // alert(e.target.value);
        }
    }

    function LoadUser(){
        axios.get('http://127.0.0.1:5000/users')
        .then((response)=>{
            setUsers(response.data);
            
        })
    }

    useEffect(()=>{
        GetCategories();
        LoadVideos("http://127.0.0.1:5000/videos");
        LoadUser();
        if(cookies['userName']===undefined){
            navigate("/userlogin");
        }
        else{
            LoadVideos("http://127.0.0.1:5000/videos");
        }
          
    },[]);

    
    var userName = JSON.parse(localStorage.getItem("userName"))||[];
    function LikeButtonClick(e){
         //userName = JSON.parse(localStorage.getItem("userName"))||[];
        //  localStorage.setItem("UserName",JSON.stringify(cookies['userName']));
         var user= cookies['userName'];
         alert(user)

         alert(!userName.includes(user));
         
          if(!userName.includes(user)){
                userName.push(user);
                localStorage.setItem("userName",JSON.stringify(userName));
          }

          alert(e.target.value);

        //   userName.map(name=>{

        //   })

        // userName.find(name=>{
        //     if(user!=name){
        //         userName.push(user);
        //         localStorage.setItem("userName",JSON.stringify(userName));
        //     }
        // })
        console.log(userName);
    }


    return(
        <div className=" bg-dark row mt-5" style={{height:'100%'}}>
            {/* <h2>Videos Home - Home! <Link onClick={handleSignout} to="/userlogin" >Sign Out</Link></h2> */}

            <main className="col-2">
                <label className="fw-bold form-label" >Select Category</label>
                <div>
                    <select onChange={handleCategoryChange} className="form-control">
                        {
                            
                            categories.map(category=>
                                
                                <option value={category.CategoryId} key={category.CategoryId}>{category.CategoryName.toUpperCase()}</option>
                                
                                
                            )
                        }
                    </select>
                </div>
            </main>
            <section className="d-flex justify-content-center flex-wrap col-10">
                {
                    videos.map(video=>


                    <div key={video.VideoId} className="ms-4">    
                        <Card  sx={{ maxWidth: 345 ,padding:'1ch',marginTop:'5ch',maxHeight:400}}>
                            <CardActionArea>
                                <CardHeader 
                                title={video.Title}
                                sx={{width:345}}
                                />
                                <CardMedia
                                component="iframe"
                                height="200"
                                width="100"
                                src = {video.Url}
                               // alt="green iguana"
                                
                                />
                            </CardActionArea>
                            <CardContent sx={{marginTop:'-40px'}}>
                                <Typography gutterBottom variant="h5" component="div">
                                    <p className=''>
                                        {/* <span className="bi bi-hand-thumbs-up" ></span> */}
                                        <br/>
                                        {/* <p className="text-dark">Like {like}</p> */}
                                    </p>
                                    <span className="bi bi-hand-thumbs-up ms-4" value={video.VideoId} onClick={LikeButtonClick}>:</span> {video.Likes}
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    Comments:
                                    <div>
                                        {video.comments}
                                    </div>
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>

                    )
                }


            </section>
        </div>
    )
}