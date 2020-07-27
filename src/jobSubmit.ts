
import { StepFunctions } from 'aws-sdk'

const stepFunctions = new StepFunctions()

export const handler = async (event: any): Promise<any> => {
    const input = JSON.parse(event.body)
    const waitTime = input?.waitTime ?? 3


    if (process.env.STATE_MACHINE_ARN) {
        stepFunctions.startExecution({
            stateMachineArn: process.env.STATE_MACHINE_ARN,
            name: 'jobStart',
            input: JSON.stringify({ waitTime: 3 })
        })
    }

    return { statusCode: 201, body: 'Success!' };
};