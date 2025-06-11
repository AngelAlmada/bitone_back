import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LogginMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('middleware',req.originalUrl);

    next();
  }
}
