import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Layout from '../components/Layout';
import LoadingDots from '../components/LoadingDots';

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
`;

const Date = styled.p`
    color: var(--black);
    font-size: var(--text-small);
`;

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/posts.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error loading posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const formatDate = (date) => {
        return date.replaceAll('-', '/');
    };

    return (
        <Layout>
            {loading ? (
                <LoadingDots>Loading</LoadingDots>
            ) : (
                posts.map((post) => (
                    <NavLink to={'/posts/' + post.slug} key={post.slug}>
                        <PostItem>
                            <Title>{post.title}</Title>
                            <Date>{formatDate(post.date)}</Date>
                        </PostItem>
                    </NavLink>
                ))
            )}
        </Layout>
    );
};

export default Posts;