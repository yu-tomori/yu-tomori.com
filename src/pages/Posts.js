import React, { Suspense, use } from 'react';
import styled from 'styled-components';
import Layout from "../components/Layout";
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sravcubcggcbhozcsyvo.supabase.co'
const supabase = createClient(supabaseUrl, process.env.SUPABASE_KEY)

const PostsContainer = styled.div`
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PostsList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const PostItem = styled.li`
    padding: 10px;
    margin-bottom: 10px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #f1f1f1;
    }
`;

// for suspense boundary
const Inner = ({ data }) => {
    const {data: posts}= use(data)
    return (
        <PostsContainer>
            <PostsList>
                {posts.map((post) => (
                    <PostItem key={post.id}>
                        {post.id} {post.created_at}
                    </PostItem>
                ))}
            </PostsList>
        </PostsContainer>
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
