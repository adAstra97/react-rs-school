import { useNavigate } from 'react-router';
import { useState } from 'react';
import { z } from 'zod';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { InputField } from '../InputField/InputField';
import { PasswordStrength } from '../../PasswordStrength/PasswordStrength';
import { FormSchema } from '../../../utils/FormSchema.zod';
import { readFileAsDataURL } from '../../../utils/read-file';
import { saveForm } from '../../../redux/slices/forms-slice';

export const UncontrolledForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  const countries = useAppSelector((store) => store.countries);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const formEntries = Object.fromEntries(formData.entries());

    const rawData = {
      ...formEntries,
      age: String(formData.get('age')),
      terms: formData.has('terms'),
      picture: formData.getAll('picture') as File[],
    } as unknown as z.infer<typeof FormSchema>;

    setPasswordStrength(rawData.password);

    try {
      const validatedData = FormSchema.parse(rawData);

      await readFileAsDataURL(validatedData.picture).then((base64) => {
        dispatch(saveForm({ ...validatedData, picture: base64 }));
        navigate('/', { state: { formCreated: true } });
      });

      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          const path = err.path[0];
          if (path && !formErrors[path]) {
            formErrors[path] = err.message;
          }
        });
        setErrors(formErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        id="name"
        type="text"
        label="Name:"
        name="name"
        errorMessage={errors.name}
      />
      <InputField
        id="age"
        type="text"
        label="Age:"
        name="age"
        errorMessage={errors.age}
      />
      <InputField
        id="email"
        type="email"
        label="Email:"
        name="email"
        errorMessage={errors.email}
      />
      <div>
        <InputField
          id="password"
          type="password"
          label="Password:"
          name="password"
          errorMessage={errors.password}
        />
        <PasswordStrength password={passwordStrength} />
      </div>
      <InputField
        id="confirm-password"
        type="password"
        label="Repeat password:"
        name="confirmPassword"
        errorMessage={errors.confirmPassword}
      />
      <div>
        <fieldset>
          <legend>Gender:</legend>
          <InputField
            id="male"
            type="radio"
            label="Male:"
            value="male"
            name="gender"
            defaultChecked
          />
          <InputField
            id="female"
            type="radio"
            label="Female:"
            value="female"
            name="gender"
          />
        </fieldset>
      </div>
      <div>
        <InputField
          type="text"
          id="country"
          list="country-list"
          label="Country:"
          name="country"
          errorMessage={errors.country}
        />
        <datalist id="country-list">
          {countries.map((country) => (
            <option key={country.id} value={country.name} />
          ))}
        </datalist>
      </div>
      <InputField
        id="terms"
        type="checkbox"
        label="I accept Terms and Conditions agreement"
        name="terms"
        errorMessage={errors.terms}
      />
      <InputField
        id="picture"
        type="file"
        label="Upload picture:"
        name="picture"
        errorMessage={errors.picture}
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Loading...' : 'Submit'}
      </button>
    </form>
  );
};
