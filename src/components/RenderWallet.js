import React from "react";

export default function RenderWallet(props) {
    return props.walletBalance ? props.walletBalance.map(
        ({ id, walletName, balance}) => {
        return (
            <tr key={id}>
                <td>{
                    walletName === 'Наличные' ? <img src={`${process.env.PUBLIC_URL}/icons/cash.png`} /> :
                    walletName === 'О деньги' ? <img src={`${process.env.PUBLIC_URL}/icons/okg.png`} /> :
                    walletName === 'Elsom' ? <img src={`${process.env.PUBLIC_URL}/icons/elsom.png`} /> :
                    walletName === 'Demir Bank' ? <img src={`${process.env.PUBLIC_URL}/icons/demir.png`} /> : ''
                    }
                    <span>{walletName}</span>
                </td>
                <td>{balance + ' с'}</td>
            </tr>
        )
    }) : null
}