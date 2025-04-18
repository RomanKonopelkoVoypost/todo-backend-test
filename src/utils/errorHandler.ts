import { Response } from 'express'

export class ApiError extends Error {
  constructor(public statusCode: number, public message: string, public details?: any) {
    super(message)
    this.name = 'ApiError'
  }
}

export class ErrorHandler {
  static handleError(error: unknown, res: Response): void {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({
        error: error.message,
        details: error.details,
      })
      return
    }

    if (error instanceof Error) {
      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message,
      })
      return
    }

    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred',
    })
  }

  static notFound(message: string = 'Resource not found'): ApiError {
    return new ApiError(404, message)
  }

  static badRequest(message: string, details?: any): ApiError {
    return new ApiError(400, message, details)
  }

  static internal(message: string = 'Internal server error'): ApiError {
    return new ApiError(500, message)
  }
}
