import React from "react";

export default function RenderHeader(props) {

    return props.headers.map((key, index) => {
        return <td key={index}>{key}</td>
    })
}