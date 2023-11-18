# Le Word

A copycat version of Wordle using React Hooks.

## Installation

Install the project by running the following:

npm install

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
DB_USER=(username; I used MongoDB)
DB_PASS=(password for DB_USER)
DB_NAME=leword
NODE_ENV=development
```

To log in, on the Leword app, click the top-right Sign In button, then enter the login credentials:\
Username: test\
Password: unsalted

And you should see a returned JSON for the post request!

## Clean-up

Make sure to end the mongodb service when finished with using the application with the following command:

`sudo service mongod stop`

## How to run the React App on its own

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
