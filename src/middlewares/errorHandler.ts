import { Request, Response, NextFunction } from 'express'
import { ErrorHandler } from '../utils/errorHandler'

export const errorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  ErrorHandler.handleError(err, res)
}
