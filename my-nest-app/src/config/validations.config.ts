import {
    ValidationError,
    ValidationPipe,
    BadRequestException,
  } from '@nestjs/common'
  
  function formatErrors(errors: ValidationError[], prefix = ''): any {
    const formattedErrors = {}
  
    for (const error of errors) {
      if (error.children && error.children.length) {
        Object.assign(
          formattedErrors,
          formatErrors(error.children, `${prefix}${error.property}.`),
        )
      } else {
        formattedErrors[`${prefix}${error.property}`] = Object.values(
          error.constraints || {},
        ).join(', ')
      }
    }
  
    return formattedErrors
  }
  
  export function customExceptionFactory(errors: ValidationError[]) {
    const formattedErrors = formatErrors(errors)
  
    return new BadRequestException({
      statusCode: 400,
      message: 'Validation failed',
      errors: formattedErrors,
    })
  }
  