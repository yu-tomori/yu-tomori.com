import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Layout from "../components/Layout.js";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const LinksContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`

const SectionTitle = styled.p`
    font-size: var(--text-large);
    color: var(--gray);
`

const Link = styled.p`
    color: var(--blue);
    font-size: var(--text-large);
    text-decoration: underline;
    text-decoration-color: var(--blue);
`

const Home = () => {
    return (
        <Layout>
            <Container>
            <SectionTitle>MENU</SectionTitle>
            <LinksContainer>
                <NavLink to="posts">
                    <Link>posts</Link>
                </NavLink>
                <NavLink to="posts">
                    <Link>biography</Link>
                </NavLink>
            </LinksContainer>

            <SectionTitle>ACCOUNTS</SectionTitle>
            <LinksContainer>
                <NavLink to="posts">
                    <Link>twitter</Link>
                </NavLink>
                <NavLink to="posts">
                    <Link>github</Link>
                </NavLink>
            </LinksContainer>
            </Container>
        </Layout>
    )
}

export default Home