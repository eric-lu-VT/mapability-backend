# Backend

## Inspiration

We saw how _inaccessible_ much of the Dartmouth campus can be after speaking to some of our friends with disabilities. Our idea for MapAbility was born to help members of the disabled community find nearby accessible resources and to facilitate actions for them that many of us take for granted.

## What it does

MapAbility allows users to locate and query nearby accessible resources. They can query by either searching for a location, or moving the map around to locate resources elsewhere. These queries can also be filtered based on the type of resource, proximity, and aggregated users' accessibility score. Users can also comment and rate individual resources, and even add resources that aren't already in our database.

## How we built it

We used Express and MongoDB to build the backend. For MongoDB, we used two main models, one for bathrooms (the primary resource we were trying to build out functionality for during these 24 hours), and one for reviews. We also had endpoints for the Google Maps API, to allow users to make queries based on keywords or geospatial data.

## Accomplishments that we're proud of

We are really proud of our teamwork. Even though we had little experience working with each other in the past, we were able to quickly find each others' strengths and apply our skills to the project. The whole of our team was greater than the sum of its parts because we were excited to work together and motivated to make MapAbility to benefit people.

## What we learned

Through this project, we learned a lot about making products with an explicit focus on accessibility. We learned to try to see our landscape in the lens of accessibility and to understand how different people may be affected by different, seemingly small details around us. That philosophy pervaded both our motivation and our implementation for MapAbility.

## What's next for MapAbility

Currently, MapAbility only allows the user to mark, review, and locate handicap-accessible bathrooms. However, the infrastructure could be easily extended to accommodate different landmarks, such as reserved parking spaces, ramps, and elevators. This could be a simple step to making the app much more beneficial to those with disabilities.

## Architecture

### Tech Stack

- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose ODM](https://mongoosejs.com/)
- [ts-mongoose](https://www.npmjs.com/package/ts-mongoose)
- [Passport.js](https://www.passportjs.org/)
- [axios](https://github.com/axios/axios)
- [TypeScript](https://www.typescriptlang.org/docs/)

### Directory Structure

    .
    ├── ...
    ├── src
    |   └── auth                # JWT middleware
    |   └── controllers         # dispatch input; output
    |   └── db                  # MongoDB database definitions
    |     └── migrations        # initialize tables and upload default data
    |     └── models            # defines structure of MongoDB collections
    |   └── errors              # internal error handling
    |   └── routers             # route url endpoint
    |     └── __tests__         # test cases for routers
    |   └── services            # handles database queries and related functionality
    |     └── __tests__         # test cases for services
    |   └── util                # util functions, usually used by services
    |   └── validation          # validates input w/ joi
    |   └── server.ts           # starting point of server

For more detailed documentation on our file structure and specific functions in the code, feel free to check the project files themselves.

## Setup

1. Clone repo and `yarn install`
2. Create [MongoDB Atlas database](https://www.mongodb.com/atlas/database)
3. Set up [Google Maps API](https://developers.google.com/maps)
4. Create a `.env` file in the root directory

- Should be in the following format:
- ```
  AUTH_SECRET='*secret assortment of characters used for encryption*'
  PORT=*insert desired backend server port here*
  MONGODB_URI=mongodb+srv://...
  MONGODB_DB_NAME=
  GOOGLE_MAPS_API_KEY=
  ```

5. Run `yarn migrate-mongo up` to apply migrations and seeding to DB.
6. App should be ready for use now

- `yarn start` to run in production mode
- `yarn run dev` to run with hot reloading

#### Linting

ESLint is set up in this project. To keep code clean, always remember to run `yarn run lint` and fix any lint problems before merging into master.

#### Unit Testing

Jest unit testing is set up for the controllers, routers, and services. Remember to run `yarn test` and fix any breaking changes that might've occured.

- You can also run just an individual test file with `yarn test -- *filename*`

## Authors

- Eric Lu '25
- Aneesh Patnaik '25
- Sonia Bendre '25
- Rishav Chakravarty '25
