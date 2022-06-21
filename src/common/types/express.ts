import { Request } from 'express';

import { AuthJwtVerificationResponse } from '@auth/guard/auth.jwt-verification-response';

export type ExpressRequestWithJWTUser<
  P = any,
  ResBody = any,
  ReqBody = any,
  ReqQuery = qs.ParsedQs,
  Locals extends Record<string, any> = Record<string, any>
> = Omit<Request<P, ResBody, ReqBody, ReqQuery, Locals>, 'user'> & {
  user: AuthJwtVerificationResponse;
};
