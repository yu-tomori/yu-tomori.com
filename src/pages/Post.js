import React, { Suspense, use } from 'react'
import { useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js'
import Layout from "../components/Layout";
import Markdown from 'react-markdown'
import mdComponents from '../components/markdown'

const supabaseUrl = 'https://sravcubcggcbhozcsyvo.supabase.co'
const supabase = createClient(supabaseUrl, process.env.SUPABASE_KEY)

const Inner = ({ data }) => {
    const { data: result } = use(data)
    const post = result[0]
    console.log(post);
    return (
        <Markdown components={mdComponents}>{post.content}</Markdown>
    )
}

const Post = () => {
    const { id } = useParams()
    const data = supabase.from('posts').select().eq('id', id)
    return (
        <Layout>
            <Suspense fallback={<p>loading...</p>}>
                <Inner data={data} />
            </Suspense>
        </Layout>
    )
}

export default Post