'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient({endpoint: 'http://localhost:8000'});

const jobsTable = process.env.JOBS_TABLE;
const employeesTable = process.env.EMPLOYEES_TABLE;
const developmentPlanTable = process.env.DEVELOPMENT_PLAN_TABLE;

exports.listItems = async (event, context, callback) => {
    let headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    };
    let statusCode = 200;

    console.log("EVENT:::", JSON.stringify(event));

    const tableName = event.pathParameters.model
    let table;
    switch (tableName) {
        case "employees":
            table = employeesTable;
            break;
        case "development-plan":
            table = developmentPlanTable;
            break;
        default:
            throw new Error(`Unsupported resource: "${modelName}"`);
    }

    const params = {
        TableName: table
    }

    console.log("Getting Items from table:::", table);

    await dynamoDb.scan(params, (error, data) => {
        if (error) {
            console.log('Scan failed. Error JSON:', JSON.stringify(error, null, 2));
            callback(error);
            return;
        }
        const response = {
            statusCode,
            headers,
            body: JSON.stringify(data.Items)
        }
        callback(null, response);
    }).promise();
};
