# Angular + Node.js + Websocket

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-beta.32.3.

The front end was built with a template from [Core UI](https://coreui.io/). Graphing was built with [Kendo UI](https://www.telerik.com/kendo-angular-ui).

Backend was built with [Node.js](https://nodejs.org/en/).

Nosql Database was built with a portable mongodb called [NeDB](https://github.com/louischatriot/nedb) 

## Requirements
Latest at the time versions of these apps was installed. 
* Node.js v10.15

## How to setup
run `npm install` to get all the dependencies

## How to run
run `npm run start` to start both ui and backend server. The browser should open to, http://localhost:4200

## How to load data
run `node.exe load.js` to enter manually.

example of how to run `node.exe load.js < sample-data/t1.json` to load from a file.

example of how to run `node.exe sample-data/random-input.js | node.exe load.js` to pass script data to load.js .
