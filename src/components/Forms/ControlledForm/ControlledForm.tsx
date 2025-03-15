import { SubmitHandler, useForm } from 'react-hook-form';
import { InputField } from '../InputField/InputField';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormSchema, TFormSchema } from '../../../utils/form-schema.zod';
import { useAppDispatch } from '../../../redux/hooks';
import { readFileAsDataURL } from '../../../utils/read-file';
import { saveForm } from '../../../redux/slices/forms-slice';
import { useNavigate } from 'react-router';
import { PasswordStrength } from '../../PasswordStrength/PasswordStrength';
import { CountryList } from '../../CountryList/CountryList';

export const ControlledForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<TFormSchema>({
    resolver: zodResolver(FormSchema),
    mode: 'all',
    defaultValues: {
      gender: 'male',
    },
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const password = watch('password');

  const onSubmit: SubmitHandler<TFormSchema> = (data) => {
    readFileAsDataURL(data.picture)
      .then((base64) => {
        dispatch(saveForm({ ...data, picture: base64 }));
        navigate('/', {
          state: { formCreated: true },
        });
      })
      .catch((error) => {
        console.error('Upload failed:', error);
      });
  };

  return (
    <form
      className="border-2 border-double border-grey px-4 py-6 rounded-2xl flex flex-col gap-2 w-full max-w-[500px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputField
        id="name"
        type="text"
        label="Name:"
        {...register('name')}
        errorMessage={errors.name?.message}
      />
      <InputField
        id="age"
        type="text"
        label="Age:"
        {...register('age')}
        errorMessage={errors.age?.message}
      />
      <InputField
        id="email"
        type="email"
        label="Email:"
        {...register('email')}
        errorMessage={errors.email?.message}
      />
      <div className="flex flex-col gap-2">
        <InputField
          id="password"
          type="password"
          label="Password:"
          {...register('password')}
          errorMessage={errors.password?.message}
        />
        <PasswordStrength password={password} />
      </div>
      <InputField
        id="confirm-password"
        type="password"
        label="Repeat password:"
        {...register('confirmPassword')}
        errorMessage={errors.confirmPassword?.message}
      />
      <fieldset>
        <legend className="text-blue-300">Gender:</legend>
        <div className="flex justify-between mx-auto max-w-[250px]">
          <InputField
            id="male"
            type="radio"
            label="Male"
            value="male"
            {...register('gender')}
          />
          <InputField
            id="female"
            type="radio"
            label="Female"
            value="female"
            {...register('gender')}
          />
        </div>
      </fieldset>
      <div>
        <InputField
          type="text"
          id="country"
          list="country-list"
          label="Country:"
          {...register('country')}
          errorMessage={errors.country?.message}
        />
        <CountryList />
      </div>
      <InputField
        id="picture"
        type="file"
        label="Upload picture:"
        {...register('picture')}
        errorMessage={errors.picture?.message}
      />
      <InputField
        id="terms"
        type="checkbox"
        label="I accept Terms and Conditions agreement"
        {...register('terms')}
        classes="flex-row gap-5"
        errorMessage={errors.terms?.message}
      />
      <button
        type="submit"
        disabled={isSubmitting || !isValid}
        className="bg-blue transition-all text-white outline-0 py-2 rounded-sm disabled:cursor-default disabled:opacity-35 mt-5 cursor-pointer hover:shadow-[inset_0_0_14px_0_rgb(0,0,0,0.5)] disabled:hover:shadow-none"
      >
        {isSubmitting ? 'Loading...' : 'Submit'}
      </button>
    </form>
  );
};
