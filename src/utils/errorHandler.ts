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

  static notFound(message: string, res: Response): void {
    res.status(404).json({
      error: message || 'Resource not found',
    })
  }

  static badRequest(message: string, res: Response, details?: any): void {
    res.status(400).json({
      error: message,
      details,
    })
  }

  static internal(message: string, res: Response): void {
    res.status(500).json({
      error: message || 'Internal server error',
    })
  }
}
