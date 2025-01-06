import React from "react";
import styled from "styled-components";
import Breadcrumbs from "./Breadcrumbs";

const Wrapper = styled.div`
    margin: var(--global-padding);
`

const Layout = ({children}) => {
    return (
        <Wrapper>
            <Breadcrumbs />
            {children}
        </Wrapper>
    )
}

export default Layout