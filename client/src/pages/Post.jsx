import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import '../css/RecentPosts.css'
import '../helpers/IsMyPost'
import {IsMyPost} from '../helpers/IsMyPost'


export default function Post(){
    let {id} = useParams()
    const [postObject, setPostObject] = useState({})
    const [authState, setAuthState] = useState(false);


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

    const deletePost = async (Id) => {
        try {
            const response = await axios.delete(`http://localhost:3001/posts/${id}`,{
                headers:{
                    accessToken: localStorage.getItem('accessToken')
                }
            })

        } catch(err){

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
                </div>
                <button type="submit" className="submit-btn" onClick = {deletePost}>Delete Post</button>
            </>
            )}
            </IsMyPost.Provider>
    )
}