'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient({endpoint: 'http://localhost:8000'});
const uuid = require('uuid');

let isPostmanMode = true;
let postmanID = 0;

exports.createEmployee = async (event, context, callback) => {
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
        TableName: process.env.EMPLOYEES_TABLE,
        Item: {
            id: isPostmanMode ? generateTestID().toString() : uuid.v1(),
            firstName: data.firstName,
            lastName: data.lastName,
            isManager: data.isManager,
            createdDate: dt,
            createdTimestamp: ts,
            updatedDate: dt,
            updatedTimestamp: ts
        }
    }

    console.log("Creating Employee");

    try{
        await dynamoDb.put(params).promise()
            .then(res => {
                callback(null, {
                    statusCode,
                    headers,
                    body: JSON.stringify({message: 'Created Employee Successfully!'})
                });
            }).catch(err => {
                console.log(err);
                callback(null, {
                    statusCode: 500,
                    headers,
                    body: JSON.stringify({message: 'Unable to Create Employee'})
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
};

function generateTestID() {
    postmanID += 1;
    return postmanID;
};