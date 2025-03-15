import { PASSWORD_REGEX } from '../shared/constants';

export const evaluatePassStrength = (password: string) => {
  let score = 0;

  if (!password) return '';

  if (password.length >= 8) score += 1;
  if (PASSWORD_REGEX.lowercase.test(password)) score += 1;
  if (PASSWORD_REGEX.uppercase.test(password)) score += 1;
  if (PASSWORD_REGEX.number.test(password)) score += 1;
  if (PASSWORD_REGEX.special.test(password)) score += 1;

  switch (score) {
    case 0:
    case 1:
    case 2:
      return 'Weak';
    case 3:
    case 4:
      return 'Medium';
    case 5:
      return 'Strong';
  }
};
