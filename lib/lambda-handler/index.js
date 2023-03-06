const AWS = require("aws-sdk");

exports.handler = async (event) => {
  const dynamodb = new AWS.DynamoDB(); // using this we can call operations using dynamodb service
  const usersScanResponse = await dynamodb
    .scan({
      TableName:
        process.env.TABLE_NAME, // table we created through cdk
    })
    .promise();

  const users = usersScanResponse.Items;

  return {
    statusCode: 200,
    body: JSON.stringify({
        users: users.map((user) => AWS.DynamoDB.Converter.unmarshall(user)), // return as simple json rather than dynamodb
    }),
  };
};
