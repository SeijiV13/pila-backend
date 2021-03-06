import { ApolloServer } from 'apollo-server';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { AuthResolver } from './resolvers/AuthResolver';
import { BusinessResolver } from './resolvers/BusinessResolver';
import { CuisineResolver } from './resolvers/CusineResolver';
import { ProfileResolver } from './resolvers/ProfileResolver';
import { QueueResolver } from './resolvers/QueueResolver';
import { RestaurantMenuGroupCategoryResolver } from './resolvers/RestaurantMenuGroupCategoryResolver';
import { RestaurantMenuGroupResolver } from './resolvers/RestaurantMenuGroupResolver';
import { RestaurantMenuResolver } from './resolvers/RestaurantMenuResolver';
import { RestaurantOperatingHourResolver } from './resolvers/RestaurantOperatingHourResolver';
import { RestaurantResolver } from './resolvers/RestaurantResolver';
import { RestaurantReviewResolver } from './resolvers/RestaurantReviewResolver';
import { RestaurantTypeResolver } from './resolvers/RestaurantTypeResolver';
import { UserResolver } from './resolvers/UserResolver';

// Connects to the Database -> then starts the express

async function main() {
  const connection = await createConnection();
  const schema = await buildSchema({
    resolvers: [
      QueueResolver,
      UserResolver,
      ProfileResolver,
      AuthResolver,
      RestaurantResolver,
      BusinessResolver,
      CuisineResolver,
      RestaurantTypeResolver,
      RestaurantMenuResolver,
      RestaurantMenuGroupCategoryResolver,
      RestaurantMenuGroupResolver,
      RestaurantOperatingHourResolver,
      RestaurantReviewResolver,
    ],
  });
  const server = new ApolloServer({
    context: ({ req, res }) => {
      // get the user token from the headers
      // try to retrieve a user with the token
      return { req, res };
    },
    schema,
  });
  server
    .listen(process.env.PORT || 3000, () => {
      console.log('Server has started!');
    })
    .catch(error => console.log(error));
}
main();
