import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
//Components
import Homepage from './pages/Homepage.jsx'
import Recentposts from './pages/Recentposts.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Search from './pages/Search.jsx'
import CreatePost from './pages/CreatePost.jsx'
import MyPosts from './pages/MyPosts.jsx'
import Post from './pages/Post.jsx'
import './App.css'
import { AuthContext } from './helpers/AuthContext'
import axios from 'axios'


function App() {
  const [authState, setAuthState] = useState(false);
  const [isOpen, setIsOpen] =useState(true)


  useEffect(() => {
    axios.get('http://localhost:3001/users/auth',{headers: {
      accessToken: localStorage.getItem("accessToken"),
    }}).then((response) => {
      if(response.data.error) {
        setAuthState(false);
      } else {
        setAuthState(true);
      }
    })
  }, [])

  const logout = () => {
    localStorage.clear();
    setAuthState(false);
  }

  return (
    
    <div className = "container">
      <AuthContext.Provider value = {{authState, setAuthState}}>
      <Router>
        {isOpen && (
        <div className = "navbar">
            <button className="toggle-btn" onClick={() => setIsOpen(false)}>❌</button>
            <Link to= '/'>HomePage</Link>
            <Link to= '/recentposts'>RecentPosts</Link>
            {authState && (
            <>
            <Link to= '/createpost'>Create Post</Link>
            <Link to = '/myposts'>My Posts</Link>
            </>
            )}
            {!authState && (
            <Link to= '/login'>Login</Link>
            )}
            <Link to= '/search'>Search</Link>
            {!authState && (
            <Link to= '/register'>Register</Link>
            )}
            {authState && (
            <>
            <Link to= '/' onClick = {logout}>Click to Logout</Link>
            </>
            )}
        </div> 
        )}

        <div className={`main-content ${isOpen ? "shifted" : ""}`}></div>
        <div className={`main-content ${isOpen ? "shifted" : ""}`}>
        {!isOpen && <button className="toggle-btn" onClick={() => setIsOpen(true)}>☰</button>}
          <Routes>  
            <Route path = '/' element = {<Homepage/>}/>
            <Route path = '/recentposts' element = {<Recentposts/>}/>
            <Route path = '/login' element = {<Login/>}/>
            <Route path = '/register' element = {<Register/>}/>
            <Route path = '/search' element = {<Search/>}/>
            <Route path = '/createpost' element = {<CreatePost/>}/>
            <Route path = '/myposts' element = {<MyPosts/>}/>
            <Route path = '/post/:id' element = {<Post/>}/>
          </Routes>
        </div>
        <div className={`main-content ${isOpen ? "shifted" : ""}`}></div>
      </Router>
      </AuthContext.Provider>
    </div>
      
  )
}

export default App
