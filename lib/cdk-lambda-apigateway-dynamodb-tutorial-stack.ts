import * as apigateway from "@aws-cdk/aws-apigateway";
import * as lambda from "@aws-cdk/aws-lambda";
import * as cdk from "@aws-cdk/core";
import * as path from "path";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as cloudwatch from "@aws-cdk/aws-logs";

export class CdkLambdaApigatewayDynamodbTutorialStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const logsOfApiGateway = new cloudwatch.LogGroup(this, "ApiGatewayLogs");

    const apiGateway = new apigateway.RestApi(this, "APIGateway", {
      deployOptions: {
        //@ts-ignore
        accessLogDestination: new apigateway.LogGroupLogDestination(logsOfApiGateway), 
        accessLogFormat: apigateway.AccessLogFormat.jsonWithStandardFields()
      }
    });

    const usersTable = new dynamodb.Table(this, "Users", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
    });

    const lambdaListUsers = new lambda.Function(this, "lambdaListUsers", {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset(path.join(__dirname, "lambda-handler")),
      environment: {
        TABLE_NAME: usersTable.tableName
      }
    });

    usersTable.grantReadData(lambdaListUsers);

    apiGateway.root
      .addResource("users")
      .addMethod("GET", new apigateway.LambdaIntegration(lambdaListUsers));
  }
}
