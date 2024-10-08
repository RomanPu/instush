import React from 'react'
import { Routes, Route } from 'react-router'

import { HomePage } from './pages/HomePage'
import { Profile } from './pages/Profile'
import {Messenger} from './pages/Messenger'
import { NavBar } from './cmps/NavBar'
import { PostDeteiled } from './cmps/PostDeteiled'
import { CreatePost } from './cmps/CreatePost'
import { Explore } from './pages/Explore'

export function RootCmp() {

    return (
      <div className='main-layout'>
            <NavBar/>
            {
                <Routes>
                     <Route path="instush" element={<HomePage />} />
                     <Route path="instush/profile/:_id" element={<Profile />} />
                        <Route path="instush/profile/:_id/post/:_id" element={<PostDeteiled/>} />
                     <Route/>
                     <Route path="instush/messenger" element={<Messenger />} />
                     <Route path="instush/post/:_id" element={<PostDeteiled/>} />
                     <Route path="instush/createpost" element={<CreatePost/>} />
                     <Route path="instush/explore" element={<Explore/>} />
                        <Route path="instush/explore/post/:_id" element={<PostDeteiled/>} />   
                     <Route/>
               </Routes>
            }
        </div>
    )
}

