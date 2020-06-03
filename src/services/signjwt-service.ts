import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { User } from './../entity/User';
import { Token } from './../models/Token';

export function signJwt(user: User): Token {
  // Sing JWT, valid for 1 hour
  const webtoken = jwt.sign(
    { userId: user.id, username: user.username, email: user.email },
    config.jwtSecret,
    { expiresIn: '1h' }
  );
  const tkn = new Token();
  tkn.token = webtoken;
  return tkn;
}
