# AWS CDK Stack with Step functions, lambdas and Dynamo DB 

This project demonstrates how to setup a AWS stack with `aws-cdk`.
Inspect the code at `infra` to see how the various components are defined.
Notice we are also able to pass environement variable to the lambda function so that it can initial the step function tasks.

```
├── infra
│   ├── bin/index.ts   <- Entry point to your stack definitions
│   ├── services       <- Service definitions
│   ├── stacks         <- Stack definitions
│   └── utils
├── src                <- Application code
├── cdk.json           <- Entry point for aws-cdk cli
├── package.json 
└── README.md
```

## Requirements

You need to install aws-cdk globally: 
```
npm i -g aws-cdk
```

## Build and Deploy
It would be easy to integrate this build and deploy process on any CI pipeline.

1. Install the application code: `npm i` or `yarn`
1. Install the infra code `cd infra` and `npm i`
1. Finally run build & deploy: `npm run deploy` or `yarn deploy`

Once deployed you should now have:
* A DynamoDB table called `jobs`
* 3 Lambda functions (2 With Rest API Integration)
* A Rest API Gateway with 2 methods (**GET** | **POST**) on `/jobs` resource
* A state machine with conditional steps

### State machine

<svg xmlns="http://www.w3.org/2000/svg" id="sfn-svg" class="sfn-workflow-graph" width="299" height="446">  
<g transform="translate(12,20.6875)">
<g class="nodes">
<g class="node-container" transform="translate(121.3203125,18.5)">
<g class="node anchor">
<circle class="shape" x="-17.1875" y="-8.5" r="27.1875"/>
<text class="label">
<tspan xml:space="preserve" text-anchor="middle" alignment-baseline="central">Start</tspan>
</text>
</g>
</g>
<g class="node-container" transform="translate(121.3203125,390.5)">
<g class="node anchor">
<circle class="shape" x="-12.5546875" y="-8.5" r="22.5546875"/>
<text class="label">
<tspan xml:space="preserve" text-anchor="middle" alignment-baseline="central">End</tspan>
</text>
</g>
</g>
<g class="node-container" transform="translate(121.3203125,80.5)">
<g class="node state Task NotYetStarted">
<rect class="shape" rx="5" ry="5" x="-39.8203125" y="-18.5" width="79.640625" height="37"/>
<text class="label">
<tspan xml:space="preserve" text-anchor="middle" alignment-baseline="central">Start Job</tspan>
</text>
</g>
</g>
<g class="node-container" transform="translate(121.3203125,142.5)">
<g class="node state Wait NotYetStarted">
<rect class="shape" rx="5" ry="5" x="-59.5078125" y="-18.5" width="119.015625" height="37"/>
<text class="label">
<tspan xml:space="preserve" text-anchor="middle" alignment-baseline="central">Wait X Seconds</tspan>
</text>
</g>
</g>
<g class="node-container" transform="translate(75.20703125,204.5)">
<g class="node state Task NotYetStarted">
<rect class="shape" rx="5" ry="5" x="-57.2265625" y="-18.5" width="114.453125" height="37"/>
<text class="label">
<tspan xml:space="preserve" text-anchor="middle" alignment-baseline="central">Get Job Status</tspan>
</text>
</g>
</g>
<g class="node-container" transform="translate(121.3203125,266.5)">
<g class="node state Choice NotYetStarted">
<rect class="shape" rx="5" ry="5" x="-57.890625" y="-18.5" width="115.78125" height="37"/>
<text class="label">
<tspan xml:space="preserve" text-anchor="middle" alignment-baseline="central">Job Complete?</tspan>
</text>
</g>
</g>
<g class="node-container" transform="translate(42.7734375,328.5)">
<g class="node state Fail NotYetStarted">
<rect class="shape" rx="5" ry="5" x="-42.7734375" y="-18.5" width="85.546875" height="37"/>
<text class="label">
<tspan xml:space="preserve" text-anchor="middle" alignment-baseline="central">Job Failed</tspan>
</text>
</g>
</g>
<g class="node-container" transform="translate(199.8671875,328.5)">
<g class="node state Task NotYetStarted">
<rect class="shape" rx="5" ry="5" x="-74.3203125" y="-18.5" width="148.640625" height="37"/>
<text class="label">
<tspan xml:space="preserve" text-anchor="middle" alignment-baseline="central">Get Final Job Status</tspan>
</text>
</g>
</g>
</g>
<g class="edges">
<g class="edge">
<path class="path" marker-end="url(#arrowhead1)" d="M121.3203125,99L121.32031249999999,101.08333333333333C121.3203125,103.16666666666666,121.3203125,107.33333333333333,121.32031249999999,111.5C121.3203125,115.66666666666666,121.3203125,119.83333333333331,121.32031249999999,121.91666666666666L121.3203125,124" style="fill: none;"/>
<defs>
<marker id="arrowhead1" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="strokeWidth" markerWidth="8" markerHeight="6" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 z"/>
</marker>
</defs>
</g>
<g class="edge">
<path class="path" marker-end="url(#arrowhead2)" d="M121.3203125,45.6875L121.32031249999999,46.322916666666664C121.3203125,46.95833333333333,121.3203125,48.229166666666664,121.32031249999999,50.94791666666667C121.3203125,53.666666666666664,121.3203125,57.83333333333333,121.32031249999999,59.91666666666666L121.3203125,62" style="fill: none;"/>
<defs>
<marker id="arrowhead2" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="strokeWidth" markerWidth="8" markerHeight="6" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 z"/>
</marker>
</defs>
</g>
<g class="edge">
<path class="path" marker-end="url(#arrowhead3)" d="M93.8010962701613,161L90.70208543346774,163.08333333333331C87.60307459677419,165.16666666666666,81.40505292338709,169.33333333333331,78.30604208669354,173.5C75.20703125,177.66666666666666,75.20703125,181.83333333333331,75.20703124999999,183.91666666666666L75.20703125,186" style="fill: none;"/>
<defs>
<marker id="arrowhead3" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="strokeWidth" markerWidth="8" markerHeight="6" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 z"/>
</marker>
</defs>
</g>
<g class="edge">
<path class="path" marker-end="url(#arrowhead4)" d="M75.20703125,223L75.20703124999999,225.08333333333331C75.20703125,227.16666666666666,75.20703125,231.33333333333331,78.30604208669354,235.5C81.40505292338709,239.66666666666666,87.60307459677419,243.83333333333331,90.70208543346774,245.91666666666663L93.8010962701613,248" style="fill: none;"/>
<defs>
<marker id="arrowhead4" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="strokeWidth" markerWidth="8" markerHeight="6" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 z"/>
</marker>
</defs>
</g>
<g class="edge">
<path class="path" marker-end="url(#arrowhead5)" d="M74.44556451612902,285L69.16687668010752,287.0833333333333C63.88818884408602,289.16666666666663,53.33081317204301,293.3333333333333,48.052125336021504,297.5C42.7734375,301.66666666666663,42.7734375,305.8333333333333,42.7734375,307.9166666666667L42.7734375,310" style="fill: none;"/>
<defs>
<marker id="arrowhead5" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="strokeWidth" markerWidth="8" markerHeight="6" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 z"/>
</marker>
</defs>
</g>
<g class="edge">
<path class="path" marker-end="url(#arrowhead6)" d="M168.19506048387098,285L173.47374831989245,287.0833333333333C178.75243615591398,289.16666666666663,189.309811827957,293.3333333333333,194.58849966397847,297.5C199.8671875,301.66666666666663,199.8671875,305.8333333333333,199.86718749999997,307.9166666666667L199.8671875,310" style="fill: none;"/>
<defs>
<marker id="arrowhead6" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="strokeWidth" markerWidth="8" markerHeight="6" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 z"/>
</marker>
</defs>
</g>
<g class="edge">
<path class="path" marker-end="url(#arrowhead7)" d="M148.83952872983872,248L151.93853956653226,245.91666666666663C155.0375504032258,243.83333333333331,161.2355720766129,239.66666666666666,164.33458291330646,232.41666666666663C167.43359375,225.16666666666666,167.43359375,214.83333333333331,167.43359375,204.49999999999997C167.43359375,194.16666666666663,167.43359375,183.83333333333331,164.33458291330643,176.58333333333334C161.2355720766129,169.33333333333331,155.0375504032258,165.16666666666666,151.93853956653226,163.08333333333334L148.83952872983872,161" style="fill: none;"/>
<defs>
<marker id="arrowhead7" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="strokeWidth" markerWidth="8" markerHeight="6" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 z"/>
</marker>
</defs>
</g>
<g class="edge">
<path class="path" marker-end="url(#arrowhead8)" d="M42.7734375,347L42.7734375,349.0833333333333C42.7734375,351.16666666666663,42.7734375,355.3333333333333,52.367942013955314,361.20331813984893C61.962446527910636,367.07330294636455,81.15145555582127,374.6466058927291,90.74596006977659,378.4332573659114L100.34046458373192,382.2199088390937" style="fill: none;"/>
<defs>
<marker id="arrowhead8" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="strokeWidth" markerWidth="8" markerHeight="6" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 z"/>
</marker>
</defs>
</g>
<g class="edge">
<path class="path" marker-end="url(#arrowhead9)" d="M199.8671875,347L199.86718749999997,349.0833333333333C199.8671875,351.16666666666663,199.8671875,355.3333333333333,190.27268298604466,361.20331813984893C180.67817847208934,367.07330294636455,161.4891694441787,374.6466058927291,151.8946649302234,378.4332573659114L142.30016041626808,382.2199088390937" style="fill: none;"/>
<defs>
<marker id="arrowhead9" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="strokeWidth" markerWidth="8" markerHeight="6" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 z"/>
</marker>
</defs>
</g>
</g>
</g>
<style xmlns="http://www.w3.org/1999/xhtml">.node &gt; .shape {stroke: #555555;stroke-width: 0.6px;fill: #FFFFFF;} path {stroke: #555;background-color: #555;stroke-width: 1px;} .node.state.NotYetStarted &gt; .shape,.node.state.Container &gt; .shape {stroke-dasharray: 5 2;} .node.state.Failed &gt; .shape,rect.legend.Failed {fill: #DE322F;} .node.state.CaughtError &gt; .shape,rect.legend.CaughtError {fill: #FFA500;} .node.state.Succeeded &gt; .shape,rect.legend.Succeeded {fill: #2BD62E;} .node.state.InProgress &gt; .shape,rect.legend.InProgress {fill: #53c9ed;} .node.state.Cancelled &gt; .shape,rect.legend.Cancelled {fill: #dddddd;} .node.anchor &gt; .shape {fill: #FFDA75;} .node.state.hovered:not(.selected):not(.NotYetStarted) &gt; .shape,.node.selected &gt; .shape {stroke: #555555;stroke-width: 2px;} .node.state.Container.Failed &gt; .shape {fill: #EE9592;} .node.state.Container.CaughtError &gt; .shape {fill: #FFD27F;} .node.state.Container.Succeeded &gt; .shape {fill: #91EA9A;} .node.state.Container.InProgress &gt; .shape {fill :#A9E4F7;} .node.state.Container.Cancelled &gt; .shape {fill: #EEEEEE;} marker {fill: #555555;} .node.anchor,.node.state.NotYetStarted {cursor: default;} .node.state {cursor: pointer;} tspan .label {font-weight: normal;font-size: 12px;text-shadow: none;} </style>
</svg>

## Testing out the deployed services


On AWS you can invoke the state machine manually or you can invoke a lambda function via API Gateway `POST /jobs` which in turn will invoke the state machine.
