import React, { useState, useEffect } from 'react';
import Header from './header';
import History from './history';
import axios from 'axios';

const InputForm = () => {
    const [input, setInput] = useState({});
    const [list, setList] = useState([]);

    const handleInputChange = (e) => {
        setInput({
        ...input, [e.currentTarget.name]: e.currentTarget.value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let newTransaction = {
            ...input,
            id: new Date().getTime().toString()
        }
        console.log(newTransaction);

        axios.post('http://localhost:4000/tracker', newTransaction)
            .then(res => console.log(res.data)); 
// Here we’re using the axios.post method to send an HTTP POST request to the back-end endpoint http://localhost:4000/tracker. This endpoint is expecting to get the new object in JSON format in the request body, which is being passed in as the second argument (newTransaction).

        setInput({});
        requestData();
    };

    const requestData = () => {
        axios.get('http://localhost:4000/tracker')
        .then(response => {
            // console.log('this is response.data')
            // console.log(response.data);
            setList(response.data);
            
        })
        .catch(function (error){
            console.log(error);
        })
    }

    useEffect(() => {
        // code to run on component mount
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
                                <label htmlFor="transaction-label">Transaction Label</label>
                                <input className="form-control"
                                    type="text"
                                    name="transaction-label"
                                    id="transaction-label"
                                    onChange={(e) => handleInputChange(e)}
                                    required
                                />
                                </div>
                                <div className="col">
                                <label htmlFor="transaction-value">Transaction Value</label>
                                <p>Please use a negative number for an expense. Example: -200</p>
                                <input className="form-control"
                                    type="number"
                                    name="transaction-value"
                                    id='transaction-value'
                                    onChange={(e) => handleInputChange(e)}
                                    required
                                />
                                </div>
                            </div>
                            <div className="form-group text-center pt-3">
                                <input type="submit" value="Submit" className='' />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <History historyData={list}/>
        </React.Fragment>
    );
}

export default InputForm;