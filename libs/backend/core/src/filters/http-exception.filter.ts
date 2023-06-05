import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter{

  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('HTTP exception filter handler triggered', JSON.stringify(exception))

    const ctx = host.switchToHttp()

    const response = ctx.getResponse(),
          request = ctx.getRequest(),
          statusCode = exception.getStatus()


    return response.status(statusCode).json({
      pendingRequest: statusCode,
      createdBy: 'HttpExceptionFilter',
      errorMessage: exception.message//.message // Is Trim error messages which comes in array forms

    })
  }
}
