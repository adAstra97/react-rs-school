import { GENERIC_ERROR_MESSAGE } from '../shared/constants';

export const handleError = (error?: string) => {
  if (error) {
    return error || GENERIC_ERROR_MESSAGE;
  }
  return GENERIC_ERROR_MESSAGE;
};
