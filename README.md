# Welcome to the Chitter Challenge!

This JavaScript program is a small Twitter clone that will display all 'tweets'. Once logged in, the user will be able to post a message to the public wall.

The back-end part of the application was built using Express. I have used Mocha and Chai/Chai-http for testing and C8 for coverage. <br>
I have chosen MongoDB Atlas for my database and Mongoose to connect my Express app to the database. <br>
The front-end part of the application was built using Vite and React. Vitest is used for testing, and V8 for the Coverage.

### User stories

```
As a trainee software engineer
So that I can let people know what I am doing
I want to post a message (peep) to chitter

As a trainee
So that I can see what others are saying
I want to see all peeps in reverse chronological order

As a trainee
So that I can better appreciate the context of a peep
I want to see the time at which it was made

As a trainee
So that I can post messages on Chitter as me
I want to sign up for Chitter

As a trainee
So that only I can post messages on Chitter as me
I want to log in to Chitter

As a trainee
So that I can avoid others posting messages on Chitter as me
I want to log out of Chitter
```

## Additional requirements:

- You don't have to be logged in to see the peeps.
- Trainee software engineers sign up to chitter with their email, password, name and a username.
- The username and email are unique.
- Peeps (posts to chitter) have the name of the trainee and their user handle.

## How to use

You can fork this repository and clone it to your local machine.

<<<<<<< HEAD
You will need to enter: <br>
`npm install` (or `npm i` for Mac users) to install all dependencies <br>
`npm start` to start tje server <br>
`npm test` to run the tests
=======
You will need to type:<br>
`npm install` (or `npm i` for Mac users) to install all dependencies.

=> For the back-end program:<br>
`npm start` to start the server.<br>
`npm test` to run the tests - the command includes a coverage report.

=> For the front-end program:<br>
`npm run dev` so that Vite gives you a localhost access to the application. <br>
`npm test`to run the tests. <br>
`npm run coverage` to get a coverage report.

Feel free to contribute and publish a few 'tweets'! 
>>>>>>> bb7268362289f3c58a2fb0ebf30ca515092ac671
