import React, { useState, useEffect } from 'react';
import Header from './header';
import History from './history';
import axios from 'axios';

const InputForm = () => {
    const [type, setType] = useState({});
    const [label, setLabel] = useState('');
    const [value, setValue] = useState('');
    const [list, setList] = useState([]);

    const handleTypeChange = (e) => {
        setType({
        ...type, [e.currentTarget.name]: e.currentTarget.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(type['transaction-type']){
            let newTransaction = {
                "transaction-label": label,
                "transaction-value": value,
                "transaction-type": type['transaction-type'],
                id: new Date().getTime().toString()
            }
            console.log(newTransaction);

            axios.post('http://localhost:4000/tracker', newTransaction)
                .then(res => {
                    console.log(res.data);
                    // Here we’re using the axios.post method to send an HTTP POST request to the back-end endpoint http://localhost:4000/tracker. This endpoint is expecting to get the new object in JSON format in the request body, which is being passed in as the second argument (newTransaction).

                    // Sets input fields back to being empty:
                    e.target.reset();
                    // Request's the data so the list will update:
                    requestData();
                }); 
            
        } else {
            alert('Error, please make a valid type selection.')
        }
    };

    const requestData = () => {
        axios.get('http://localhost:4000/tracker')
        .then(response => {
            setList(response.data);
            
        })
        .catch(function (error){
            console.log(error);
        })
    }

    const handleDeleteAll = (e) => {
        axios.delete('http://localhost:4000/tracker')
        .then(response => {
            console.log(response.data);
            requestData();
        })
        .catch(function (error){
            console.log(error);
        })
    };

    useEffect(() => {
        // code to run on component mount, so the list will populate with data from the server on page load:
        requestData();
    }, []);

    return (
        <React.Fragment>
            <Header headerData={list} />
            <section className="container-fluid">
                <div className="row d-flex justify-content-center">
                    <div className="col-11 col-lg-6 text-center mt-4 py-5">
                        <h2 className="pb-5">Add a New Transaction</h2>
                        <form onSubmit={(e) => handleSubmit(e)} className='text-left'>
                            <div className="row form-group">
                                <div className="col">
                                <label htmlFor="transaction-label">Label</label>
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
                                <label htmlFor="transaction-value">Value</label>
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
                                <label className="col-sm-6 col-form-label modal-text">Type:</label>
                                <fieldset id="transaction-type">
                                    <div className="col-4 btn-group btn-group-toggle" data-toggle="buttons">
                                        <label className="btn radio-btn-1 active text-nowrap">
                                            <input type="radio" name="transaction-type" autoComplete="off" value="income" checked={'income'}  onChange={handleTypeChange} required /> Income
                                        </label>
                                        <label className="btn radio-btn-2 text-nowrap">
                                            <input type="radio" name="transaction-type" autoComplete="off" value="expense" checked={'expense'} onChange={handleTypeChange} /> Expense
                                        </label>
                                    </div>
                                </fieldset>
                                </div>
                            <div className="form-group text-center pt-3">
                                <input type="submit" value="Submit" className='' />
                            </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <History historyData={list} handleDeleteAll={handleDeleteAll} requestData={requestData}/>
        </React.Fragment>
    );
}

export default InputForm;