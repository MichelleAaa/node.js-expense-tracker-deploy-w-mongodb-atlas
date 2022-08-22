import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import Header from './header';
import History from './history';
import axios from 'axios';

const InputForm = () => {
    const [type, setType] = useState('');
    const [label, setLabel] = useState('');
    const [value, setValue] = useState('');
    const [list, setList] = useState([]);

    const onRadioBtnClick = (rSelected) => {
        setType(rSelected);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(type !== ''){
            let newTransaction = {
                "transaction-label": label,
                "transaction-value": value,
                "transaction-type": type
            }
            axios.post('http://localhost:4000/tracker', newTransaction)
                .then(res => {
                    console.log(res.data);
                    //Sends an HTTP POST request to the backend endpoint http://localhost:4000/tracker. This endpoint is expecting to get the new object in JSON format in the request body, which is being passed in as the second argument (newTransaction).

                    // Sets input fields back to being empty:
                    e.target.reset();
                    // Sets type back to '':
                    setType('');
                    // Requests the data so the list will update/re-render:
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
    };

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
        // Runs on component mount, so the list will populate with data from the server on page load:
        requestData();
    }, []);

    return (
        <React.Fragment>
            <Header headerData={list} />
            <section className="container-fluid">
                <div className="row d-flex justify-content-center">
                    <div className="col-11 col-lg-6 text-center mt-2 pb-5">
                        <h2 className="pb-3">Transaction Entry</h2>
                        <form onSubmit={(e) => handleSubmit(e)} className='text-left'>
                            <div className="row form-group">
                                <div className="col-6">
                                    <label className='transaction-entry-label' htmlFor="transaction-label">Label:</label>
                                    <input className="form-control"
                                        type="text"
                                        name="transaction-label"
                                        id="transaction-label"
                                        onChange={(e) => setLabel(e.target.value)}
                                        required
                                    />
                                </div> 
                                <div className="col-6">
                                    <label className='transaction-entry-label' htmlFor="transaction-value">Value:</label>
                                    <input className="form-control"
                                        type="number"
                                        name="transaction-value"
                                        id='transaction-value'
                                        onChange={(e) => setValue(e.target.value)}
                                        min="0"
                                        required
                                    />
                                </div>
                                <div className="row form-group">
                                    <div className="col col-form-label mx-auto mt-2 transaction-entry-label">Type: </div>
                                    <ButtonGroup>
                                        <Button color="secondary" onClick={() => onRadioBtnClick('income')}>Income</Button>
                                        <Button color="secondary" onClick={() => onRadioBtnClick('expense')}>Expense</Button>
                                    </ButtonGroup>
                                    {/* </div> */}
                                </div>
                            <div className="form-group text-center pt-3">
                                <input type="submit" value="Submit" className='btn entry-btn mt-2' />
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