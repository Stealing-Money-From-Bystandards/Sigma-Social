import axios from 'axios'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

export default function CreatePost(){

    const navigate = useNavigate();

    
    const [newPost, setNewPost] = useState("");

    const submitPost = () => {
        axios.post('http://localhost:3001/posts/createpost', {
            postbody: newPost
        },
        {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }
        ).then((response) => {
            if(response.data.error){
                console.log(response.data.error)
            }
        })
    };
    
    return (
            <div className = "addPostContainer">
                <input 
                type = "text" 
                value = {newPost}
                placeholder ="write your post" 
                onChange = {(event) => {
                    setNewPost(event.target.value);
                }}
                />
                <button onClick = {submitPost}>Submit Post</button>
            </div>
    )
}