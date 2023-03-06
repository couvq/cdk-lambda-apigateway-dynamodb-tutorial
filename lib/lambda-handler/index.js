const AWS = require("aws-sdk");

exports.handler = async (event) => {
  const dynamodb = new AWS.DynamoDB(); // using this we can call operations using dynamodb service
  const usersScanResponse = await dynamodb
    .scan({
      TableName:
        "CdkLambdaApigatewayDynamodbTutorialStack-Users0A0EEA89-8EHV9W24G5RX", // table we created through cdk
    })
    .promise();

  const users = usersScanResponse.Items;

  return {
    statusCode: 200,
    body: JSON.stringify(users),
  };
};
