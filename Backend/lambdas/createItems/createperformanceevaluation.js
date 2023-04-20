'use strict';


const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient({endpoint: 'http://localhost:8000'});
const uuid = require('uuid');

let isPostmanMode = false;
let postmanID = 0;

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
            employeeName: data.employeeName,
            goals: data.goals,
            createdDate: dt,
            createdTimestamp: ts,
            updatedDate: dt,
            updatedTimestamp: ts
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