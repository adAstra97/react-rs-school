import { z } from 'zod';
import { COUNTRIES } from '../shared/data';
import {
  FILE_TYPES,
  MAX_AGE,
  MAX_FILE_SIZE,
  PASSWORD_REGEX,
} from '../shared/constants';

export const FormSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .regex(/^[A-Z]/, 'First letter must be uppercase'),

    age: z
      .string()
      .min(1, 'Age is required')
      .transform(Number)
      .refine(
        (val) => val >= 0 && /^\d+$/.test(String(val)),
        'Age must be a positive integer'
      )
      .refine((val) => val <= MAX_AGE, `Age must be less than ${MAX_AGE}`),

    email: z.string().min(1, 'Email is required').email('Invalid email format'),

    password: z
      .string()
      .regex(PASSWORD_REGEX.number, 'Password must contain a number')
      .regex(
        PASSWORD_REGEX.uppercase,
        'Password must contain an uppercase letter'
      )
      .regex(
        PASSWORD_REGEX.lowercase,
        'Password must contain a lowercase letter'
      )
      .regex(
        PASSWORD_REGEX.special,
        'Password must contain a character from "[!@#$%^&*]"'
      )
      .min(8, 'Password must be at least 8 characters'),

    confirmPassword: z
      .string()
      .min(1, { message: 'Please confirm your password' }),

    gender: z.enum(['male', 'female']),

    country: z
      .string()
      .refine((value) => COUNTRIES.some((country) => country.name === value), {
        message: 'Select country from the list',
      }),

    terms: z.boolean().refine((value) => value, {
      message: 'You must accept the Terms and Conditions',
    }),

    picture: z
      .custom<FileList>()
      .transform((files) => files?.[0])
      .refine((file) => !!file, 'Photo is required')
      .refine(
        (file) => file?.size <= MAX_FILE_SIZE,
        'File size must be less than 2MB'
      )
      .refine(
        (file) => FILE_TYPES.includes(file?.type),
        'Invalid file type. Allowed: .png, .jpeg'
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'The passwords must match.',
    path: ['confirmPassword'],
  });

export type TFormSchema = z.infer<typeof FormSchema>;
