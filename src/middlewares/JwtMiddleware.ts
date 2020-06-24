import { AuthenticationError } from 'apollo-server';

import * as jwt from 'jsonwebtoken';
import { MiddlewareInterface, NextFn, ResolverData } from 'type-graphql';
import config from '../config/config';

export class JwtMiddleware implements MiddlewareInterface<any> {
  public async use({ context }: ResolverData<any>, next: NextFn) {
    // Get the jwt token from the head

    let token = context.req.headers.authorization as string;
    let jwtPayload;
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length).trimLeft();
    }
    // Try to validate the token and get data
    try {
      jwtPayload = jwt.verify(token, config.jwtSecret) as any;
    } catch (error) {
      // If token is not valid, respond with 401 (unauthorized)
      throw new AuthenticationError('Unauthorized User');
    }

    await next();
  }
}
