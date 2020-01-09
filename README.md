# Express Boilerplate!

This is a boilerplate project used for starting new Express / Postgres Projects.

**Note: This project assumes that postgres is installed and running**

## Set up

Complete the following steps to start a new project (`my-new-project`):

1. Clone this repository to your local machine `git clone https://github.com/codybarr-thinkful/express-boilerplate my-new-project`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `yarn`
5. Move the example Environment file to `.env` that will be ignored by git and read by the express server `mv example.env .env`
6. Edit the contents of the `package.json` to use my-new-project instead of `"name": "express-boilerplate",`

**Special Setup for Postgres User / Database**

7. Run `createuser -Pw --interactive` and create a `blogger` user (update environment variables to use a different user if you'd like).
8. Run `createdb -U blogger blog` and `createdb -U dunder_mifflin blog-test` to create the main and test databases.
9. Run `yarn migrate && yarn migrate:test` to initialize/create the main and test databases and their tables (Note: migration files in the `/migrations` directory should be updated to suit your custom schema).
10. Optionally run `yarn db:seed` if you'd like to add some basic blog posts to your main database.

## Scripts

Start the application `yarn start`

Start nodemon for the application `yarn dev`

Run the tests `yarn test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `yarn deploy` which will push to this remote's master branch.
