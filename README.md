# Quiz Master
An app built with Ruby on Rails for server-side and React.js for client-side.

## Prerequisites
```
$ ruby -v && rails -v
ruby 2.7.1
Rails 6.0.3.7
```


```
$ npm -v && node -v       
6.14.4
v14.4.0

```


## Installation

### Server side
1. Install all dependancies
```
bundle install
```

2. Create and migrate database
```
rails db:create db:migrate
```

3. Seed some data to database
```
rails db:seed
```

4. Fire up server on localhost:3000
```
rails server
```

5. To run all tests
```
rspec
```
or run test for particular file
```
rspec path/to/file.rb
```

### Client side
1. Install all dependancies
```
npm install
yarn install
```

2. Fire up server on localhost:3001
```
npm start
yarn start
```

3. To run all tests
```
npm test
```


## User Story
- User is able to perform CRUD on question object
- User is able to choose which question to hide or show
- User is able to list all questions
- User is able to answer question with immediate response whether answer is correct or wrong
- User is able to submit answer with words or number
- User is able to create question with formatted question or insert image/emoji with WYSIWYG editor

## Endpoints
```
GET     /api/v1/questions
POST    /api/v1/questions
GET     /api/v1/questions/:id
PATCH   /api/v1/questions/:id
PUT     /api/v1/questions/:id
DELETE  /api/v1/questions/:id
POST    /api/v1/questions/:id/check-answer
```