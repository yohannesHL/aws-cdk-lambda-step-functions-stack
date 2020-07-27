#!/usr/bin/env node

import * as cdk from '@aws-cdk/core';
import {ApiLambdaStepFunctionsStack} from '../stacks/main-stack';
import { spawnSync } from 'child_process';


const app = new cdk.App();
new ApiLambdaStepFunctionsStack(app, 'CDKLambdaStepFunctionsStack');
app.synth();