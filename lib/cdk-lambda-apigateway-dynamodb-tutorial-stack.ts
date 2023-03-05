import * as apigateway from "@aws-cdk/aws-apigateway";
import * as lambda from "@aws-cdk/aws-lambda";
import { Runtime } from "@aws-cdk/aws-lambda";
import * as cdk from "@aws-cdk/core";
import * as path from "path";

export class CdkLambdaApigatewayDynamodbTutorialStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const apiGateway = new apigateway.RestApi(this, "APIGateway", {});
    apiGateway.root.addMethod('GET');
    const usersResource = apiGateway.root.addResource('users');

    const lambdaListUsers = new lambda.Function(this, "lambdaListUsers", {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset(path.join(__dirname, "lambda-handler"))
    });

    usersResource.addMethod('GET', new apigateway.LambdaIntegration(lambdaListUsers));
  }
}
