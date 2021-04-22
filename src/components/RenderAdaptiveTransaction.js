import React from "react";

export default function RenderAdaptiveTransaction(props) {

    return props.transactions ? props.transactions.map(
        ({ id, transactionTypeId, amount,
            categoryName, createdDate}) => {
        return (
            <div key={id} className="transaction__item">
                <div>{
                    transactionTypeId === 0 ?
                        <img src={`${process.env.PUBLIC_URL}/icons/income_24.svg`} /> :
                    transactionTypeId === 1 ?
                        <img src={`${process.env.PUBLIC_URL}/icons/expense_24.svg`} /> :
                    transactionTypeId === 2 ?
                        <img src={`${process.env.PUBLIC_URL}/icons/transfer_24.svg`} /> : ''
                    }</div>
                <div>{categoryName}</div>
                <div className={
                    transactionTypeId === 0 ? 'transaction__income' :
                    transactionTypeId === 1 ? 'transaction__expense' :
                    transactionTypeId === 2 ? 'transaction__transfer' : ''}>
                        {transactionTypeId === 0 ? '+' + amount + ' c' :
                        transactionTypeId === 1 ? '-' + amount + ' c' : amount + ' c'}
                </div>
                <div>{createdDate.slice(0, 10)}</div>
            </div>)
            }) : null
}