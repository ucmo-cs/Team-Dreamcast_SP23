'use strict';


const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient({endpoint: 'http://localhost:8000'});
const uuid = require('uuid');

let isPostmanMode = false;
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
    let h = addZero(d.getHours());
    let m = addZero(d.getMinutes());
    let ts = h + ':' + m;
    //create new date value
    let MM = addZero(d.getMonth()+1);
    let dd = addZero(d.getDate());
    let y = d.getFullYear();
    let dt = y + '/' + MM + '/' + dd;

    const params = {
        TableName: process.env.SELF_ASSESSMENT_TABLE,
        Item: {
            id: isPostmanMode ? generateTestID(postmanID).toString() : uuid.v1(),
            employeeId: data.employeeId, // this may need to be changed
            employeeName: data.employeeName,
            accomplishments: data.accomplishments,
            takeaways: data.takeaways,
            obstaclesOvercame: data.obstaclesOvercame,
            improvementAreas: data.improvementAreas,
            supportImprovement: data.supportImprovement,
            hurdles: data.hurdles,
            milestones: data.milestones,
            holdAccountable: data.holdAccountable,
            posotivePerformanceExample: data.posotivePerformanceExample,
            improveExample: data.improveExample,
            mainGoal: data.mainGoal,
            learningGoal: data.learningGoal,
            leadershipTeam: data.leadershipTeam,
            feedback: data.feedback,
            assessmentYear: data.assessmentYear,
            createdDate: dt,
            createdTimestamp: ts,
            updatedDate: data.updatedDate || dt,
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