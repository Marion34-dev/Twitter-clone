# Welcome to the Chitter Challenge!

This JS program represents a small twitter clone that will allow users to post messages to a public wall.

The front-end part of the application was built using React and Vite. The tests have been covered by Vitest, and you can also view the Coverage using V8.

The back-end part of the application was built using Express.

MongoDB atlas has been used for the database.

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
- Trainee software engineers sign up to chitter with their email, password, name and a username (e.g. ewright@digitalfutures.com, password123, Ed Wright, edwright6975).
- The username and email are unique.
- Peeps (posts to chitter) have the name of the trainee and their user handle.
- Your README should indicate the technologies used, and give instructions on how to install and run the tests.

## How to use

You can fork this repository and clone it to your local machine.

You will need to enter: <br>
`npm install` (or `npm i` for Mac users) to install all dependencies <br>
`npm start` to start tje server <br>
`npm test` to run the tests
