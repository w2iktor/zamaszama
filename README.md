# zamaszama
Lunch ordering app


How to run fronted:

1. Install nodeJs (and npm - Node Package Manager) on your local machine
2. go to frontend folder
3. type in in console "npm install". It will fetch all neccessary dependencies.
4. type in in console "npm start". The project should run on port 8000.

Backend:

Prerequirement:
- installed and run on default (27017) port MongoDB
- installed and run on default port Redis 

Run:
1. Go to zamaszama/backend folder
2. If it's first time you running app type "npm install" in console
3. Type "npm start" in console

Run in DEBUG mode:
1. Go to zamaszama/backend folder
2. Type "npm install" if it's first run 
3. Type NODE_ENV=development DEBUG=swagger-tools:middleware:* supervisor . bin/www