import React, { useState } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { AiFillEdit } from 'react-icons/ai';
import { MdDeleteSweep } from 'react-icons/md';
import { IconContext}  from 'react-icons';
import axios from 'axios';

const History = ({historyData, handleDeleteAll, requestData }) => {

    const HistoryItem = ({ data }) => {
        // To open and close the edit drop-down. When True, the {...&&...} statement below will render EditItem.
        const [showEdit, setShowEdit] = useState(false);

        const EditItem = ({ id }) => {
            const [type, setType] = useState('');
            const [label, setLabel] = useState('');
            const [value, setValue] = useState('');

            const onRadioBtnClick = (rSelected) => {
                setType(rSelected);
            };

            const handleSubmit = (e) => {
                e.preventDefault();

                if(type !== ''){
                    let updatedTransaction = {
                        "transaction-label": label,
                        "transaction-value": value,
                        "transaction-type": type
                    }

                    //Axios is being used to send a put request, which will include the id in the URL. The second argument is to send the updated data in JSON format.
                    axios.put('http://localhost:4000/tracker/' + id, updatedTransaction)
                        .then(res => {
                            console.log(res.data);
                            // Sets input fields back to being empty:
                            e.target.reset();
                            // Sets type back to '':
                            setType('');
                            // Requests the data so the list will update:
                            requestData();
                        }); 
                } else {
                    alert('Error, please make a valid type selection.')
                }
            };

            return (
                <div className="col-10 m-5 p-5">
                    <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="row form-group">
                                <div className="col">
                                <label className='transaction-entry-label' htmlFor="transaction-label">Label:</label>
                                <input className="form-control"
                                    type="text"
                                    name="transaction-label"
                                    id="transaction-label"
                                    onChange={(e) => setLabel(e.target.value)}
                                    required
                                />
                                </div>
                                <div className="col">
                                <label className='transaction-entry-label' htmlFor="transaction-value">Value:</label>
                                <input className="form-control"
                                    type="number"
                                    name="transaction-value"
                                    id='transaction-value'
                                    onChange={
                                        (e) => setValue(e.target.value)
                                    }
                                    min="0"
                                    required
                                />
                                </div>
                                <div className="row form-group">
                                    <label className="col-sm-6 col-form-label mx-auto mt-2 transaction-entry-label">Type:</label>
                                    <ButtonGroup>
                                        <Button color="secondary" onClick={() => onRadioBtnClick('income')}>Income</Button>
                                        <Button color="secondary" onClick={() => onRadioBtnClick('expense')}>Expense</Button>
                                    </ButtonGroup>
                                </div>
                            <div className="form-group text-center pt-4 d-flex justify-content-left flex-row">
                                <input type="submit" value="Submit" className='btn transaction-update-submit m-2'/>
                                <button type="button" className="btn transaction-update-cancel m-2" onClick={() => setShowEdit(!showEdit)}>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            );
        };

        const deleteItem = (id) => {
            axios.delete('http://localhost:4000/tracker/'+ id)
            .then(response => {
                console.log(response.data);
                requestData();
                
            })
            .catch(function (error){
                console.log(error);
            })
        };

        return (
            <div className='row'>
                <article className="col-12 col-xl-11">
                    <div className={ data.transaction_type === 'income' ? "history-item history-item-income" : "history-item history-item-expense"} id="history">
                        <div className='row m-5 d-flex justify-content-center align-items-center'>
                            <div className='col-8'>
                                <h4 className='history-item-label'>{data.transaction_label}</h4>
                                <p className='history-item-value'>${data.transaction_value}</p>
                            </div>
                            <div className='col-4 d-flex justify-content-center flex-row'>
                                <div className='m-1'>
                                    <button type="button" className="btn history-item-btn mr-2" onClick={() => setShowEdit(!showEdit)}>
                                        <IconContext.Provider value={ {className: "icon-edit"} }>
                                            <AiFillEdit size='25px' />
                                        </IconContext.Provider>
                                    </button>
                                </div>
                                <div className='m-1'>
                                    <button type="button" className="btn history-item-btn" onClick={() => deleteItem(data._id)}>
                                        <IconContext.Provider value={ {className: "icon-delete"} }>
                                            <MdDeleteSweep size='25px' />
                                        </IconContext.Provider>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
                {showEdit && <EditItem id={data._id} />}
            </div>
        );
    };

    return (
        <section className="d-flex justify-content-center pt-2">
            <div className="container-fluid text-center">
                <div className="row d-flex justify-content-center">
                    <div className="col-6">
                        <h2>Transaction History</h2>
                        <button type="submit" className="btn history-delete-btn mt-1" onClick={() => handleDeleteAll()
                            }>Delete All</button>
                    </div>
                </div>
                <div className="row mt-3 pb-5 mb-5 d-flex justify-content-center">
                    <div className="col-12 col-md-6 col-xl-5">
                        <h3>Income</h3>
                        {/* Filters by income type first to verify whether there's even one record. If there isn't even one income record at index 0 of the result array, a paragraph element is printed. Otherwise, the list will render. */}
                        {historyData.filter(transaction => transaction.transaction_type === 'income')[0] === undefined ? <p className='m-4 transaction-history-empty'>There are no income transactions yet.</p> : historyData.filter(transaction => transaction.transaction_type === 'income').map(transaction => <HistoryItem data={transaction} key={transaction._id}/>)}
                    </div>
                    <div className="col-12 col-md-6 col-xl-5">
                        <h3>Expenses</h3>
                        {historyData.filter(transaction => transaction.transaction_type === 'expense')[0] === undefined ? <p className='m-4 transaction-history-empty'>There are no expense transactions yet.</p> : historyData.filter(transaction => transaction.transaction_type === 'expense').map(transaction => <HistoryItem data={transaction} key={transaction._id}/>)}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default History;