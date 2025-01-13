import React, { Suspense, use } from 'react';
import styled from 'styled-components';
import { NavLink } from "react-router-dom";
import Layout from "../components/Layout";
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sravcubcggcbhozcsyvo.supabase.co'
const supabase = createClient(supabaseUrl, process.env.SUPABASE_KEY)

const PostItem = styled.div`
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    transition: background-color 0.3s;
    &:hover {
        background-color: #f1f1f1;
    }
`;

const Title = styled.p`
    color: var(--blue);
    text-decoration: underline;
    font-size: var(--text-medium);
`

const Date = styled.p`
    color: var(--black);
    font-size: var(--text-small);
`

// for suspense boundary
const Inner = ({ data }) => {
    const {data: posts}= use(data)

    const formatDate = (date) => { // rfc3339
        return date.slice(0, 10).replaceAll('-', '/')
    }
    return (
        <>
            {posts.map((post) => (
                <NavLink to={'/posts/' + post.id} key={post.id}>
                    <PostItem key={post.id}>
                        <Title>{post.title}</Title>
                        <Date>{formatDate(post.created_at)}</Date>
                    </PostItem>
                </NavLink>
            ))}
        </>
    )
}

const Posts = () => {
    const data = supabase.from('posts').select();
    return (
        <Layout>
            <Suspense>
                <Inner data={data} />
            </Suspense>
        </Layout>
    );
};

export default Posts;
