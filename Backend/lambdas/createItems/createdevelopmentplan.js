/*
Author: Clara Cerda
Date created: 3/17/23
desc: a simple lambda function/creation of dynamodb table for the development plan of the risen one consulting project
NOTE: subject to change since I'm not expecting this to be entirely revolutionary
 */
'use strict'

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient({endpoint: 'http://localhost:8000/'});
const uuid = require('uuid'); //maybe used as an identifier

let isPostmanMode = false;
let postmanID = 0;

exports.createDevelopmentPlan = async(event, context, callback) => {
    let headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    };
    let statusCode = 200;

    const data = JSON.parse(event.body);
    console.log("EVENT:::", data);

      //create new timestamp value //might not need but ask later
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
        TableName: process.env.DEVELOPMENT_PLAN_TABLE,
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

      try{
        await dynamoDb.put(params).promise()
            .then(res => {
                callback(null, {
                    statusCode,
                    headers,
                    body: JSON.stringify({message: 'Created Development Plan Successfully!'})
                });
            }).catch(err => {
                console.log(err);
                callback(null, {
                    statusCode: 500,
                    headers,
                    body: JSON.stringify({message: 'Unable to Create Development Plan'})
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