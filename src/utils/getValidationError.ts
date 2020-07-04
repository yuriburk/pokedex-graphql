import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(
  validationError: ValidationError,
): Errors {
  const validationErrors: Errors = {};

  validationError.inner.forEach((error) => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
