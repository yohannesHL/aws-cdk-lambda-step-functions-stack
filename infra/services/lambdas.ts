import * as lambda from '@aws-cdk/aws-lambda';
import { TableNames } from './databases'
import { Stack } from '@aws-cdk/core'
import { Table } from '@aws-cdk/aws-dynamodb'

const SOURCE_DIR = './build'

const defaultItemLambdaOptions = {
    code: new lambda.AssetCode(SOURCE_DIR),
    handler: '',
    runtime: lambda.Runtime.NODEJS_10_X,
    environment: {
        TABLE_NAME: TableNames.JOBS,
        PRIMARY_KEY: 'jobId'
    }
}

export const JobSubmit = (ctx: Stack, stepMachineArn: string) => {

    const lambdaFn = new lambda.Function(ctx, 'jobSubmitFunction', {
        ...defaultItemLambdaOptions,
        environment: {
            STATE_MACHINE_ARN: stepMachineArn
        },
        handler: 'jobSubmit.handler'
    });

    return lambdaFn
}


export const JobStart = (ctx: Stack, t: Table) => {

    const lambdaFn = new lambda.Function(ctx, 'jobStartFunction', {
        ...defaultItemLambdaOptions,
        handler: 'jobStart.handler'
    });

    t.grantReadWriteData(lambdaFn);

    return lambdaFn
}

export const JobStatus = (ctx: Stack, t: Table) => {

    const lambdaFn = new lambda.Function(ctx, 'jobStatusFunction', {
        ...defaultItemLambdaOptions,
        handler: 'jobStatus.handler'
    });

    t.grantReadWriteData(lambdaFn);
    return lambdaFn
}


