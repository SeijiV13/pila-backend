import { ApolloServer } from 'apollo-server';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { AuthResolver } from './resolvers/AuthResolver';
import { BusinessResolver } from './resolvers/BusinessResolver';
import { ProfileResolver } from './resolvers/ProfileResolver';
import { RestaurantMenuResolver } from './resolvers/RestaurantMenuResolver';
import { RestaurantResolver } from './resolvers/RestaurantResolver';
import { RestaurantTypeResolver } from './resolvers/RestaurantTypeResolver';
import { UserResolver } from './resolvers/UserResolver';

// Connects to the Database -> then starts the express

async function main() {
  const connection = await createConnection();
  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      ProfileResolver,
      AuthResolver,
      RestaurantResolver,
      BusinessResolver,
      RestaurantTypeResolver,
      RestaurantMenuResolver,
    ],
  });
  const server = new ApolloServer({ schema });
  server
    .listen(process.env.PORT || 3000, () => {
      console.log('Server has started!');
    })
    .catch(error => console.log(error));
}
main();
