'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient({endpoint: 'http://localhost:8000'});

const jobsTable = process.env.JOBS_TABLE; //Grab the table name from env variables defined in serverless.yml
const employeesTable = process.env.EMPLOYEES_TABLE;

exports.getItem = async (event, context, callback) => {
    let headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    };
    let statusCode = 200;

    console.log("EVENT:::", JSON.stringify(event));

    const tableName = event.pathParameters.model
    console.log("\n\n");
    console.log(tableName);
    const id = event.pathParameters.id;
    let table;
    switch (tableName) { //If you have other tables you would add them here as other case statements to reference that table.
        case "jobs":
            table = jobsTable;
            break;
        case "employees":
            table = employeesTable;
            break;
        default:
            throw new Error(`Unsupported resource: "${modelName}"`);
    }

    const params = {
        TableName: table,
        Key: {
            'id': id,
        }
    }

    console.log("Getting Items from table:::", table);

    await dynamoDb.get(params, (error, data) => {
        if (error) {
            console.log('Scan failed. Error JSON:', JSON.stringify(error, null, 2));
            callback(error);
            return;
        }
        const response = {
            statusCode,
            headers,
            body: JSON.stringify(data.Item)
        }
        callback(null, response);
    }).promise();
};
