import * as cdk from '@aws-cdk/core';
import * as stepFn from '@aws-cdk/aws-stepfunctions'
import * as stepFnTasks from '@aws-cdk/aws-stepfunctions-tasks'
import * as lambda from '@aws-cdk/aws-lambda';
import { IMainStack } from '../stacks/main-stack';

interface JobLambdaArgs {
    startJobLambda: lambda.Function
    checkJobLambda: lambda.Function
}

export const JobStartSteps = (ctx: IMainStack, lambdas: JobLambdaArgs) => {

    const startJob = new stepFn.Task(ctx, 'Start Job', {
        task: new stepFnTasks.InvokeFunction( lambdas.startJobLambda),
        resultPath: '$.guid',
    });

    const waitX = new stepFn.Wait(ctx, 'Wait X Seconds', {
        time: stepFn.WaitTime.secondsPath('$.waitTime')
    });
    
    const getStatus = new stepFn.Task(ctx, 'Get Job Status', {
        task: new stepFnTasks.InvokeFunction( lambdas.checkJobLambda),
        inputPath: '$.guid',
        resultPath: '$.status',
    });
    
    const isComplete = new stepFn.Choice(ctx, 'Job Complete?');
    const jobFailed = new stepFn.Fail(ctx, 'Job Failed', {
        cause: 'AWS Batch Job Failed',
        error: 'DescribeJob returned FAILED',
    });
    
    const finalStatus = new stepFn.Task(ctx, 'Get Final Job Status', {
        task: new stepFnTasks.InvokeFunction( lambdas.checkJobLambda),
        inputPath: '$.guid',
    });

    const chain = stepFn.Chain
        .start(startJob)
        .next(waitX)
        .next(getStatus)
        .next(isComplete
            .when(stepFn.Condition.stringEquals('$.status', 'FAILED'), jobFailed)
            .when(stepFn.Condition.stringEquals('$.status', 'SUCCEEDED'), finalStatus)
            .otherwise(waitX));

    const stateMachine = new stepFn.StateMachine(ctx, 'StateMachine', {
        definition: chain,
        timeout: cdk.Duration.seconds(30)
    });

    ctx.stateMachineArn = stateMachine.stateMachineArn

}

