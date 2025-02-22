import axios from 'axios'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

export default function MyPosts(){
    const [listOfUserPosts, setListOfUserPosts] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/posts/getusersposts",{
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((response) => {
          setListOfUserPosts(response.data);
        });
      }, []);
    
    
    return(
        <div>
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