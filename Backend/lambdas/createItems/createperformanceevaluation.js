'use strict';


const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient({endpoint: 'http://localhost:8000'});
const uuid = require('uuid');
const performanceEvaluationTable = process.env.MANAGER_ASSESSMENTS_TABLE;

let isPostmanMode = false; //remove later
let postmanID = 0; //remove later

exports.createPerformanceEvaluation = async (event, context, callback) => {
    let headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    };
    let statusCode = 200;

    const data = JSON.parse(event.body);
    console.log("EVENT:::", data);

    
    //create new timestamp value
    let d = new Date();
    let h = addZero(d.getHours());
    let m = addZero(d.getMinutes());
    let ts = h + ':' + m;
    //create new date value
    let MM = addZero(d.getMonth()+1);
    let dd = addZero(d.getDate());
    let y = d.getFullYear();
    let dt = y + '/' + MM + '/' + dd;

    const params = {
        TableName: process.env.MANAGER_ASSESSMENTS_TABLE,
        Item: {
            id: isPostmanMode ? generateTestID(postmanID).toString() : uuid.v1(),
            employeeId: data.employeeId,
            supervisorName: data.supervisorName,
            dateComplete: data.dateComplete, //might change to dt (maybe??)
            //communication section
            rating1: data.rating1,
            feedback1: data.feedback1,
            //collaboration and teamwork section
            rating2: data.rating2,
            feedback2: data.feedback2,
            //quality and accuracy of work section
            rating3: data.rating3,
            feedback3: data.feedback3,
            //attendance, punctuality and reliability section
            rating4: data.rating4,
            feedback4: data.feedback4,
            //goal accomplishments and deadline timelines
            rating5: data.rating5,
            feedback5: data.rating5

        }
    }

    console.log("Creating Performance Evaluation");

    try{
        await dynamoDb.put(params).promise()
            .then(res => {
                callback(null, {
                    statusCode,
                    headers,
                    body: JSON.stringify({message: 'Created Performance Evaluation Sucessfully!'})
                });
            }).catch(err => {
                console.log(err);
                callback(null, {
                    statusCode: 500,
                    headers,
                    body: JSON.stringify({message: 'Unable to Create Performance Evaluation'})
                });
            });
    } catch (err) {
        return { error: err }
    }
};

function addZero(i) {
    if (i<10) {
        i = '0' + i;
    }
    return i;
}

function generateTestID(postmanID) {
    postmanID += 1;
    return postmanID;
};
