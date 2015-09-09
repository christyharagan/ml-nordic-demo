MarkLogic Nordic Demo
==

Overview
--

This is the demo shown at the 2015 Nordic JS flash talk. It is a simple logic game that demonstrates MarkLogic's JavaScript/TypeScript APIs and semantic inferencing.

Usage
--

You will need to have access to a MarkLogic instance, either locally, or on a AWS instance. You will need to know the host and port numbers. If you are creating the database you will need to know the admin username and password. If you already have one created, you'll need to know the application username and password.

To install and prepare, check the code out and then choose either the ts folder (for the TypeScript version) or the js folder (for the JavaScript folder). Configure the ```server/markscriptfile.ts``` (or ```/server/markscriptfile.js```) file for your local settings (specifically, the COMMON value would need changing, in particular the host name, port numbers, and user name).

Then, from the command line, cd into the ```server``` folder and run the following commands

Create the database:
```
node bin/build create
```

Deploy the assets:
```
node bin/build deploy
```

Load the sample data:
```
node bin/build task loadData
```

Run the test server:
```
node bin/build task run
```

Now, to play the game, go to: ```http://[middle.hostname]:[middle.port]/play.html```, and to view the results, go to: ```http://[middle.hostname]:[middle.port]/results.html```.

For example, using the default values, these urls become: ```http://localhost:8080/play.html``` and ```http://localhost:8080/results.html```
