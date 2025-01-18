import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom"

const Wrapper = styled.p`
    display: block;
    font-size: var(--text-medium);
`

const Breadcrumbs = () => {
    const location = useLocation();

    // home
    if (location.pathname === "/") return (
        <Wrapper>yu-tomori.com</Wrapper>
    )

    const paths = location.pathname.slice(1).split("/");
    const links = paths.slice(0, -1);
    const last = paths[paths.length - 1];

    return (
        <Wrapper>
            <NavLink to="/">yu-tomori.com</NavLink><span> / </span>

            {links.map((path, i) => (
                <React.Fragment key={i}>
                    <NavLink to={"/" + path}>{path}</NavLink><span> / </span>
                </React.Fragment>
            ))}

            <span>{last}</span>
        </Wrapper>
    )
}

export default Breadcrumbs