# Le Word

A copycat version of Wordle using React Hooks.

## Installation

Install the project by running the following:

`npm install`

If you don't have mongo, you will have to install that as well:

<https://www.mongodb.com/docs/manual/installation/>

## Initial Steps for development use

First ensure that the mongo database instance is running with the following command:

`sudo service mongod start`

Then if it hasn't been done yet, in order to set up a username to log into the database, run the db_init.js script with the following commands:

```text
mongosh
load( "scripts/db_init.js" )
```

## How to run all in development

In the project directory, you can run the following to run the front and backend
in development:

`npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The backend is served at [http://localhost:8080](http://localhost:8080)

A .env file should contain the following:

```sh
PORT=3000
SRV_HOST=localhost
SRV_PORT=8080
REACT_APP_SERVER=http://$SRV_HOST:$SRV_PORT
DB_NAME=leword
NODE_ENV=devlocal
```

To log in, on the Leword app, click the top-right Sign In button, then enter the login credentials:\
Username: test\
Password: unsalted

And you should see a returned JSON for the post request!

## Clean-up

Make sure to end the mongodb service when finished with using the application with the following command:

`sudo service mongod stop`
