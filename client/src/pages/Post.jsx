import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import '../helpers/IsMyPost'
import {IsMyPost} from '../helpers/IsMyPost'
import {useNavigate} from 'react-router-dom'

export default function Post(){
    let {id} = useParams()
    const [postObject, setPostObject] = useState({})
    const [authState, setAuthState] = useState(false);
    const navigate = useNavigate()

    useEffect(()=> {
        axios.get(`http://localhost:3001/posts/byid/${id}`).then((response) => {
            setPostObject(response.data)
            if(response.data.username == localStorage.getItem('username')){
                setAuthState(true);
            }else{
                setAuthState(false)
            }
        })
    },[id])

    const deletePost = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3001/posts/${id}`,{
                headers:{
                    accessToken: localStorage.getItem('accessToken')
                }
            })

            navigate('/myposts')
        } catch(error){
            console.error("error")
        }
    }

    
    return (
            <IsMyPost.Provider value = {{authState,setAuthState}}>
            {!authState && (
                <div className = "post" id ="individual">
                <div className = "body">{postObject.postbody}</div>
                <div className = "footer">{postObject.username}</div>
                </div>
            )}

            {/* when the post belongs to the logged in user allows for deletion */}
            {authState && (
            <>
                <div className = "post" id ="individual">
                <div className = "body">{postObject.postbody}</div>
                <div className = "footer">{postObject.username}</div>
                <button type="submit" className="deletebtn" onClick = {() => {deletePost(postObject.id)}}>Delete Post</button>
                </div>
                
            </>
            )}
            </IsMyPost.Provider>
    )
}