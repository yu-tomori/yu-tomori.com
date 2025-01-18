import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Home, Posts, Post, Biography } from "./pages"

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/posts" element={<Posts />}></Route>
                <Route path="/posts/:slug" element={<Post />}></Route>
                <Route path="/biography" element={<Biography />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App