# Quiz Master

An app built with Ruby on Rails for server-side and React.js for client-side.

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