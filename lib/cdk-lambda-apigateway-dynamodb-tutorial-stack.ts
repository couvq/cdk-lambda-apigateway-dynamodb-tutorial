import * as cdk from "@aws-cdk/core";
import { Construct } from "constructs";
import * as apigateway from "@aws-cdk/aws-apigateway";

export class CdkLambdaApigatewayDynamodbTutorialStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const apiGateway = new apigateway.RestApi(this, "APIGateway", {});
    apiGateway.root.addMethod('GET');
  }
}
