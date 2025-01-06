import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home.js";
import Posts from "./pages/Posts.js";
import Biography from "./pages/Biography.js";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/posts" element={<Posts />}></Route>
                <Route path="/biography" element={<Biography />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App