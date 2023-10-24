# Backend

This is the backend folder for the project. It contains the source code for the backend of the application.

## Getting Started

To get started, run `npm install` to install the dependencies. Then, run `npm start` to start the server.

## Files

- `src/app.ts`: This file is the entry point of the application. It creates an instance of the express app and sets up middleware and routes. It exports the `App` class which has a constructor that sets up the express app and middleware, and a method `start` that starts the server.
- `src/controllers/index.ts`: This file exports a class `IndexController` which has a method `getIndex` that handles the root route of the application. The `getIndex` method takes two arguments: `req` which is an instance of the `Request` interface, and `res` which is an instance of the `Response` interface. It sends a response with the message "Hello World!".
- `src/routes/index.ts`: This file exports a function `setRoutes` which sets up the routes for the application. It uses the `IndexController` to handle the root route. The `setRoutes` function takes one argument: `app` which is an instance of the `express` app. It sets up the root route to use the `getIndex` method of the `IndexController`.
- `src/types/index.ts`: This file exports interfaces `Request` and `Response` which extend the interfaces from the `express` library. The `Request` interface extends the `express.Request` interface and adds a `user` property of type `string`. The `Response` interface extends the `express.Response` interface and adds a `success` property of type `boolean`.
- `tsconfig.json`: This file is the configuration file for TypeScript. It specifies the compiler options and the files to include in the compilation.
- `package.json`: This file is the configuration file for npm. It lists the dependencies and scripts for the project.
- `README.md`: This file contains the documentation for the project.