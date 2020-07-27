import * as cdk from '@aws-cdk/core';
import * as lambdas from '../services/lambdas';
import { RestApi, LambdaIntegration } from '@aws-cdk/aws-apigateway';
import { JobsDynamoTable } from '../services/databases';
import { addCorsOptions } from '../utils/cors';
import { JobStartSteps } from '../services/stepFunctions'

export interface IMainStack extends cdk.Stack{
    stateMachineArn: string
}

export class ApiLambdaStepFunctionsStack extends cdk.Stack {
    public readonly stateMachineArn: string
    constructor(app: cdk.App, id: string) {
        super(app, id);

        const api = new RestApi(this, 'jobsApi', {
            restApiName: 'Jobs API'
        });
        const jobsTable = JobsDynamoTable(this)

        const jobs = api.root.addResource('jobs');
        const submitJobLambda = lambdas.JobSubmit(this, this.stateMachineArn)
        const checkJobLambda = lambdas.JobStatus(this, jobsTable)
        const startJobLambda = lambdas.JobStart(this, jobsTable)

        jobs.addMethod('GET', new LambdaIntegration(checkJobLambda));
        jobs.addMethod('POST', new LambdaIntegration(submitJobLambda));
        addCorsOptions(jobs);

        JobStartSteps(this, {
            checkJobLambda,
            startJobLambda
        })

    }
}