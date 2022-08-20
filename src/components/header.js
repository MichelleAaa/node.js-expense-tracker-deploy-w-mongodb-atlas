// import React, { useState } from 'react';

const Header = ({ headerData }) => {

    let income = headerData.filter(transaction => transaction.transaction_type === 'income').reduce((total, item) => total + parseInt(item.transaction_value), 0);
    let expense = headerData.filter(transaction => transaction.transaction_type === 'expense').reduce((total, item) => total + parseInt(item.transaction_value), 0);
    let balance = income - expense;

    return (
        <div className="background d-flex justify-content-center pt-5">
            <div className="container-fluid">
                <div className="row">
                    <div className="col text-center">
                        <h1>Expense Tracker</h1>
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-4 text-left">
                        <h4>Your Balance</h4>
                        <p className="balance">${balance}
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <h1>Income</h1>
                        <p className="income">${income}</p>
                    </div>
                    <div className="col-6">
                        <h1>Expense</h1>
                        <p className="expense">${expense}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;