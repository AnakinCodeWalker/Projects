class ApiResponse<T = unknown> {
  public message: string
  public success: boolean
  public statusCode: number
  public data: T | null

  constructor(
    statusCode: number,
    message: string,
    data: T | null = null
  ) {
    this.statusCode = statusCode
    this.message = message
    this.success = true
    this.data = data
  }
}

export default ApiResponse

