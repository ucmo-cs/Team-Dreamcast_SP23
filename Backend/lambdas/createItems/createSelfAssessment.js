'use strict';

var helpers = require("../../helpers.js");
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient({endpoint: 'http://localhost:8000'});
const uuid = require('uuid');

let isPostmanMode = true;
let postmanID = 0;

exports.createSelfAssessment = async (event, context, callback) => {
    let headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    };
    let statusCode = 200;

    const data = JSON.parse(event.body);
    console.log("EVENT:::", data);

    //create new timestamp value
    let d = new Date();
    let h = helpers.addZero(d.getHours());
    let m = helpers.addZero(d.getMinutes());
    let ts = h + ':' + m;
    //create new date value
    let MM = helpers.addZero(d.getMonth()+1);
    let dd = helpers.addZero(d.getDate());
    let y = d.getFullYear();
    let dt = y + '/' + MM + '/' + dd;

    const params = {
        TableName: process.env.SELF_ASSESSMENT_TABLE,
        Item: {
            id: isPostmanMode ? helpers.generateTestID(postmanID).toString() : uuid.v1(),
            employeeId: data.employeeId,
            employeeName: data.employeeName,
            goals: data.goals,
            createdDate: dt,
            createdTimestamp: ts,
            updatedDate: dt,
            updatedTimestamp: ts
        }
    }

    console.log("Creating Self Assessment");

    try{
        await dynamoDb.put(params).promise()
            .then(res => {
                callback(null, {
                    statusCode,
                    headers,
                    body: JSON.stringify({message: 'Created Self Assessment Successfully!'})
                });
            }).catch(err => {
                console.log(err);
                callback(null, {
                    statusCode: 500,
                    headers,
                    body: JSON.stringify({message: 'Unable to Create Self Assessment'})
                });
            });
    } catch (err) {
        return { error: err }
    }
};
