import React, { Suspense, use } from 'react';
import styled from 'styled-components';
import Layout from "../components/Layout";
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sravcubcggcbhozcsyvo.supabase.co'
const supabase = createClient(supabaseUrl, process.env.SUPABASE_KEY)

const PostsList = styled.ul`
    list-style-type: none;
`;

const PostItem = styled.li`
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
        <PostsList>
            {posts.map((post) => (
                <PostItem key={post.id}>
                    <Title>{post.title}</Title>
                    <Date>{formatDate(post.created_at)}</Date>
                </PostItem>
            ))}
        </PostsList>
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
