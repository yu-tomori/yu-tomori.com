/*
* customized components for react-markdown: https://github.com/remarkjs/react-markdown
*/
import React from 'react'

const margins = {
    marginTop: '20px',
    marginBottom: '20px'
}

const h1 = ({ node, ...props }) => (
    <h1 style={{
        fontSize: '24px',
        fontWeight: 'normal',
        ...margins
    }} {...props} />
)

const h2 = ({ node, ...props }) => (
    <h2 style={{
        fontSize: '18px',
        fontWeight: 'bold',
        ...margins
    }} {...props} />
)

const h3 = ({ node, ...props }) => (
    <h3 style={{
        fontSize: '16px',
        fontWeight: 'bold',
        ...margins
    }} {...props} />
)

const h4 = ({ node, ...props }) => (
    <h4 style={{
        fontSize: '13px',
        fontWeight: 'bold',
        ...margins
    }} {...props} />
)

const li = ({ node, ...props }) => (
    <li style={{
        marginLeft: '20px'
    }} {...props} />
)


const mdComponents = {
    li, h1, h2, h3, h4
}

export default mdComponents