import styled, { keyframes } from "styled-components";

const dots = keyframes`
    0%, 20% {
        color: rgba(0,0,0,0);
        text-shadow:
            .25em 0 0 rgba(0,0,0,0),
            .5em 0 0 rgba(0,0,0,0);
    }
    40% {
        color: black;
        text-shadow:
            .25em 0 0 rgba(0,0,0,0),
            .5em 0 0 rgba(0,0,0,0);
    }
    60% {
        text-shadow:
            .25em 0 0 black,
            .5em 0 0 rgba(0,0,0,0);
    }
    80%, 100% {
        text-shadow:
            .25em 0 0 black,
            .5em 0 0 black;
    }
`;

const LoadingDots = styled.p`
    font-size: var(--text-medium);
    &:after {
        content: ' .';
        animation: ${dots} 1s steps(5, end) infinite;
    }
`;

export default LoadingDots