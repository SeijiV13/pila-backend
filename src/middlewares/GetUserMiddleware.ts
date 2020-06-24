import * as jwt from 'jsonwebtoken';
import { MiddlewareInterface, NextFn, ResolverData } from 'type-graphql';
import { setUserId } from '../services/getonlonlineuser-service';

export class GetUserMiddleware implements MiddlewareInterface<any> {
  public async use({ context }: ResolverData<any>, next: NextFn) {
    // Get the jwt token from the head

    // Get the user ID from previous midleware
    let token = context.req.headers.authorization as string;
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length).trimLeft();
    }
    const decoded: any = jwt.decode(token);
    setUserId(decoded.userId);
    await next();
  }
}
