import React from "react";
import Layout from "../components/Layout";
import styled from "styled-components";


const Li =  styled.li`
    margin-left: 20px;
`

const Biography = () => {
    return (
        <Layout>
            <ul>
                <Li>Yu Tomori</Li>
                <Li>I was born in Okinawa, now living in Kanazawa.</Li>
	    	<Li>I have lived in Okinawa, Yokohama, Kamakura, and Kanazawa.</Li>
                <Li>Product Manager at PortX Inc., working on Logistics Spend Management.</Li>
                <Li>
                    I had worked for 4 years as a software engineer before this job.
                </Li>
                <Li>
                    My passionates
                    <ul>
                        <Li>learning software design and development</Li>
                        <Li>exercising, mainly running on road or trail</Li>
                        <Li>cooking. I like Italian dishes, selecting wine as well.</Li>
                    </ul>
                </Li>
            </ul>
        </Layout>
    )
}

export default Biography
