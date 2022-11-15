const Header = ({ headerData }) => {
    let income = headerData.filter(transaction => transaction.transaction_type === 'income').reduce((total, item) => total + parseInt(item.transaction_value), 0);
    let expense = headerData.filter(transaction => transaction.transaction_type === 'expense').reduce((total, item) => total + parseInt(item.transaction_value), 0);
    let balance = income - expense;

    return (
        <section className="d-flex justify-content-center pt-4">
            <div className="container-fluid">
                <div className="row">
                    <div className="col text-center pb-4">
                        <h1>Expense Tracker</h1>
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col text-center">
                        <h3>Your Balance</h3>
                        <p className={balance === 0 || balance === -0 ? 'balance' : Math.sign(balance) === 1 ? 'income' : 'expense'}>${balance}
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 text-center">
                        <h3>Income</h3>
                        <p className="income">${income}</p>
                    </div>
                    <div className="col-6 text-center">
                        <h3>Expense</h3>
                        <p className="expense">${expense}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Header;