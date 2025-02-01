import { AxiosError } from 'axios';
import { GENERIC_ERROR_MESSAGE } from '../shared/constants';

export const handleError = (error: unknown) => {
  if (error instanceof AxiosError) {
    return error.response?.data?.error || GENERIC_ERROR_MESSAGE;
  }
  return GENERIC_ERROR_MESSAGE;
};
