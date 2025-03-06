import { GENERIC_ERROR_MESSAGE } from '../shared/constants';

export const handleError = (error?: string) => {
  return error || GENERIC_ERROR_MESSAGE;
};
