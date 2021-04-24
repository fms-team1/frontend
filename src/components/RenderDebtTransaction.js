import React from "react";
import { useHistory } from "react-router";

export default function RenderDebtTransaction(props) {
    const history = useHistory();

    const headers = ['Организация', 'Сумма', 'Оплачено', 'Долг', 'Категория', 'Контрагент', 'Кошелек', 'Дата'];
    return (
        <div className="transaction__table">
            <div className="transaction__head">
                <div className="transaction__head-item">
                    {
                        headers.map((key, index) => {
                            return <div key={index}>{key}</div>
                        })
                    }
                </div>
            </div>
            <div className="transaction__body">
                {props.transactions ? props.transactions.map(
                ({ id, owe, paid, toBePaid, transactionModel}) => {
                return (
                    <div key={id} className="transaction__item">
                        <div>{
                            transactionModel.neoSection === "GLOBAL" ? '__________' : transactionModel.neoSection
                        }</div>
                        <div>{toBePaid + ' с'}</div>
                        <div>{paid + ' с'}</div>
                        <div>{owe + ' с'}</div>
                        <div>{transactionModel.categoryName ? transactionModel.categoryName : '__________'}</div>
                        <div>{transactionModel.counterpartyName ? transactionModel.counterpartyName : '__________'}</div>
                        <div>{
                            transactionModel.walletId === 1 ? <img src={`${process.env.PUBLIC_URL}/icons/cash.png`} /> :
                            transactionModel.walletId === 2 ? <img src={`${process.env.PUBLIC_URL}/icons/okg.png`} /> :
                            transactionModel.walletId === 4 ? <img src={`${process.env.PUBLIC_URL}/icons/elsom.png`} /> :
                            transactionModel.walletId === 3 ? <img src={`${process.env.PUBLIC_URL}/icons/demir.png`} /> :
                            <img src={`${process.env.PUBLIC_URL}/icons/cash.png`} />
                            }
                        </div>
                        <div>{transactionModel.createdDate ? transactionModel.createdDate.slice(0, 10) : "__________"}</div>
                        <div className="transaction__edit-box">
                            <div className="transaction__edit"><i className="fas fa-pencil-alt" onClick={() => history.push(`/editDebt/${id}`)}></i></div>
                            <div className="transaction__delete"><i className="fas fa-trash-alt" onClick={() => props.onHandleDelete(id)}></i></div>
                        </div>
                    </div>
                )
            }) : null}
            </div>
        </div>)
}