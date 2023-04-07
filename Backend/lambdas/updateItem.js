'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient({ endpoint: 'http://localhost:8000' });

const employeesTable = process.env.EMPLOYEES_TABLE;
const developmentPlanTable = process.env.DEVELOPMENT_PLAN_TABLE;
const managerAssessmentTable = process.env.MANAGER_ASSESSMENT_TABLE;
const selfAssessmentTable = process.env.SELF_ASSESSMENT_TABLE;

exports.updateItem = async (event, context, callback) => {
    let headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    };

    let statusCode = 200;

    // get the data from inside request body
    const data = JSON.parse(event.body);

    // outputs what kind of event we are messing with
    console.log("EVENT:::", JSON.stringify(event));

    // vars we pull from the request path
    const tableName = event.pathParameters.model
    const id = event.pathParameters.id;

    //create new timestamp value
    let d = new Date();
    let h = addZero(d.getHours());
    let m = addZero(d.getMinutes());
    let ts = h + ':' + m;
    //create new date value
    let MM = addZero(d.getMonth() + 1);
    let dd = addZero(d.getDate());
    let y = d.getFullYear();
    let dt = y + '/' + MM + '/' + dd;

    // sets the table we want to manipulate through the pathing variables
    let table;
    let expressionAttributeValuesObject;
    switch (tableName) {
        case "employees":
            table = employeesTable;
            expressionAttributeValuesObject = {
                ':firstName': data.firstName,
                ':lastName': data.lastName,
                ':isManager': data.isManager,
                ':updatedTimestamp': ts,
                ':updatedDate': dt
            }
            break;
        case "development-plan":
            table = developmentPlanTable;
            expressionAttributeValuesObject = {
                ':employeeId': data.employeeId,
                ':employeeName': data.employeeName,
                ':goals': data.goals,
                ':updatedTimestamp': ts,
                ':updatedDate': dt
            }
            break;
        case "manager-assessment":
            table = managerAssessmentTable;
            expressionAttributeValuesObject = {
                ':employeeId': data.employeeId,
                ':employeeName': data.employeeName,
                ':feedback': data.feedback,
                ':updatedTimestamp': ts,
                ':updatedDate': dt
            }
            break;
        case "self-assessment":
            table = selfAssessmentTable;
            expressionAttributeValuesObject = {
                ':employeeId': data.employeeId,
                ':employeeName': data.employeeName,
                ':goals': data.goals,
                ':updatedTimestamp': ts,
                ':updatedDate': dt
            }
            break;
        default:
            throw new Error(`Unsupported resource: "${modelName}"`);
    }

    // set up the params for our lambda
    const params = {
        TableName: table,
        Key: {
            'id': id,
        },
        UpdateExpression: getLambdaUpdateExpression(data),
        ExpressionAttributeValues: expressionAttributeValuesObject
    }

    try {
        await dynamoDb.update(params).promise()
            .then(res => {
                callback(null, {
                    statusCode,
                    headers,
                    body: JSON.stringify({ message: 'Updated Item Successfully!' })
                });
            }).catch(err => {
                console.log(err);
                callback(null, {
                    statusCode: 500,
                    headers,
                    body: JSON.stringify({ message: 'Unable to Update Item' })
                });
            });
    } catch (err) {
        return { error: err }
    }
}

function getLambdaUpdateExpression(eventBody) {
    let updateExpression = "set ";
    for (var key of Object.keys(eventBody)) {
        updateExpression += key + " = :" + key + ", ";
    }
    updateExpression += " updatedTimestamp = :updatedTimestamp, updatedDate = :updatedDate"
    return updateExpression;
}

function addZero(i) {
    if (i<10) {
        i = '0' + i;
    }
    return i;
}