import React from "react";

export default function RenderWallet(props) {
    return props.walletBalance ? props.walletBalance.map(
        ({ id, walletName, balance}) => {
        return (
            <tr key={id}>
                <td>{
                    id === 1 ? <img src={`${process.env.PUBLIC_URL}/icons/cash.png`} /> :
                    id === 5 ? <img src={`${process.env.PUBLIC_URL}/icons/okg.png`} /> :
                    id === 3 ? <img src={`${process.env.PUBLIC_URL}/icons/elsom.png`} /> :
                    id === 2 ? <img src={`${process.env.PUBLIC_URL}/icons/demir.png`} /> :
                    <img src={`${process.env.PUBLIC_URL}/icons/cash.png`} />
                    }
                    <span>{walletName}</span>
                </td>
                <td>{balance + ' с'}</td>
            </tr>
        )
    }) : null
}