## Starting the Server

1. Set the `.env` file using `cp -f .env-sample .env`
2. Run `npm install`
3. Start the dev server using `npm start`

## Available Commands

- `npm start` - Run the API in development mode
- `npm test` - Checks if your code is ok before creating a commit
- `npm run lint` - Lint using ESLint
- `npm run lint:fix` - Lint Automatic Fix
- `npm run test:unit` - Run the unit tests
- `npm run test:api` - Run tests that actually pings the API
- `npm run test:all` - Run all tests
- `npm run report:coverage` - Detailed code coverage of the last tests you ran

## Directory structure

### Overview

```
src
├── api/
├── configs.js
└── services/

tests
├── api/
└── unit/
```

### src/api/

Here is where all API endpoints are defined.

### src/services/

Here you can put `helpers`, `libraries` and other types of modules which you want to use in your APIs.
