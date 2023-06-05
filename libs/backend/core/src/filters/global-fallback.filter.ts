import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'

@Catch()
export class GlobalFallbackFilter implements ExceptionFilter{
  catch(exception: any, host: ArgumentsHost) {
    console.log('Fallback exception filter', JSON.stringify(exception))


    const ctx = host.switchToHttp(),
          response = ctx.getResponse()

    return response.status(500).json({
      statusCode: 500,
      createdBy: 'FallbackExceptionFilter',
      ex: exception,
      errorMessage: exception.message? exception.message : 'Unexpected error occured'
    })

  }

}
