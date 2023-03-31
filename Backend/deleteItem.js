'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient({ endpoint: 'http://localhost:15002/' });
const uuid = require('uuid');

const employeesTable = process.env.EMPLOYEES_TABLE;

exports.deleteItem = async (event, context, callback) => {
    let headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    };
    let statusCode = 200;

    console.log("EVENT:::", JSON.stringify(event));

    const tableName = event.pathParameters.model
    const id = event.pathParameters.id;
    let table;

    switch (tableName) {
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

    console.log("Deleting item from the table:::", table);

    console.log("\n\n" + id);

    try {
        await dynamoDb.delete(params).promise()
            .then(res => {
                callback(null, {
                    statusCode,
                    headers,
                    body: JSON.stringify({ message: 'Deleted Item Successfully!' })
                });
            }).catch(err => {
                console.log(err);
                callback(null, {
                    statusCode: 500,
                    headers,
                    body: JSON.stringify({ message: 'Unable to Delete Item' })
                });
            });
    } catch (err) {
        return { error: err }
    }
}