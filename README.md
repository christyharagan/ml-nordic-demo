MarkLogic Nordic Demo
==

Overview
--

This is the demo shown at the 2015 Nordic JS flash talk. It is a simple logic game that demonstrates MarkLogic's JavaScript/TypeScript APIs and semantic inferencing.

The game itself, presents the user with premises (boolean statements asserted as true), and is presented with some possible answers that they must choose from. The correct answer is the one that follows, necessarily, from the premises.

There is then a second page showing a bar chart of all guesses made, which demonstrate the real-time updates as players make their choices.

Installation and Preperation
--

You will need to have access to a MarkLogic instance, either locally, or on a AWS instance. You will need to know the host and port numbers. If you are creating the database you will need to know the admin username and password. If you already have one created, you'll need to know the application username and password.

To install and prepare, check the code out and then choose either the ts folder (for the TypeScript version) or the js folder (for the JavaScript folder). Configure the ```server/markscriptfile.ts``` (or ```/server/markscriptfile.js```) file for your local settings (specifically, the COMMON value would need changing, in particular the host name, port numbers, and user name).

Then, from the command line, cd in the ```client``` folder and run:

```
bower install
```

Then, cd into the ```server``` folder and run the following commands

```
npm install
```

Create the database:
```
npm run create
```

Deploy the assets:
```
npm run deploy
```

Load the sample data:
```
npm run loadData
```

Run the test server:
```
npm run run
```

Now, to play the game, go to: ```http://[middle.hostname]:[middle.port]/play.html```, and to view the results, go to: ```http://[middle.hostname]:[middle.port]/results.html```.

For example, using the default values, these urls become: ```http://localhost:8080/play.html``` and ```http://localhost:8080/results.html```


Development
--

In order to make changes to the server code, the following commands are necessary:

Undeploy the existing code:

```
npm run undeploy
```

Deploy the new code:

```
npm run deploy
```

Other commands
--

To remove the database:

```
npm run remove
```

To run the tests:

```
npm run test
```
