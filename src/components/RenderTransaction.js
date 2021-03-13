import React from "react";

export default function RenderTransaction(props) {
    return props.transactions ? props.transactions.map(
        ({ id, transactionType, amount, neoSection,
            categoryName, counterpartyName, accountantName,
            walletName, createdDate}) => {
        return (
            <tr key={id}>
                <td>{
                    transactionType === 'INCOME' ?
                        <img src={`${process.env.PUBLIC_URL}/icons/income.svg`} /> :
                    transactionType === 'EXPENSE' ?
                        <img src={`${process.env.PUBLIC_URL}/icons/expense.svg`} /> :
                    transactionType === 'MONEY_TRANSFER' ?
                        <img src={`${process.env.PUBLIC_URL}/icons/transfer.svg`} /> : ''
                    }</td>
                <td>{amount + ' с'}</td>
                <td>{neoSection}</td>
                <td>{categoryName}</td>
                <td>{counterpartyName}</td>
                <td>{accountantName}</td>
                <td>{
                    walletName === 'Наличные' ? <img src={`${process.env.PUBLIC_URL}/icons/cash.png`} /> :
                    walletName === 'О деньги' ? <img src={`${process.env.PUBLIC_URL}/icons/okg.png`} /> :
                    walletName === 'Elsom' ? <img src={`${process.env.PUBLIC_URL}/icons/elsom.png`} /> :
                    walletName === 'Demir Bank' ? <img src={`${process.env.PUBLIC_URL}/icons/demir.png`} /> : ''
                    }
                </td>
                <td>{createdDate.slice(0, 10)}</td>
            </tr>
        )
    }) : null
}