'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient({ endpoint: 'http://localhost:8000' });
const uuid = require('uuid');

const employeesTable = process.env.EMPLOYEES_TABLE;
const developmentPlanTable = process.env.DEVELOPMENT_PLAN_TABLE;
const managerAssessmentTable = process.env.MANAGER_ASSESSMENT_TABLE;
const selfAssessmentTable = process.env.SELF_ASSESSMENT_TABLE;

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
        case "development-plan":
            table = developmentPlanTable;
            break;
        case "manager-assessment":
            table = managerAssessmentTable;
            break;
        case "self-assessment":
            table = selfAssessmentTable;
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

    console.log("Updating table item:::", table);

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