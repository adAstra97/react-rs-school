import { useNavigate } from 'react-router';
import { useState } from 'react';
import { z } from 'zod';
import { useAppDispatch } from '../../../redux/hooks';
import { InputField } from '../InputField/InputField';
import { PasswordStrength } from '../../PasswordStrength/PasswordStrength';
import { FormSchema } from '../../../utils/form-schema.zod';
import { readFileAsDataURL } from '../../../utils/read-file';
import { saveForm } from '../../../redux/slices/forms-slice';
import { CountryList } from '../../CountryList/CountryList';

export const UncontrolledForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

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
    <form
      className="border-2 border-double border-grey px-4 py-6 rounded-2xl flex flex-col gap-2 w-full max-w-[500px]"
      onSubmit={handleSubmit}
    >
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
      <div className="flex flex-col gap-2">
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
      <fieldset>
        <legend className="text-blue-300">Gender:</legend>
        <div className="flex justify-between mx-auto max-w-[250px]">
          <InputField
            id="male"
            type="radio"
            label="Male"
            value="male"
            name="gender"
            defaultChecked
          />
          <InputField
            id="female"
            type="radio"
            label="Female"
            value="female"
            name="gender"
          />
        </div>
      </fieldset>
      <div>
        <InputField
          type="text"
          id="country"
          list="country-list"
          label="Country:"
          name="country"
          errorMessage={errors.country}
        />
        <CountryList />
      </div>
      <InputField
        id="picture"
        type="file"
        label="Upload picture:"
        name="picture"
        errorMessage={errors.picture}
      />
      <InputField
        id="terms"
        type="checkbox"
        label="I accept Terms and Conditions agreement"
        name="terms"
        classes="flex-row gap-5"
        errorMessage={errors.terms}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue transition-all text-white outline-0 py-2 rounded-sm disabled:cursor-default disabled:opacity-35 mt-5 cursor-pointer hover:shadow-[inset_0_0_14px_0_rgb(0,0,0,0.5)] disabled:hover:shadow-none"
      >
        {isSubmitting ? 'Loading...' : 'Submit'}
      </button>
    </form>
  );
};
