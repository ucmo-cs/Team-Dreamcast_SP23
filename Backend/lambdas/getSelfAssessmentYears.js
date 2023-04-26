'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient({ endpoint: 'http://localhost:8000' });

const selfAssessmentTable = process.env.SELF_ASSESSMENT_TABLE;

exports.getSelfAssessmentYears = async (event, context, callback) => {
    let headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    };
    let statusCode = 200;

    console.log("EVENT:::", JSON.stringify(event));

    const tableName = event.pathParameters.model
    const employeeId = event.pathParameters.employeeId;

    let table;
    switch (tableName) {
        case "self-assessment":
            table = selfAssessmentTable;
            break;
        default:
            throw new Error(`Unsupported resource: "${modelName}"`);
    }

    const params = {
        TableName: table,
        FilterExpression: "#employeeId = :employeeId",
        ExpressionAttributeNames: { "#employeeId": "employeeId" },
        ExpressionAttributeValues: {
            ':employeeId': employeeId
        }
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
            body: JSON.stringify(data.Items.map(assessment => assessment.assessmentYear))
        }
        callback(null, response);
    }).promise();
};
