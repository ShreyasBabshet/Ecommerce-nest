import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

export interface HttpExceptionResponse{
    statusCode: number;
    message: string,
    error:string
}
@Catch()
export class AllExceptionFilter implements ExceptionFilter{
    constructor(private readonly httpAdapterHost: HttpAdapterHost){};
    catch(exception: any, host: ArgumentsHost): void{
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();

        const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        console.log('Exception :: -->', exception)
        
        const response = exception instanceof HttpException ? exception.getResponse() : String(exception);


        const responseBody = {
            success: false,
            statusCode: httpStatus,
            timeStamp: new Date().toISOString(),
            path: httpAdapter?.getRequestUrl(ctx.getRequest()),
            message: (response as HttpExceptionResponse).error || (response as HttpExceptionResponse).message || response || 'Something went wronge'
        }
        httpAdapter?.reply(ctx.getResponse(),responseBody,httpStatus)
    };

}