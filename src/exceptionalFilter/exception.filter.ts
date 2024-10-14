import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { GqlArgumentsHost } from "@nestjs/graphql";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    // console.error("Error caught:", exception); // Always log the caught exception

    const gqlHost = GqlArgumentsHost.create(host);
    const context = gqlHost.getContext();
    const response = context.res || context.req?.res;

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "Internal server error";

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    } else if (typeof exception === "object" && exception !== null) {
      const exceptionObject = exception as any;
      if (exceptionObject.status) {
        status = exceptionObject.status;
      }
    }

    // Log the response object (if available)
    if (exception.response) {
      if (
        exception.response.message &&
        Array.isArray(exception.response.message)
      ) {
        message = exception.response.message[0]; // Take the first error message
      }
    }

    // Check if headers have already been sent
    if (response && !response.headersSent) {
      console.log("Sending error response", message);
      // Send the JSON response
      return response.status(status).json({
        statusCode: status,
        message: message,
        error: "Internal problem",
      });
    }
  }
}
