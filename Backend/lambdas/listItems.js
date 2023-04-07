'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient({endpoint: 'http://localhost:15002/'});

const employeesTable = process.env.EMPLOYEES_TABLE;
const developmentPlanTable = process.env.DEVELOPMENT_PLAN_TABLE;
const managerAssessmentTable = process.env.MANAGER_ASSESSMENT_TABLE;
const selfAssessmentTable = process.env.SELF_ASSESSMENT_TABLE;

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
