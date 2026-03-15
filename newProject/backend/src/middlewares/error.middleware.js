const errorMiddleware = (err, req, res, next) => {

   console.log(err)

   res.status(err.statusCode || 500).json({
      success: false,
      statusCode: err.statusCode || 500,
      message: err.message || "Internal Server Error",
      errors: err.errors || []
   })

}

export default errorMiddleware