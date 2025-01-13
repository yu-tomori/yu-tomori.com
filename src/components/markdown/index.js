/*
* customized components for react-markdown: https://github.com/remarkjs/react-markdown
*/
import React from 'react'

const li = ({ children }) => (
    <li style={{
        color: 'red',
        marginLeft: '20px'
    }}>{children}</li>
)

const mdComponents = {
    li: li
}

export default mdComponents