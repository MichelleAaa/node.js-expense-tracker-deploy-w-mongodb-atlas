// import React, { useState } from 'react';

const History = (props) => {
    console.log(props);
    
    const HistoryItem = (props) => {
        // console.log('this is history item data');
        // console.log(props);
        return (
        <div className="col-8">
            <div className="history" id="history" data-id={props.data.id}>
                <h6>{props.data.transaction_label}</h6>
                <p>{props.data.transaction_value}</p>
            </div>
        </div>
        );
    };

    return (
        <div className="background d-flex justify-content-center pt-5">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <h1>History</h1>
                    </div>

                    {
                        props.historyData.map(transaction => <HistoryItem data={transaction} key={transaction.id}/>)
                    }

                </div>
            </div>
        </div>
    );
}

export default History;