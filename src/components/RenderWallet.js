import React from "react";

export default function RenderWallet(props) {
    return props.walletBalance ? props.walletBalance.map(
        ({ id, walletName, balance}) => {
        return (
            <tr key={id}>
                <td>{
                    walletName === 'Наличные' ? <img src={`${process.env.PUBLIC_URL}/icons/cash.png`} /> :
                    walletName === 'О! Деньги' ? <img src={`${process.env.PUBLIC_URL}/icons/okg.png`} /> :
                    walletName === 'Элсом' ? <img src={`${process.env.PUBLIC_URL}/icons/elsom.png`} /> :
                    walletName === 'Demir Bank' ? <img src={`${process.env.PUBLIC_URL}/icons/demir.png`} /> :
                    <img src={`${process.env.PUBLIC_URL}/icons/cash.png`} />
                    }
                    <span>{walletName}</span>
                </td>
                <td>{balance + ' с'}</td>
            </tr>
        )
    }) : null
}