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

            // const handleTypeChange = (e) => {
            //     setType({
            //     ...type, [e.currentTarget.name]: e.currentTarget.value });
            // };

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
                        // id: new Date().getTime().toString()
                    }

                    //Axios is being used to send a put request, which will include the id in the URL. The second argument is to send the updated data in JSON format.
                    axios.put('http://localhost:4000/tracker/' + id, updatedTransaction)
                        .then(res => {
                            console.log(res.data);
                            // Sets input fields back to being empty:
                            e.target.reset();
                            // Request's the data so the list will update:
                            requestData();
                        }); 
                } else {
                    alert('Error, please make a valid type selection.')
                }
            };

            return (
                <div className="col-10 m-5 p-5">
                {/* <div className="history" id="his tory"> */}
                    <form onSubmit={(e) => handleSubmit(e)} className=''>
                            <div className="row form-group">
                                <div className="col">
                                <label htmlFor="transaction-label">Label:</label>
                                <input className="form-control"
                                    type="text"
                                    name="transaction-label"
                                    id="transaction-label"
                                    onChange={
                                        (e) => setLabel(e.target.value)
                                    }
                                    required
                                />
                                </div>
                                <div className="col">
                                <label htmlFor="transaction-value">Value:</label>
                                <input className="form-control"
                                    type="number"
                                    name="transaction-value"
                                    id='transaction-value'
                                    onChange={
                                        (e) => setValue(e.target.value)
                                    }
                                    required
                                />
                                </div>
                                <div className="row form-group">
                                    <label className="col-sm-6 col-form-label mx-auto mt-2">Type:</label>
                                    <ButtonGroup>
                                        <Button color="secondary" onClick={() => onRadioBtnClick('income')}>Income</Button>
                                        <Button color="secondary" onClick={() => onRadioBtnClick('expense')}>Expense</Button>
                                    </ButtonGroup>
                                    {/* <fieldset id="transaction-type"> */}
                                        {/* <div className="col-4 btn-group btn-group-toggle" data-toggle="buttons">
                                            <label className="btn radio-btn-1 active text-nowrap">
                                                <input type="radio" name="transaction-type" autoComplete="off" value="income" checked={'income'}  onChange={handleTypeChange} required /> Income
                                            </label>
                                            <label className="btn radio-btn-2 text-nowrap">
                                                <input type="radio" name="transaction-type" autoComplete="off" value="expense" checked={'expense'} onChange={handleTypeChange} /> Expense
                                            </label>
                                        </div> */}
                                    {/* </fieldset> */}
                                </div>
                            <div className="form-group text-center pt-3">
                                <input type="submit" value="Submit" className='' />
                                <button type="button" className="btn-modal btn-modal-submit" onClick={() => setShowEdit(!showEdit)}>Cancel</button>
                            </div>
                            </div>
                        </form>
                    
                {/* </div> */}
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
        <React.Fragment>
            <article className="col-12">
                <div className="history-item" id="history">
                    <div className='row m-5 d-flex justify-content-center align-items-center'>
                        <div className='col-6'>
                            <h3>{data.transaction_label}</h3>
                            <p>${data.transaction_value}</p>
                        </div>
                        <div className='col-6'>
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
        </React.Fragment>
        );
    };

    return (
        <section className="d-flex justify-content-center pt-5">
            <div className="container-fluid text-center">
                <div className="row d-flex justify-content-center">
                    <div className="col-6">
                        <h2>History</h2>
                    {/* </div>
                    <div className="col-2"> */}
                        <button type="submit" className="btn history-delete-btn mt-1" onClick={() => handleDeleteAll()
                            }>Delete All</button>
                    </div>
                </div>
                <div className="row mt-3 pb-5 mb-5">
                    <div className="col-12 col-md-6">
                        <h2>Income Transactions</h2>
                        {historyData.filter(transaction => transaction.transaction_type === 'income').map(transaction => <HistoryItem data={transaction} key={transaction._id}/>)}
                    </div>
                    <div className="col-12 col-md-6">
                        <h2>Expense Transactions</h2>
                        {historyData.filter(transaction => transaction.transaction_type === 'expense').map(transaction => <HistoryItem data={transaction} key={transaction._id}/>)}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default History;