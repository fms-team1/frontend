import React, { useEffect, useState } from "react";

export default function RenderAdaptiveTransaction(props) {

    return props.transactions ? props.transactions.map(
        ({ id, transactionType, amount,
            categoryName, createdDate}) => {
        return (
            <div key={id} className="transaction__item">
                <div>{
                    transactionType === 'INCOME' ?
                        <img src={`${process.env.PUBLIC_URL}/icons/income.svg`} /> :
                    transactionType === 'EXPENSE' ?
                        <img src={`${process.env.PUBLIC_URL}/icons/expense.svg`} /> :
                    transactionType === 'MONEY_TRANSFER' ?
                        <img src={`${process.env.PUBLIC_URL}/icons/transfer.svg`} /> : ''
                    }</div>
                <div>{categoryName}</div>
                <div className={
                    transactionType === 'INCOME' ? 'transaction__income' :
                    transactionType === 'EXPENSE' ? 'transaction__expense' :
                    transactionType === 'MONEY_TRANSFER' ? 'transaction__transfer' : ''}>
                        {transactionType === 'INCOME' ? '+' + amount + ' c' :
                        transactionType === 'EXPENSE' ? '-' + amount + ' c' : amount + ' c'}
                </div>
                <div>{createdDate.slice(0, 10)}</div>
            </div>)
            }) : null
}