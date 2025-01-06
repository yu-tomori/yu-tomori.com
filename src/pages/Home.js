import React from "react";
import { NavLink } from "react-router-dom";
import Layout from "../components/Layout.js";

const Home = () => {
    return (
        <Layout>
            <NavLink to="posts">posts</NavLink>
        </Layout>
    )
}

export default Home