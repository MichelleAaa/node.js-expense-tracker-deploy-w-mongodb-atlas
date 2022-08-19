import React, { useState } from 'react';

const Header = (props) => {
// console.log(props);

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
                        <p className="balance">$0.00</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <h1>Income</h1>
                        <p className="income">$0.00</p>
                    </div>
                    <div className="col-6">
                        <h1>Expense</h1>
                        <p className="expense">$0.00</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;