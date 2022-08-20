// import React, { useState } from 'react';
import axios from 'axios';

// const [showInfo, setShowInfo] = useState(false);
//  In the render section - {showInfo && <p>{sectionData.questions.map(question => <SectionQuestions questionData={question}/>)}</p>}

const History = ({historyData, handleDeleteAll, requestData }) => {

    // console.log('this is props');
    // console.log(historyData);

    const HistoryItem = ({ data }) => {

        const deleteItem = (id) => {
            console.log(id);
            axios.delete('http://localhost:4000/tracker/'+ id)
        .then(response => {
            console.log(response.data);
            requestData();
            
        })
        .catch(function (error){
            console.log(error);
        })
        }

        console.log('this is data');
        console.log(data);
        return (
        <div className="col-8">
            <div className="history" id="history" data-id={data.id}>
                <h6>{data.transaction_label}</h6>
                <p>{data.transaction_value}</p>
                <button type="button" className="btn-modal btn-modal-submit" onClick={() => deleteItem(data._id)}>Delete</button>
            </div>
        </div>
        );
    };

    return (
        <div className="background d-flex justify-content-center pt-5">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-6">
                        <h1>History</h1>
                    </div>
                    <div className="col-6">
                        <button type="submit" className="btn-modal btn-modal-submit" onClick={() => handleDeleteAll()
                            }>Delete All</button>
                    </div>
                    <div className="row">
                        <div className="col-12">
                        {
                            historyData.map(transaction => <HistoryItem data={transaction} key={transaction.id}/>)
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default History;