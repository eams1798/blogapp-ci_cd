# BlogApp

This repository contains the frontend code of a blog application developed with React and TypeScript as part of the Full Stack Open course. In this case, the choice to use TypeScript has been entirely my initiative to deepen my learning.
The application allows registered users to create and share blog posts, as well as comment on existing posts anonymously or identified.

## Features

- User registration and login.
- Creation and editing of blog posts by registered users.
- Comments on blog posts by any visitor, with the option to identify themselves.
- Responsive and friendly interface, facilitating navigation and interaction on the platform.

## Used technology
### Frontend
- [React](https://reactjs.org/): JavaScript library for building user interfaces.
- [TypeScript](https://www.typescriptlang.org/): JavaScript superset that adds static typing.
- [React Redux](https://react-redux.js.org/): Library to handle complex states in React applications.
- [React Router](https://reactrouter.com/): Library to manage routes in React applications.
- [Webpack](https://webpack.js.org/): Module packager for modern JavaScript applications.

### Backend
- [Node.js](https://nodejs.org/en/): JavaScript runtime environment.
- [Express](https://expressjs.com/): Framework for Node.js.
- [MongoDB](https://www.mongodb.com/): NoSQL database for storing data.
- [TypeScript](https://www.typescriptlang.org/): JavaScript superset that adds static typing.


## Project Structure

The project structure follows a standard pattern for React applications with TypeScript. The main entry point is the `index.tsx` file in the `src` directory. React components, stylesheets, and other resources are organized in subdirectories within `src`.

- `src/components`: Contains all the React components used in the application.
- `src/components/styles`: Contains all the styles for each React component used in the application
- `src/interfaces`: Defines the types and interfaces used throughout the application.
- `src/reducers`: Contains the state that the application will use, as well as the methods to manipulate it.
- `src/services`: Contains the services to interact with the backend and manage data.

## How to start

1. Clone the repository on your local machine.
2. Go to /backend directory
3. Install the backend dependencies with `npm install` or `yarn install`.
4. Return and go to /frontend
5. Install the frontend dependencies with `npm install` or `yarn install`.
6. Register or log in to MongoDB Atlas
7. Create a Database in MongoDB Atlas
8. Create a .env file in the /backend directory. It must contain the following information:

```
PORT=3001
MONGODB_URI=mongodb+srv://yourUsername:yourPassword@nameOfYourDataBase.mongodb.net/blogs
TEST_MONGODB_URI=mongodb+srv://yourUsername:yourPassword@nameOfYourDataBase.mongodb.net/blogs/test_blogs
SECRET=# place any word here
```

9. Build the frontend using yarn build:frontend from the /backend directory
10. Start the backend using yarn start
11. Open [http://localhost:3001](http://localhost:3001) in your browser to see the application in action.