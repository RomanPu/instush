import { useSelector } from 'react-redux'
// import { useEffect } from "react";

import PostPreview from "./PostPreview"
import { PostAddSharp } from '@mui/icons-material'

export function PostsList() {
    const posts = useSelector(storeState => storeState.postsModule.posts)
    return <ul className = "posts-list">{posts.map((post) => 
    <li key = {post._id}><PostPreview  user = {post.author} date ={post.createdAt} content = {post.body}/></li>)}</ul>
}

