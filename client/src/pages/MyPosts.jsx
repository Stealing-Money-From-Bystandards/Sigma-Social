import axios from 'axios'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

export default function MyPosts(){
    const [listOfUserPosts, setListOfUserPosts] = useState([])
    const [postCount, setPostCount] = useState(0)
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/posts/getusersposts",{
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((response) => {
          setListOfUserPosts(response.data);
          setPostCount(response.data.length)
        });
      }, []);
    
    return(
        <div>
        <div className = "profile-section">
        <div className = "profile-pic"></div>
        <div className = "posts-number">Posts<div>{postCount}</div></div>
        <div className = "following">following<div>100</div></div>
        <div className = "followers">followers<div>200</div></div>
        </div>
            {listOfUserPosts.slice().reverse().map((value, key) =>{
                return (
                    <div className="post" onClick = {() => {navigate(`/post/${value.id}`)}}>
                    <div className="body">{value.postbody}</div>
                    <div className="footer">{value.username}</div>
                    </div>
                )
            })}
        
        </div>
    )
}