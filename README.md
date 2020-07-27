# AWS CDK Stack with Step functions, lambdas and Dynamo DB 

This project demonstrates how to setup a AWS stack with `aws-cdk`.
Inspect the code at `infra` to see how the various components are defined.
Notice we are also able to pass environement variable to the lambda function so that it can initial the step function tasks.

```
├── infra
│   ├── bin/index.ts <- This is where your stacks are initialized
│   ├── services   <- Service definitions
│   ├── stacks     <- Stack definitions
│   └── utils
├── src        <- Application code
├── cdk.json   <- Entry point for aws-cdk cli
└── README.md
```

## Requirements

You need to install aws-cdk globally: 
```
npm i -g aws-cdk
```

## Testing out

1. First install dependences, from the root do:
`npm i` or `yarn`
1. `cd infra` and `npm i`
1. back on the root do : `npm run deploy` or `yarn deploy`


Ideally the entire build and deploy process would be run on a CI pipeline and would include the steps above. 
