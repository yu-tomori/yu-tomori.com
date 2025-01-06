import React from "react";
import styled from "styled-components";
import Breadcrumbs from "./Breadcrumbs";

const Wrapper = styled.div`
    margin: var(--global-padding);
`

const Margin = styled.div`
    height: 40px;
`

const Layout = ({children}) => {
    return (
        <Wrapper>
            <Breadcrumbs />
            <Margin />
            {children}
        </Wrapper>
    )
}

export default Layout