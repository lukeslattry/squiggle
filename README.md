![Squiggle Logo](public/images/logo-grey-small.png)

# Spuiggle

### Web Analytics Application built on Node.js

###*In Development*

## Installation and Set Up

1. Download and unzip Squiggle to your machine.
2. Run ```squiggle.sql``` to create the Database tables required by Squiggle.
3. Make the approirate additions to ```config.js``` to suit your set up.
4. Run ```npm install``` in the root of Squiggle to install all dependancies.
5. Start the Squiggle server by running ```node server.js``` or ```NODE_ENV=production node server.js```

Now you should be able to access the Squiggle Dashboard at the url and port number you have specified.
By default the server runs on port 3000. Try [here](http://localhost:3000).

<!---
## Usage

Squiggle is easy and fast to use.

1. Click on the ```+``` icon to add a new page and generate a new tracking code snippet.
2. Copy and paste this generated code into the source of the your page.

That's it. You are now collecting valuable information about visitors and traffic to your website which will be instantly visible on the Squiggle Dashboard.
-->

## Dev Set Up

To pre-populate the database tables with dumby traffic just uncomment the ```INSERT``` queries in ```squiggle.sql``` before you run it.

```gulp scss``` will compile and pipe the css.

<!---
```gulp js``` will clean up the javascript.

```gulp build``` will take care of it all.
-->

<!---
## Contribution 

If there is a feature you'd like to see or a niggle you'd like looked at, then log an issue and I'll do my best to help.

If you have adapted or improved Squiggle for your own needs and you feel your changes may benefit the project then dont hesitate to make a Pull Request.
-->