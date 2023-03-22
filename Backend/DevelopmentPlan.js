/*
Author: Clara Cerda
Date created: 3/17/23
desc: a simple lambda function/creation of dynamodb table for the development plan of the risen one consulting project
NOTE: subject to change since I'm not expecting this to be entirely revolutionary
 */
'use strict'
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient({endpoint: 'http://localhost:15002/'});
const uuid = require('uuid'); //maybe used as an identifier

exports.developmentPlan = async(event, context, callback) => {
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
        Tablename: process.env.DEVELOPMENT_PLAN,
        Item: {
            id: uuid.v1(),
            EmpId: uuid.v2(),//for the employee id as well...review later
            //something here to indicate dev plan idk lol
            createdDate: dt,
            createdTimestamp: ts
        }
      }
      console.log("development plan created");

      try{
        await dynamoDb.put(params).promise()
            .then(res => {
                callback(null, {
                    statusCode,
                    headers,
                    body: JSON.stringify({message: 'Created plan successfully!'})
                });
            }).catch(err => {
                console.log(err);
                callback(null, {
                    statusCode: 500,
                    headers,
                    body: JSON.stringify({message: 'Unable to Create plan'})
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

