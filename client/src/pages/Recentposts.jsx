import axios from 'axios'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'


export default function Recentposts(){
    const [listOfPosts, setListOfPosts] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/posts").then((response) => {
          setListOfPosts(response.data);
        });
      }, []);
    
    
    
    return(
        <div className = "recent-posts">
            {listOfPosts.slice().reverse().map((value, key) =>{
                return (
                    
                    <div key = {value.id} className="post" onClick = {() => {navigate(`/post/${value.id}`)}} >
                    <div className="body">{value.postbody}</div>
                    <div className="footer">{value.username}</div>
                    </div>
                    
                )
            })}
        </div>
    )
}