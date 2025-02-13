import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { GENERIC_ERROR_MESSAGE } from '../shared/constants';

type ApiError = FetchBaseQueryError & {
  data?: {
    error?: string;
  };
};

export const handleError = (error: unknown) => {
  if (typeof error === 'object' && error !== null) {
    const apiError = error as ApiError;
    return apiError?.data?.error || GENERIC_ERROR_MESSAGE;
  }
  return GENERIC_ERROR_MESSAGE;
};
