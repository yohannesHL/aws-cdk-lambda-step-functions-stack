import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as cdk from '@aws-cdk/core';

export const TableNames = {
    JOBS: 'jobs'
}


export const JobsDynamoTable = (ctx: cdk.Stack) => new dynamodb.Table(ctx, 'jobs', {
    partitionKey: {
        name: 'jobId',
        type: dynamodb.AttributeType.STRING
    },
    tableName: TableNames.JOBS,

    // The default removal policy is RETAIN, which means that cdk destroy will not attempt to delete
    // the new table, and it will remain in your account until manually deleted. By setting the policy to 
    // DESTROY, cdk destroy will delete the table (even if it has data in it)
    removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production code
});


