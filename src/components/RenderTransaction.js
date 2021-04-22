import React from "react";

export default function RenderTransaction(props) {
    const headers = ['Тип', 'Сумма', 'Организация', 'Категория', 'Контрагент', 'Пользователь', 'Кошелек', 'Дата'];
    return (
        <table className="transaction__table">
            <thead className="transaction__thead">
                <tr>
                    {
                        headers.map((key, index) => {
                            return <td key={index}>{key}</td>
                        })
                    }
                </tr>
            </thead>
            <tbody className="transaction__tbody">
                {props.transactions ? props.transactions.map(
                ({ id, transactionTypeId, amount, neoSection,
                    categoryName, counterpartyName, accountantName,
                    walletId, createdDate}) => {
                return (
                    <tr key={id}>
                        <td>{
                            transactionTypeId === 0 ?
                                <img src={`${process.env.PUBLIC_URL}/icons/income_24.svg`} /> :
                            transactionTypeId === 1 ?
                                <img src={`${process.env.PUBLIC_URL}/icons/expense_24.svg`} /> :
                            transactionTypeId === 2 ?
                                <img src={`${process.env.PUBLIC_URL}/icons/transfer_24.svg`} /> : ''
                            }</td>
                        <td>{amount + ' с'}</td>
                        <td>{
                            neoSection === "GLOBAL" ? '__________' : neoSection
                        }</td>
                        <td>{categoryName}</td>
                        <td>{counterpartyName ? counterpartyName : '__________'}</td>
                        <td>{accountantName}</td>
                        <td>{
                            walletId === 1 ? <img src={`${process.env.PUBLIC_URL}/icons/cash.png`} /> :
                            walletId === 5 ? <img src={`${process.env.PUBLIC_URL}/icons/okg.png`} /> :
                            walletId === 3 ? <img src={`${process.env.PUBLIC_URL}/icons/elsom.png`} /> :
                            walletId === 2 ? <img src={`${process.env.PUBLIC_URL}/icons/demir.png`} /> :
                            <img src={`${process.env.PUBLIC_URL}/icons/cash.png`} />
                            }
                        </td>
                        <td>{createdDate.slice(0, 10)}</td>
                    </tr>
                )
            }) : null}
            </tbody>
    </table>)
}