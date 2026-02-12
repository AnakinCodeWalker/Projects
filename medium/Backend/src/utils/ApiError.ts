class ApiError<T = unknown> extends Error {
  public statusCode: number
  public success: boolean
  public errors: any[]
  public data: T | null

  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    errors: any[] = [],
    data: T | null = null,
    stack?: string
  ) {
    super(message)

    this.statusCode = statusCode
    this.success = false
    this.errors = errors
    this.data = data

    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export default ApiError
