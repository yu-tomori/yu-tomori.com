import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import mdComponents from '../components/markdown';
import Layout from "../components/Layout";
import LoadingDots from '../components/LoadingDots';

const Title = styled.p`
    font-size: var(--text-large);
`;

const usePost = (slug) => {
    const [postContent, setPostContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 2000));

                const response = await fetch(`/posts/${slug}.md`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const text = await response.text();
                setPostContent(text);
            } catch (error) {
                console.error('Error loading post:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    return { postContent, loading };
};

const Post = () => {
    const { slug } = useParams();
    console.log("slug: ", slug)
    const { postContent, loading } = usePost(slug);

    return (
        <Layout>
            {loading && <LoadingDots>loading</LoadingDots>}
            {!loading &&
                <Markdown components={mdComponents}>{postContent}</Markdown>
            }
        </Layout>
    );
};

export default Post;